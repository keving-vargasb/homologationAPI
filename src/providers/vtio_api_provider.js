const utils = require("../util/util");

const headers = {
  "Content-Type": "application/json",
};

const getApplicationData = async (applicationID) => {
  const applicationData = await utils.fetchGET({
    url: `${process.env.API_ENDPOINT}/api/application/${applicationID}`,
  });

  return applicationData;
};

const registerHomologationObject = async (homologationObject) => {
  const response = await utils.fetchPOST({
    url: `${process.env.API_ENDPOINT}/api/adminseg/`,
    data: JSON.stringify(homologationObject),
    headers,
  });
  if (!response.ok) throw new Error(response.error);
  return response;
};

const updateApplication = async (data, applicationID) => {
  const response = await utils.fetchPOST({
    url: `${process.env.API_ENDPOINT}/api/application/${applicationID}`,
    data: JSON.stringify(data),
    headers,
  });
  if (!response.ok) throw new Error(response.error);
  return response;
};

const getHomologationObjects = async (jsonFilter) => {
  const params = {
    filter: JSON.stringify(jsonFilter)
  };

  const response = await utils.fetchGET({
    url: `${process.env.API_ENDPOINT}/api/adminseg`,
    queryParams: params,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error(response.error);
  return response.data;
};

module.exports = {
  getApplicationData,
  registerHomologationObject,
  updateApplication,
  getHomologationObjects
};
