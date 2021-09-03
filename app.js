const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const FormData = require('form-data');
const env = require('./src/environment/env');
const A = require('./src/adminseg/adminseg');
const fetch = require('node-fetch');


const app = express()
const port = 3000

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

const environment = env.staging; //TODO env var

app.post('/adminseg/homologation', async (req, res) => {

  try {
    const data = ({
      applicationData
    } = req.body)
  
    const adminseg = new A.Adminseg(applicationData);
    const homologationObject = await adminseg.homologationObject();

    res.status(200).json(response);
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