const Adminseg = require("../util/adminseg/adminseg");
const HttpResponse = require("../util/http_response");

const AdminsegProvider = require("../providers/adminseg_provider");

const createQuoteInAdminseg = async (applicationData) => {
  try {
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
  createQuoteInAdminseg,
};
