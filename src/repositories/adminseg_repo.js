const Adminseg = require("../util/adminseg/adminseg");
const HttpResponse = require("../util/http_response");
const moment = require("moment");

const AdminsegProvider = require("../providers/adminseg_provider");
const VtioApiProvider = require("../providers/vtio_api_provider");

const getHomologationObject = async (applicationID) => {
  try {
    const applicationData = await VtioApiProvider.getApplicationData(applicationID);
    if (!applicationData)
      return new HttpResponse(
        "application_not_found",
        200,
        "Application not found",
        applicationID
      );

    const adminseg = new Adminseg.Adminseg(applicationData);
    const homologationObject = await adminseg.homologationObject();

    return new HttpResponse("ok", 200, "ok", homologationObject);
  } catch (error) {
    console.log({ error });
    return new HttpResponse("unknown_error", 200, error.message, error);
  }
};

const registerNewHomologation = async (applicationID) => {
  try {
    const application = await VtioApiProvider.getApplicationData(applicationID);
    if (!application)
      return new HttpResponse(
        "application_not_found",
        200,
        "Application not found",
        applicationID
      );

    const response = await VtioApiProvider.registerHomologationObject({
      applicationID: applicationID,
      status: "pending",
      createdAt: moment(),
      quotationResponse: null,
      submitResponse: null,
    });

    await VtioApiProvider.updateApplication(
      {
        adminsegProcess: "pending",
      },
      applicationID
    );

    return new HttpResponse("ok", 200, "ok", response.data);
  } catch (error) {
    console.log({ error });

    await VtioApiProvider.updateApplication(
      {
        adminsegProcess: "with_error",
        adminsegError: error,
      },
      applicationID
    );

    return new HttpResponse("unknown_error", 200, error.message, error);
  }
};

const doAdminsegProcess = async (applicationData) => {
  let processResult = {
    status: null,
    quoteResponse: null,
    submitResponse: null,
  };
  const adminseg = new Adminseg.Adminseg(applicationData);
  const homologationObject = await adminseg.homologationObject();

  const quotationResponse = await AdminsegProvider.quoteApplicationInAdminseg(
    homologationObject.quotationRequest
  );
  console.log({ quotationResponse });

  if (!quotationResponse.code) {
    processResult.status = "quoteError";
    processResult.quoteResponse = quotationResponse ? quotationResponse : null;
    return processResult;
  }

  if (quotationResponse.code === 0) {
    processResult.status = "quoteError";
    processResult.quoteResponse = quotationResponse ? quotationResponse : null;
    return processResult;
  }

  homologationObject.submitRequest.append(
    "application[quotation][uuid]",
    quotationResponse.quote.uuid
  );

  const submitResponse = await AdminsegProvider.submitApplicationInAdminseg(
    homologationObject.submitRequest
  );
  console.log({ submitResponse });
  if (!submitResponse.code) {
    processResult.status = "submitError";
    processResult.submitResponse = submitResponse ? submitResponse : null;
    return processResult;
  }

  if (submitResponse.code === 0) {
    processResult.status = "submitError";
    processResult.submitResponse = submitResponse ? submitResponse : null;
    return processResult;
  }

  processResult.status = "completed";
  processResult.submitResponse = submitResponse ? submitResponse : null;
  return processResult;
};

const submitApplicationInAdminseg = async (applicationID) => {
  try {
    const application = await VtioApiProvider.getApplicationData(applicationID);
    console.log(application);
    if (!application)
      return new HttpResponse(
        "application_not_found",
        200,
        "Application not found",
        applicationID
      );

    const homologationObject = await VtioApiProvider.getHomologationObjectByApplicationID(applicationID);
    console.log({homologationObject});
    if (!homologationObject)
      return new HttpResponse(
        "object_not_found",
        200,
        "Object not found",
        applicationID
      );

    await VtioApiProvider.updateApplication({
      adminsegProcess: 'inProcess'
    }, applicationID);

    const adminsegProcessResult = await doAdminsegProcess(application);

    await VtioApiProvider.updateHomologationObject({
      status: adminsegProcessResult.status,
      quotationResponse: adminsegProcessResult.quoteResponse,
      submitResponse: adminsegProcessResult.submitResponse,
    }, homologationObject._id);

    if(adminsegProcessResult.status === 'completed'){
      await VtioApiProvider.updateApplication({
        adminsegProcess: 'completed',
        policyID: adminsegProcessResult.submitResponse.policy
      }, applicationID);
    }

    return new HttpResponse("ok", 200, "ok", null);
  } catch (error) {
    console.log({ error });
    await VtioApiProvider.updateApplication({
      adminsegProcess: 'withError',
      adminsegError: error.toString()
    }, applicationID);
    return new HttpResponse("unknown_error", 200, error.message, error);
  }
};

const submitApplicationsInAdminseg = async () => {
  try {
    
    let processResult = {
      success: [],
      failed: []
    };

    const homologationObjects = await VtioApiProvider.getHomologationObjects({
      status: 'pending'
    });

    for await(let object of homologationObjects) {
        const result = await submitApplicationInAdminseg(object.applicationID);
        if(!result.code === 'ok') {
          processResult.failed.push(object.applicationID);
          continue;
        } 

        processResult.success.push(object.applicationID);
    }

    return new HttpResponse("ok", 200, "ok", processResult);
  } catch (error) {
    console.log({ error });
    return new HttpResponse("unknown_error", 200, error.message, error);
  }
};

//Only dev
const createQuoteInAdminseg = async (applicationData) => {
  try {
    if (process.env.ENVIRONMENT !== "DEV")
      return new HttpResponse(
        "service_not_available",
        401,
        "Service not available",
        null
      );
    const adminseg = new Adminseg.Adminseg(applicationData);
    const homologationObject = await adminseg.homologationObject();

    const quotationResponse = await AdminsegProvider.quoteApplicationInAdminseg(
      homologationObject.quotationRequest
    );
    console.log({ quotationResponse });
    homologationObject.submitRequest.append(
      "application[quotation][uuid]",
      quotationResponse.quote.uuid
    );

    const submitResponse = await AdminsegProvider.submitApplicationInAdminseg(
      homologationObject.submitRequest
    );
    console.log({ submitResponse });
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
  submitApplicationInAdminseg,
  submitApplicationsInAdminseg
};
