const FormData = require('form-data');

function buildFormData(formData, data, parentKey) {
    if (
      data &&
      typeof data === 'object'
    ) {
      Object.keys(data).forEach((key) => {
        buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key,
        );
      });
    } else {
      const value = data == null ? '' : data;
  
      formData.append(parentKey, value);
    }
  }
  
function jsonToFormData(data) {
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
}


/**
    const headers = {
      apikey: environment.ADMINSEG_API_KEY,
    };

    var form = new FormData();
    form.append('owner[first_name]', 'my value');
    form.append('owner[last_name]', 'my value3');
    form.append('owner[dob]', '1998-01-08');
    form.append('owner[smoker]', 0);
    form.append('owner[country]', 'CL');
    form.append('owner[email]', 'kevin@vantageio.com');
    form.append('owner[gender]', 4);
    form.append('agent', 57);
    form.append('insured_value', 500000);
    form.append('product', 3);
    form.append('years', 30);
    form.append('frequency', 10);

    const result = await fetch('https://stage.api.amedex.us/quote/results', {
      method: 'POST',
      body: form,
      headers
    })
    const response = await result.json() 
 */


module.exports = {
  buildFormData,
  jsonToFormData
}