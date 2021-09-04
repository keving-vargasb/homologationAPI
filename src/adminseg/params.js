 
 const entities = {
  gender: 'gender',
  product: 'product',
  frequency: 'frequency',
  relationship: 'relationship',
  phoneType: 'phone_type',
  identityType: 'identity_type',
  personType: 'person_type',
  heightUnit: 'height_unit',
  weightUnit: 'weight_unit',
  beneficiaryType: 'beneficiary_type',
}


 const homolgationQuestions = {
    Q_ALCOHOL_CONSUMPTION: {
      questions: [
        {
          id: 484,
          type: 'radio',
          options: {
            0: 0,
            1: 1,
            2: 2,
            3: 3,
          },
        },
      ],
    },
    Q_MEMBER_FOLLOWING_POSITION: {
      questions: [
        {
          id: 404,
          type: 'bool',
          options: null,
        },
      ],
    },
    Q_CURRENTLY_COVERAGE: {
      questions: [
        {
          id: 492,
          type: 'bool',
          options: null,
        },
        {
          id: 491,
          type: 'insurances',
          options: null,
        },
      ],
    },
    Q_INSURANCE_POLICY_DENIED: {
      questions: [
        {
          id: 478,
          type: 'bool',
          option: null,
        },
        {
          id: 479,
          type: 'insurance_denied_type',
          option: {
            0: 0,
            1: 1,
          },
        },
        {
          id: 487,
          type: 'insurance_denied_text',
          option: null,
        },
      ],
    },
    Q_EXTREME_ACTIVITIES: {
      questions: [
        {
          id: 499,
          type: 'bool',
          option: null,
        },
      ],
    },
    Q_DRUGS: {
      questions: [
        {
          id: 406,
          type: 'bool',
          option: null,
        },
      ],
    },
   /*  Q_TREATMENT_HOSPITALIZED: {
      questions: [
        {
          id: 407,
          type: 'array',
          option: null,
        },
      ],
    }, */
    Q_TREATMENT_HOSPITALIZED_1: {
      questions: [
        {
          id: 408,
          type: 'bool',
          option: null,
        },
      ],
    },
    Q_TREATMENT_HOSPITALIZED_2: {
      questions: [
        {
          id: 409,
          type: 'bool',
          option: null,
        },
      ],
    },
    Q_TREATMENT_HOSPITALIZED_3: {
      questions: [
        {
          id: 410,
          type: 'bool',
          option: null,
        },
      ],
    },
    Q_TREATMENT_HOSPITALIZED_4: {
      questions: [
        {
          id: 411,
          type: 'bool',
          option: null,
        },
      ],
    },
    Q_TREATMENT_HOSPITALIZED_5: {
      questions: [
        {
          id: 412,
          type: 'bool',
          option: null,
        },
      ],
    },
    Q_TREATMENT_HOSPITALIZED_6: {
      questions: [
        {
          id: 413,
          type: 'bool',
          option: null,
        },
      ],
    },
    Q_TREATMENT_HOSPITALIZED_7: {
      questions: [
        {
          id: 414,
          type: 'bool',
          option: null,
        },
      ],
    },
    Q_TREATMENT_HOSPITALIZED_8: {
      questions: [
        {
          id: 415,
          type: 'bool',
          option: null,
        },
      ],
    },
    Q_TREATMENT_HOSPITALIZED_9: {
      questions: [
        {
          id: 481,
          type: 'bool',
          option: null,
        },
      ],
    },
    Q_TREATMENT_HOSPITALIZED_10: {
      questions: [
        {
          id: 416,
          type: 'bool',
          option: null,
        },
      ],
    },
    Q_TREATMENT_HOSPITALIZED_11: {
      questions: [
        {
          id: 417,
          type: 'bool',
          option: null,
        },
      ],
    },
    Q_TREATMENT_HOSPITALIZED_12: {
      questions: [
        {
          id: 418,
          type: 'bool',
          option: null,
        },
      ],
    },
    Q_SOME_DISEASE_1: {
      questions: [
        {
          id: 429,
          type: 'bool',
          option: null,
        },
      ],
    },
    Q_SOME_DISEASE_2: {
      questions: [
        {
          id: 430,
          type: 'bool',
          option: null,
        },
      ],
    },
    Q_SOME_DISEASE_3: {
      questions: [
        {
          id: 431,
          type: 'bool',
          option: null,
        },
      ],
    },
    Q_SOME_DISEASE_4: {
      questions: [
        {
          id: 432,
          type: 'bool',
          option: null,
        },
      ],
    },
    Q_SOME_DISEASE_5: {
      questions: [
        {
          id: 433,
          type: 'bool',
          option: null,
        },
      ],
    },
    Q_SOME_DISEASE_6: {
      questions: [
        {
          id: 434,
          type: 'bool',
          option: null,
        },
      ],
    },
    Q_SOME_DISEASE_7: {
      questions: [
        {
          id: 435,
          type: 'bool',
          option: null,
        },
      ],
    },
    Q_SOME_DISEASE_8: {
      questions: [
        {
          id: 436,
          type: 'bool',
          option: null,
        },
      ],
    },
    Q_SOME_DISEASE_9: {
      questions: [
        {
          id: 437,
          type: 'bool',
          option: null,
        },
      ],
    },
    Q_SOME_DISEASE_10: {
      questions: [
        {
          id: 438,
          type: 'bool',
          option: null,
        },
      ],
    },
    Q_BLOOD_PRESSURE_MULTIPLE_1: {
      questions: [
        {
          id: 440,
          type: 'age',
          option: null,
        },
      ],
    },
    Q_BLOOD_PRESSURE_MULTIPLE_2: {
      questions: [
        {
          id: 441,
          type: 'select',
          options: {
            0: 0,
            1: 1,
            2: 2,
            3: 3,
            4: 4,
          },
        },
      ],
    },
    Q_BLOOD_PRESSURE_MULTIPLE_3: {
      questions: [
        {
          id: 442,
          type: 'select',
          options: {
            0: 0,
            1: 1,
            2: 2,
            3: 3,
            4: 4,
          },
        },
      ],
    },
    Q_ABNORMAL_RESULTS: {
      questions: [
        {
          id: 443,
          type: 'checkbox',
          options: {
            0: 0,
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
          },
        },
      ],
    },
    Q_SOME_FAMILY_DIED_FROM_DISEASE: {
      questions: [
        {
          id: 480,
          type: 'bool',
          options: null,
        },
      ],
    },
    Q_HIGH_CHOLESTEROL_MULTIPLE_1: {
      questions: [
        {
          id: 460,
          type: 'age',
          options: null,
        },
      ],
    },
    Q_HIGH_CHOLESTEROL_MULTIPLE_2: {
      questions: [
        {
          id: 461,
          type: 'select',
          options: {
            0: 0,
            1: 1,
            2: 2,
            3: 3,
            4: 4,
          },
        },
      ],
    },
    Q_HIGH_CHOLESTEROL_MULTIPLE_3: {
      questions: [
        {
          id: 462,
          type: 'radio',
          options: {
            0: 0,
            1: 1,
          },
        },
      ],
    },
    Q_HIGH_CHOLESTEROL_MULTIPLE_4: {
      questions: [
        {
          id: 488,
          type: 'select',
          options: {
            0: 0,
            1: 1,
            2: 2,
            3: 3,
            4: 4,
          },
        },
      ],
    },
    Q_HIGH_CHOLESTEROL_MULTIPLE_5: {
      questions: [
        {
          id: 489,
          type: 'radio',
          options: {
            0: 0,
            1: 1,
          },
        },
      ],
    },
    Q_TAKE_INSULIN: {
      questions: [
        {
          id: 447,
          type: 'bool',
          options: null,
        },
      ],
    },
    Q_DIABETES_MULTIPLE_1: {
      questions: [
        {
          id: 448,
          type: 'age',
          options: null,
        },
      ],
    },
    Q_DIABETES_MULTIPLE_2: {
      questions: [
        {
          id: 497,
          type: 'select',
          options: {
            0: 0,
            1: 1,
            2: 2,
            3: 3,
            4: 4,
          },
        },
      ],
    },
    Q_DIABETES_MULTIPLE_3: {
      questions: [
        {
          id: 450,
          type: 'select',
          options: {
            0: 0,
            1: 1,
            2: 2,
          },
        },
      ],
    },
    Q_COMPLICATIONS_DIABETES: {
      questions: [
        {
          id: 451,
          type: 'radio',
          options: {
            0: 0,
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
          },
        },
      ],
    },
    Q_HAVE_FOLLOWING_CONDITIONS: {
      questions: [
        {
          id: 455,
          type: 'bool',
          options: null,
        },
      ],
    },
    Q_CURRENTLY_DISABLED: {
      questions: [
        {
          id: 490,
          type: 'bool',
          options: null,
        },
      ],
    },
    Q_PENDING_SURGERY: {
      questions: [
        {
          id: 483,
          type: 'bool',
          options: null,
        },
        {
          id: 482,
          type: 'surgery_text',
          options: null,
        },
      ],
    },
    Q_ABNORMAL_RESULTS_SURGERIES: {
      questions: [
        {
          id: 419,
          type: 'bool',
          options: null,
        },
      ],
    },
    Q_ANY_TREATMENT: {
      questions: [
        {
          id: 458,
          type: 'radio',
          options: {
            0: 0,
            1: 1,
            2: 2,
          },
        },
      ],
    },
    Q_RESULTS_TREATMENT: {
      questions: [
        {
          id: 459,
          type: 'radio',
          options: {
            0: 0,
            1: 1,
            2: 2,
          },
        },
      ],
    },
    Q_HEALTHCARE_PROVIDER: {
      questions: [
        {
          id: 486,
          type: 'doctor',
          options: null,
        },
      ],
    },
    Q_ADMITTED_HOSPITAL: {
      questions: [
        {
          id: 420,
          type: 'bool',
          options: null,
        },
      ],
    },
    Q_SOME_DISEASE_PAST_DAYS: {
      questions: [
        {
          id: 506,
          type: 'bool',
          options: null,
        },
      ],
    },
    Q_POSITIVE_RESULT_COVID_TEST: {
      questions: [
        {
          id: 500,
          type: 'bool',
          options: null,
        },
        {
          id: 501,
          type: 'covid-date',
          options: null,
        },
        {
          id: 502,
          type: 'covid-bool',
          options: null,
        },
      ],
    },
    Q_AWAITING_RESULT_COVID_TEST: {
      questions: [
        {
          id: 503,
          type: 'bool',
          options: null,
        },
      ],
    },
    HAVE_CONTACT_SOMEONE_COVID_CONTAGED: {
      questions: [
        {
          id: 504,
          type: 'bool',
          options: null,
        },
      ],
    },
    Q_TRAVELED_PAST_DAYS: {
      questions: [
        {
          id: 505,
          type: 'bool',
          options: null,
        },
        {
          id: 507,
          type: 'traveled_text',
          options: null,
        },
      ],
    },
    Q_TAKE_MEDICATION: {
      questions: [
        {
          id: 427,
          type: 'bool',
          options: null,
        },
        {
          id: 425,
          type: 'medicine',
          options: null,
        },
      ],
    },
    Q_DOSAGE_CHANGED: {
      questions: [
        {
          id: 485,
          type: 'bool',
          options: null,
        },
      ],
    },
  };
  
  const adminsegGenders = [
    {
      value: 4,
      name: 'Male',
      appID: 1,
    },
    {
      value: 5,
      name: 'Female',
      appID: 2,
    },
  ];
  
  const adminsegProducts = [
    {
      value: 3,
      name: 'Easy Term',
      appID: 'p1',
      plans: [
        {
          value: 9,
          name: 'Easy Term 10',
          coverage_years: 10,
        },
        {
          value: 10,
          name: 'Easy Term 15',
          coverage_years: 15,
        },
        {
          value: 11,
          name: 'Easy Term 20',
          coverage_years: 20,
        },
        {
          value: 12,
          name: 'Easy Term 30',
          coverage_years: 30,
        },
      ],
    },
  ];
  
  const adminsegFrequencies = [
    {
      value: 10,
      name: 'Annual',
      payouts: 1,
      appID: 'ANUALLY',
    },
    {
      value: 15,
      name: 'Monthly',
      payouts: 12,
      appID: 'MONTHLY',
    },
    {
      value: 13,
      name: 'Quarterly',
      payouts: 4,
      appID: 'QUARTERLY',
    },
    {
      value: 11,
      name: 'Semiannual',
      payouts: 2,
      appID: 'SEMIANUALLY',
    },
  ];
  
  const adminsegRelationships = [
    {
      value: 39,
      name: 'Aunt',
      appID: 7,
    },
    {
      value: 32,
      name: 'Boyfriend',
      appID: 8,
    },
    {
      value: 25,
      name: 'Brother',
      appID: 0,
    },
    {
      value: 22,
      name: 'Brother in law',
      appID: 9,
    },
    {
      value: 28,
      name: 'Daughter',
      appID: 1,
    },
    {
      value: 24,
      name: 'Ex-Spouse',
      appID: 10,
    },
    {
      value: 35,
      name: 'Father',
      appID: 2,
    },
    {
      value: 36,
      name: 'Father in law',
      appID: 11,
    },
    {
      value: 20,
      name: 'Friendship',
      appID: 12,
    },
    {
      value: 33,
      name: 'Girlfriend',
      appID: 13,
    },
    {
      value: 31,
      name: 'Granddaughter',
      appID: 14,
    },
    {
      value: 18,
      name: 'Grandfather',
      appID: 15,
    },
    {
      value: 19,
      name: 'Grandmother',
      appID: 16,
    },
    {
      value: 30,
      name: 'Grandson',
      appID: 17,
    },
    {
      value: 29,
      name: 'Mother',
      appID: 3,
    },
    {
      value: 37,
      name: 'Mother in law',
      appID: 18,
    },
    {
      value: 34,
      name: 'Other',
      appID: 21,
    },
    {
      value: 26,
      name: 'Sister',
      appID: 4,
    },
    {
      value: 23,
      name: 'Sister in law',
      appID: 19,
    },
    {
      value: 27,
      name: 'Son',
      appID: 5,
    },
    {
      value: 21,
      name: 'Spouse',
      appID: 6,
    },
    {
      value: 38,
      name: 'Uncle',
      appID: 20,
    },
  ];
  
  const adminsegbeneficiaryTypes = [
    {
      value: 1,
      name: 'Primary',
      appID: 1,
    },
    {
      value: 2,
      name: 'Contingent',
      appID: 2,
    },
    {
      value: 3,
      name: 'Guardian',
      appID: 3,
    },
    {
      value: 4,
      name: 'Other',
      appID: 4,
    },
  ];
  
  const adminsegPhoneTypes = [
    {
      value: 3,
      name: 'Fax',
      appID: 3,
    },
    {
      value: 2,
      name: 'Home',
      appID: 2,
    },
    {
      value: 1,
      name: 'Mobile',
      appID: 1,
    },
  ];
  
  const adminsegIdentityTypes = [
    {
      value: 1,
      name: 'ID',
      appID: 1,
    },
    {
      value: 2,
      name: 'Passport',
      appID: 2,
    },
    {
      value: 3,
      name: "Owner's ID",
      appID: 3,
    },
    {
      value: 4,
      name: 'Legal Representative',
      appID: 4,
    },
  ];
  
  const adminsegPersonTypes = [
    {
      value: 'lp',
      name: 'legal_person',
      appID: 2,
    },
    {
      value: 'rp',
      name: 'real_person',
      appID: 1,
    },
  ];
  
  const adminsegHeightUnits = [
    {
      value: 'M',
      name: 'Meters',
      appID: 1,
    },
    {
      value: 'FT',
      name: 'Feet and Inch',
      appID: 2,
    },
  ];
  
  const adminsegWeightUnits = [
    {
      value: 'KG',
      name: 'Kilograms',
      appID: 1,
    },
    {
      value: 'LBS',
      name: 'Pounds',
      appID: 2,
    },
  ];
  
  module.exports = {
    entities,
    adminsegGenders,
    adminsegProducts,
    adminsegFrequencies,
    adminsegRelationships,
    adminsegPhoneTypes,
    adminsegIdentityTypes,
    adminsegPersonTypes,
    adminsegHeightUnits,
    adminsegWeightUnits,
    homolgationQuestions,
    adminsegbeneficiaryTypes,
  };
  