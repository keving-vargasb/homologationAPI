const AdminsegRepo = require("../repositories/adminseg_repo");

module.exports = function (app) {

  //Get homologation object
  app.get("/adminseg/homologation/object/:applicationID", async (req, res) => {
    const { applicationID } = req.params;
    const result = await AdminsegRepo.getHomologationObject(applicationID);
    res.status(result.httpCode).json(result);
  });

  //Register new homologation process
  app.get("/adminseg/homologation/process/:applicationID", async (req, res) => {
    const { applicationID } = req.params;
    const result = await AdminsegRepo.registerNewHomologation(applicationID);
    res.status(result.httpCode).json(result);
  });

  //Submit application in adminseg
  app.get("/adminseg/:applicationID", async (req, res) => {
    const { applicationID } = req.params;
    const result = await AdminsegRepo.submitApplicationInAdminseg(applicationID);
    res.status(result.httpCode).json(result);
  });


  //Cron to submit applications
  app.get("/adminseg/homologation/cron", async (req, res) => {
    const result = await AdminsegRepo.submitApplicationsInAdminseg();
    res.status(result.httpCode).json(result);
  });

  //submit application to debug object ONLY DEV
  app.post("/adminseg/homologation", async (req, res) => {
    const { applicationData } = req.body;
    const result = await AdminsegRepo.createQuoteInAdminseg(applicationData);
    res.status(result.httpCode).json(result);
  });

  
};
