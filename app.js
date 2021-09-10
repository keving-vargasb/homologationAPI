const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const Adminseg = require('./src/adminseg/adminseg');

const app = express()
const port = 3000
const fetch = require('node-fetch');


let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
}

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(allowCrossDomain)
app.use(cors())


app.post('/adminseg/homologation', async (req, res) => {

  try {
    const adminseg = new Adminseg.Adminseg(req.body.applicationData);
    const homologationObject = await adminseg.homologationObject();

    const quotationRequestCopy = JSON.stringify(homologationObject.quotationRequest);

    const quotationResult = await fetch(`${process.env.ADMINSEG_URL_API}/quote/results`, {
      method: 'POST',
      body: homologationObject.quotationRequest,
      headers: {
        apikey: process.env.ADMINSEG_API_KEY,
      }
    })
    const quotationResponse = await quotationResult.json()

    homologationObject.submitRequest.append('application[quotation][uuid]', quotationResponse.quote.uuid);

    const submitRequestCopy = JSON.stringify(homologationObject.submitRequest);

    const submitResult = await fetch(`${process.env.ADMINSEG_URL_API}/application/submit`, {
      method: 'post',
      body: homologationObject.submitRequest,
      headers: {
        apikey: process.env.ADMINSEG_API_KEY,
      }
    })
    const submitResponse = await submitResult.json() 
    console.log({submitResponse});

    homologationObject.quotationRequest = JSON.parse(quotationRequestCopy);
    homologationObject.submitRequest = JSON.parse(submitRequestCopy);

    res.status(200).json(homologationObject);

    /* res.status(200).json({
      length: homologationObject.application.answers.length,
      answers: homologationObject.application.answers
    }); */
  } catch (error) {
    console.log(error)
    res.status(200).json({
      message: error.message
    });
  }
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})