const Adminseg = require("../util/adminseg/adminseg");
const HttpResponse = require("../util/http_response");
const moment = require('moment');

const AdminsegProvider = require("../providers/adminseg_provider");
const VtioApiProvider = require("../providers/vtio_api_provider");

const getHomologationObject = async (applicationID) => {
  try {

    const response = await VtioApiProvider.getApplicationData(applicationID);
    const applicationData = response.data;
    if(!applicationData) return new HttpResponse("application_not_found", 200, "Application not found", applicationID);

    const adminseg = new Adminseg.Adminseg(applicationData);
    const homologationObject = await adminseg.homologationObject();

    return new HttpResponse("ok", 200, "ok", homologationObject);
  } catch (error) {
    console.log({ error });
    return new HttpResponse("unknown_error", 200, error.message, error);
  }
}

const registerNewHomologation = async (applicationID) => {
  try {
    const application = await VtioApiProvider.getApplicationData(applicationID);
    if(!application.data) return new HttpResponse("application_not_found", 200, "Application not found", applicationID);

    const response = await VtioApiProvider.registerHomologationObject({
      applicationID: applicationID,
      status: 'pending',
      createdAt: moment(),
      quotationResponse: null,
      submitResponse: null
    });

    await VtioApiProvider.updateApplication({
      adminsegProcess: 'pending'
    }, applicationID);

    return new HttpResponse("ok", 200, "ok", response.data);
  } catch (error) {
    console.log({ error });

    await VtioApiProvider.updateApplication({
      adminsegProcess: 'with_error',
      adminsegError: error
    }, applicationID);

    return new HttpResponse("unknown_error", 200, error.message, error);
  }
}

const doAdminsegProcess = async (applicationData) => {
  const adminseg = new Adminseg.Adminseg(applicationData);
  const homologationObject = await adminseg.homologationObject();

  const quotationResponse = await AdminsegProvider.quoteApplicationInAdminseg(homologationObject.quotationRequest);
  console.log({quotationResponse});
  homologationObject.submitRequest.append(
    "application[quotation][uuid]",
    quotationResponse.quote.uuid
  );

  const submitResponse = await AdminsegProvider.submitApplicationInAdminseg(homologationObject.submitRequest);
  console.log({submitResponse});
  return submitResponse;
}

const submitApplicationInAdminseg = async (applicationID) => {
  try {
    const application = await VtioApiProvider.getApplicationData(applicationID);
    if(!application.data) return new HttpResponse("application_not_found", 200, "Application not found", applicationID);

    

    return new HttpResponse("ok", 200, "ok", homologationObjects);
  } catch (error) {
    console.log({ error });
    return new HttpResponse("unknown_error", 200, error.message, error);
  }
};

//Only dev
const createQuoteInAdminseg = async (applicationData) => {
  try {
    if(process.env.ENVIRONMENT !== 'DEV') return new HttpResponse("service_not_available", 401, "Service not available", null);
    const adminseg = new Adminseg.Adminseg(applicationData);
    const homologationObject = await adminseg.homologationObject();

    const quotationResponse = await AdminsegProvider.quoteApplicationInAdminseg(homologationObject.quotationRequest);
    console.log({quotationResponse});
    homologationObject.submitRequest.append(
      "application[quotation][uuid]",
      quotationResponse.quote.uuid
    );

    const submitResponse = await AdminsegProvider.submitApplicationInAdminseg(homologationObject.submitRequest);
    console.log({submitResponse});
    return new HttpResponse("ok", 200, "ok", submitResponse);
  } catch (error) {
    console.log({ error });
    return new HttpResponse("unknown_error", 200, error.message, error);
  }
};



module.exports = {
  getHomologationObject,
  registerNewHomologation,
  createQuoteInAdminseg,
  submitApplicationInAdminseg
};
