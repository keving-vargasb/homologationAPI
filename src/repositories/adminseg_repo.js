const Adminseg = require("../util/adminseg/adminseg");
const HttpResponse = require("../util/http_response");
const utils = require('../util/util');

const AdminsegProvider = require("../providers/adminseg_provider");

const getHomologationObject = async (applicationID) => {
  try {

    const applicationDataResponse = await utils.fetchGET({
      url: `${process.env.API_ENDPOINT}/api/application/${applicationID}`
    });

    const applicationData = applicationDataResponse.data

    if(!applicationData) return new HttpResponse("application_not_found", 200, "Application not found", applicationID);

    const adminseg = new Adminseg.Adminseg(applicationData);
    const homologationObject = await adminseg.homologationObject();

    return new HttpResponse("ok", 200, "ok", homologationObject);
  } catch (error) {
    console.log({ error });
    return new HttpResponse("unknown_error", 200, error.message, error);
  }
}

const createQuoteInAdminseg = async (applicationData) => {
  try {
    if(process.env.ENVIRONMENT !== 'DEV') return new HttpResponse("service_not_available", 401, "Service not available", null);
    const adminseg = new Adminseg.Adminseg(applicationData);
    const homologationObject = await adminseg.homologationObject();

    const quotationResponse = await AdminsegProvider.quoteApplicationInAdminseg(homologationObject.quotationRequest);

    homologationObject.submitRequest.append(
      "application[quotation][uuid]",
      quotationResponse.quote.uuid
    );

    const submitResponse = await AdminsegProvider.submitApplicationInAdminseg(homologationObject.submitRequest);

    return new HttpResponse("ok", 200, "ok", submitResponse);
  } catch (error) {
    console.log({ error });
    return new HttpResponse("unknown_error", 200, error.message, error);
  }
};

module.exports = {
  getHomologationObject,
  createQuoteInAdminseg,
};
