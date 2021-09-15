const params = require('./params');
const utils = require('../util');
const moment = require('moment');
const fetch = require('node-fetch');

const headers = {
    apikey: process.env.ADMINSEG_API_KEY,
};

class Adminseg {
    _application;
  
    constructor(application) {
      this._application = application;
    }
  
    get application() {
      return this._application;
    }

    async homologationObject() {
      const names = this.separateFullname(this.application.personalInfo.fullName);
  
      const measures = this.getAppQuestion('Q_WEIGHT_HEIGHT').response;
      const heightMeasures = measures[0];
      const weightMeasures = measures[1];
  
      let agent = 57; //Default agent amedex
  
      if (this.application.agent) {
        const result = await this.findAdminsegAgent(this.application.agent.code);
        agent = result.value;
      }
  
      console.log(this.application.id);
  
      let resultObject = {
        applicationID: this.application.id,
        application: {
          /* owner_signature: {
            accept: 1
          }, */
          person: {
            first_name: names.first_name,
            last_name: names.last_name,
            gender: this.findAdminsegItem(
              params.entities.gender,
              this.application.personalInfo.gender.id,
              params.adminsegGenders,
            ).value,
            height_unit: this.findAdminsegItem(
              params.entities.weightUnit,
              heightMeasures.size.id,
              params.adminsegHeightUnits,
            ).value,
            height: heightMeasures.value,
            weight_unit: this.findAdminsegItem(
              params.entities.weightUnit,
              weightMeasures.size.id,
              params.adminsegWeightUnits,
            ).value,
            weight: weightMeasures.value,
            addresses: [
              {
                country: this.application.personalInfo.location.country.id,
                complete_address: `${this.application.personalInfo.location.address1} ${this.application.personalInfo.location.address2}`,
              },
            ],
            birthday: moment(this.application.personalInfo.dateOfBirth).format(
              'YYYY-MM-DD',
            ),
            is_smoker: this.getAppQuestion('Q_SMOKE').response[0].id,
            emails: [
              {
                value: this.application.user.email,
              },
            ],
            phones: [
              {
                type: 1,
                number: this.application.user.phone,
              },
            ],
            identifications: [
              {
                type: this.findAdminsegItem(
                  params.entities.identityType,
                  this.application.personalInfo.identification.type.id,
                  params.adminsegIdentityTypes,
                ).value,
                number: this.application.personalInfo.identification.number,
              },
            ],
          },
          accept_condition_address: 1,
          beneficiaries: this.adminsegBeneficiaries,
          owner_same_insured: this.application.ownerIsTheInsured ? 1 : 0,
          owner: this.application.ownerIsTheInsured ? null : this.adminsegOwner,
          accept_terms: 1,
          date_accept_terms: this.application.acceptTermsDate
            ? moment(this.application.legal.acceptTermsDate).format(
                'YYYY-MM-DD HH:mm',
              )
            : moment().format('YYYY-MM-DD HH:mm'),
          recurring_payment: this.application.payment.method == 'CARD' ? 1 : 2,
          quotation: {
            agent: agent,
            product: this.findAdminsegItem(
              params.entities.product,
              this.application.product ? this.application.product.id : 'p1',
              params.adminsegProducts,
            ).value,
            insured_value: parseFloat(this.application.insuredValue),
            years: this.application.selectedPlan.term.years,
            frequency: this.findAdminsegItem(
              params.entities.frequency,
              this.application.selectedPlan.frequency.id,
              params.adminsegFrequencies,
            ).value,
          },
          payment: {
            transaction_id: this.application.payment.subscriptionId,
            customer_profile_id:
              this.application.payment.profile.customerProfileId,
          },
          answers: this.adminsegQuestions,
        },
        quotationRequest: null,
        submitRequest: null,
      };
  
      resultObject.quotationRequest = utils.jsonToFormData({
        owner: {
          first_name: resultObject.application.person.first_name,
          last_name: resultObject.application.person.last_name,
          dob: resultObject.application.person.birthday,
          smoker: resultObject.application.person.is_smoker ? 1 : 0,
          country: resultObject.application.person.addresses[0].country,
          email: resultObject.application.person.emails[0].value,
          gender: resultObject.application.person.gender,
        },
        agent: resultObject.application.quotation.agent,
        insured_value: resultObject.application.quotation.insured_value,
        product: resultObject.application.quotation.product,
        years: resultObject.application.quotation.years,
        frequency: resultObject.application.quotation.frequency,
      });
  
      resultObject.submitRequest = utils.jsonToFormData({
        application: resultObject.application,
      });
  
      return resultObject;
    }
  
    findAdminsegItem(
      searchEntity,
      appID,
      homologationData,
    ) {
      const findedItem = homologationData.find(
        (item) => item.appID == appID,
      );
  
      if (!findedItem) throw new Error(`${searchEntity}_not_found`);
      return findedItem;
    }
  
