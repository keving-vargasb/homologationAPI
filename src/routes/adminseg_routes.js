const AdminsegRepo = require("../repositories/adminseg_repo");

module.exports = function (app) {

  app.get("/adminseg/homologation/object/:applicationID", async (req, res) => {
    const { applicationID } = req.params;
    const result = await AdminsegRepo.getHomologationObject(applicationID);
    res.status(result.httpCode).json(result);
  });

  app.get("/adminseg/homologation/process/:applicationID", async (req, res) => {
    const { applicationID } = req.params;
    const result = await AdminsegRepo.initHomologationProcess(applicationID);
    res.status(result.httpCode).json(result);
  });

  //ONLY DEV
  app.post("/adminseg/homologation", async (req, res) => {
    const { applicationData } = req.body;
    const result = await AdminsegRepo.createQuoteInAdminseg(applicationData);
    res.status(result.httpCode).json(result);
  });
};
