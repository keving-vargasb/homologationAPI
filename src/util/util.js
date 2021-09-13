const FormData = require("form-data");
const fetch = require("node-fetch");

function buildFormData(formData, data, parentKey) {
  if (data && typeof data === "object") {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? "" : data;

    formData.append(parentKey, value);
  }
}

function jsonToFormData(data) {
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
}

async function fetchPOST({ url, data, headers }) {
  const serviceResult = await fetch(
    url,
    {
      method: "POST",
      body: data,
      headers,
    }
  );
  const response = await serviceResult.json();
  return response;
}

async function fetchGET({ url, headers }) {
  const serviceResult = await fetch(
    url,
    {
      method: "GET",
      headers,
    }
  );
  const response = await serviceResult.json();
  return response;
}

module.exports = {
  buildFormData,
  jsonToFormData,
  fetchPOST,
  fetchGET
};
