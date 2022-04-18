// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

exports.sendSMS = (msg) => {
  client.messages.create({
     body: msg,
     from: '+18704938409',
     to: '+972507880485'
   })
  .then(message => console.log(`message id is: ${message.sid}`));
}
