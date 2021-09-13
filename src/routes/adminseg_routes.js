const AdminsegRepo = require("../repositories/adminseg_repo");

module.exports = function (app) {
  app.post("/adminseg/homologation", async (req, res) => {
    const { applicationData } = req.body;

    const result = await AdminsegRepo.createQuoteInAdminseg(applicationData);
    res.status(result.httpCode).json(result);
  });
};