    async findAdminsegAgent(agentCode) {
      const agents = await this.getAdminsegAgents();
      const findedAgent = agents.find((agent) => agent.code === agentCode);
      if (!findedAgent) return {value: 57};
      return findedAgent;
    }
  
    getAppQuestion(questionID) {
      const findedQuestion = this.application.questions.find(
        (question) => question.id === questionID,
      );
      if (!findedQuestion) throw new Error('question_not_found');
      return findedQuestion;
    }
  
    get adminsegBeneficiaries() {
      return this.application.beneficiaries.map((beneficiary) => {
        const personType = this.findAdminsegItem(
          params.entities.personType,
          beneficiary.personType.id,
          params.adminsegPersonTypes,
        ).value;
  
        return {
          person_type: personType,
          legal_person: {
            name:
              personType === 'lp'
                ? `${beneficiary.firstName} ${beneficiary.last_name}`
                : null,
          },
          real_person: {
            first_name: personType === 'rp' ? beneficiary.firstName : null,
            last_name: personType === 'rp' ? beneficiary.lastName : null,
            birthday:
              personType === 'rp'
                ? moment(beneficiary.birthdayDate).format('YYYY-MM-DD')
                : null,
          },
          type: this.findAdminsegItem(
            params.entities.beneficiaryType,
            beneficiary.type.id,
            params.adminsegbeneficiaryTypes,
          ).value,
          category: this.findAdminsegItem(
            params.entities.relationship,
            beneficiary.relationship.id,
            params.adminsegRelationships,
          ).value,
          percentage: beneficiary.percent,
          reason: beneficiary.reason ? beneficiary.reason : null,
          details: beneficiary.details ? beneficiary.details : null,
        };
      });
    }
  
    get adminsegOwner() {
      const owner = this.application.owner;
      const cityObject = this.separateOwnerCity(owner.city);
  
      return {
        name: owner.fullName,
        relationship: this.findAdminsegItem(
          params.entities.relationship,
          owner.relationship.id,
          params.adminsegRelationships,
        ).value,
        identity: [
          {
            type: this.findAdminsegItem(
              params.entities.identityType,
              owner.identification.type,
              params.adminsegIdentityTypes,
            ).value,
            number: owner.identification.number,
          },
        ],
        co_owner: 'jointOwner',
        address: owner.address,
        country: owner.country.id,
        state: cityObject.state,
        city: cityObject.city,
        city_string: cityObject.typedCity,
      };
    }
  
    get adminsegQuestions() {
      const questions = this.organizeQuestions();
      const questionsFiltered = questions.filter(
        (question) => question.id != 'Q_SMOKE' && question.id != 'Q_GENDER',
      );
  
      let homologation = [];

      for (let homologationObject of params.homolgationQuestions) {
        const question = questionsFiltered.find(question => {
          return question.id === homologationObject.id
        });

        let questionHomologateResult;
        
        if (question) {
          questionHomologateResult = this.homologateQuestion(question, homologationObject);
        }else{
          questionHomologateResult = homologationObject.questions.map(q => {
            return {
              question: q.id
            }
          })
        };
        
        
        const newArray = homologation.concat(questionHomologateResult);
        homologation = newArray;
        
      }
  
      const questionWithoutUndefined = homologation.filter(
        (question) => question !== undefined && question,
      );

      questionWithoutUndefined.push(
        {
          question: 439,
        }
      );

      return questionWithoutUndefined;
    }
  
    organizeQuestions() {
      let questions = [];
  
      for (let question of this.application.questions) {
        if (question.subQuestions) {
          for (let subQuestion of question.subQuestions) {
            questions.push(subQuestion);
          }
          question.subQuestions = null;
        }
  
        questions.push(question);
      }

      return questions;
    }
  
    homologateQuestion(appQuestion, homologation) {
      //const homologation = params.homolgationQuestions[appQuestion.id];
      if (!homologation) return null;
  
      let result = [];
  
      for (let i = 0; i < homologation.questions.length; i++) {
        const homologationQuestionObject = homologation.questions[i];
  
        const homologationQuestionResult = this.manageSingleQuestion(
          homologationQuestionObject,
          appQuestion,
        );
  
        if (Array.isArray(homologationQuestionResult)) {
          homologationQuestionResult.map((item) => result.push(item));
          continue;
        }
  
        result.push(homologationQuestionResult);
      }
  
      return result;
    }
  
