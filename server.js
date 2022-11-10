const express = require('express');
const request = require('request');
const app = express();
const dialogflowSessionClient =
    require('./botlib/dialogflow_session_client.js');
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT || 5080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const projectId = 'Add you project-id';
const accountSid = 'Add the Account Sid of your twilio Account';
const authToken = 'Add the Auth Token of your twilio Account';
process.env.GOOGLE_APPLICATION_CREDENTIALS = 'service account key path'

const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const sessionClient = new dialogflowSessionClient(projectId);


app.listen(port, () => {
  console.log(`Integration app listening on port ${port}`);
});

app.post('/', async function(req, res) {
  const body = req.body;
  const text = body.Body;
  const id = body.From;
  console.log(body);
  const dialogflowResponse = (await sessionClient.detectIntent(
      text, id, body)).fulfillmentText;
  const twiml = new  MessagingResponse();
  const message = twiml.message(dialogflowResponse);
  console.log(twiml.toString());
  res.send(twiml.toString());
});

process.on('SIGTERM', () => {
  listener.close(() => {
    console.log('Closing http server.');
    process.exit(0);
  });
});