    manageSingleQuestion(
      homologationQuestionObject,
      appQuestion,
    ) {
      const response = appQuestion.response;
      let userResponse = null;
      
      if(response) {
        userResponse = Array.isArray(response) ? response[0].id : response.id;
      }

      switch (homologationQuestionObject.type) {
        case 'radio':
          return {
            question: homologationQuestionObject.id,
            choice: homologationQuestionObject.options[userResponse],
          };
        case 'select':
          return {
            question: homologationQuestionObject.id,
            choice: homologationQuestionObject.options[userResponse],
          };
        case 'bool':
          return {
            question: homologationQuestionObject.id,
            answer_bool: userResponse
          };
        case 'text':
          return {
            question: homologationQuestionObject.id,
            answer_text: response[0].value,
          };
        case 'age':
          return {
            question: homologationQuestionObject.id,
            answer_age: parseInt(response),
          };
        case 'checkbox':
          return {
            question: homologationQuestionObject.id,
            checkbox: response.map((answer) => answer.id),
          };
        case 'insurances':
          if (
            !this.application.insurances ||
            !this.application.insurances.acquired
          )
            return {
              question: homologationQuestionObject.id,
            };
          const insurances = this.application.insurances.acquired.map(
            (insurance) => ({
              company_name: insurance.companyName,
              member_id: insurance.memberId,
              effective_date: moment(insurance.effectiveDate).format(
                'YYYY-MM-DD',
              ),
            }),
          );
          return {
            question: homologationQuestionObject.id,
            insurances,
          };
        case 'doctor':
          if (!this.application.doctors) return {
            question: homologationQuestionObject.id,
          };
          const doctors = this.application.doctors.map((doctor) => ({
            name: doctor.name,
            address: doctor.email ? doctor.email : null,
            phone: doctor.phone,
            condition: doctor.conditionTreated,
          }));
          return {
            question: homologationQuestionObject.id,
            doctors,
          };
        case 'medicine':
          if (!this.application.medicines) return {
            question: homologationQuestionObject.id,
          };
          const medicines = this.application.medicines.map((medicine) => ({
            name: medicine.name,
            dosage: medicine.dosage,
            condition: medicine.condition,
          }));
          return {
            question: homologationQuestionObject.id,
            medicines,
          };
        case 'insurance_denied_type':
          if (!this.application.insurances || !this.application.insurances.denied)
            return {
              question: homologationQuestionObject.id,
            };
          return {
            question: homologationQuestionObject.id,
            choice: this.application.insurances.denied[0].type,
          };
        case 'insurance_denied_text':
          if (!this.application.insurances || !this.application.insurances.denied)
            return {
              question: homologationQuestionObject.id,
            };
          return {
            question: homologationQuestionObject.id,
            answer_text: this.application.insurances.denied[0].details,
          };
        case 'covid-date':
          if (!this.application.covid) return {
            question: homologationQuestionObject.id,
          };
          return {
            question: homologationQuestionObject.id,
            date: moment(this.application.covid[0].testDate).format('YYYY-MM-DD'),
          };
        case 'covid-bool':
          if (!this.application.covid) return {
            question: homologationQuestionObject.id,
          };
          return {
            question: homologationQuestionObject.id,
            answer_bool: this.application.covid[0].currentlySymptoms ? 1 : 0,
          };
        case 'traveled_text':
          return {
            question: homologationQuestionObject.id,
            answer_text: appQuestion.details ? appQuestion.details : null,
          };
        case 'array':
          return {
            question: homologationQuestionObject.id
          };
        case 'detail_text':
          return {
            question: homologationQuestionObject.id,
            answer_text: appQuestion.detail ? appQuestion.detail[0].Details : null,
          };
        case 'bool_text':
          return {
            question: homologationQuestionObject.id,
            answer_bool: userResponse,
            answer_text: appQuestion.detail ? appQuestion.detail[0].Details : null,
          };
      }
    }
  
    separateFullname(fullname) {
      const names = fullname.split(' ');
      const namesClean = names.filter((name) => {
        if (name) return name;
      });
  
      switch (namesClean.length) {
        case 1:
          return {
            first_name: namesClean[0],
            last_name: null,
          };
        case 2:
          return {
            first_name: namesClean[0],
            last_name: namesClean[1],
          };
        case 3:
          return {
            first_name: namesClean[0],
            last_name: `${namesClean[1]} ${namesClean[2]}`,
          };
        default:
          return {
            first_name: `${namesClean[0]} ${namesClean[1]}`,
            last_name: `${namesClean[2]} ${namesClean[3]}`,
          };
      }
    }
  
    async getAdminsegAgents() {
      const result = await fetch(`${process.env.ADMINSEG_URL_API}/quote/services?_locale=en`, {
        headers: {
          apikey: process.env.ADMINSEG_API_KEY,
        }
      })
      const response = await result.json() 
  
      return response.agents;
    }
  
    separateOwnerCity = (city) => {
      let locationObject = {
        typedCity: null,
        state: null,
        city: null,
      };
  
      if (city.city_string) {
        locationObject.typedCity = city.city_string;
        return locationObject;
      }
  
      const separated = city.id.split('-');
      locationObject.state = separated.length > 2 ? separated[1] : null;
      locationObject.city = separated.length > 2 ? separated[2] : separated[1];
      return locationObject;
    };
}

module.exports = {
  Adminseg
}
  