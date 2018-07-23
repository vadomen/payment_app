const config = require('../config');
const mailgun = require('mailgun-js')({apiKey: config.mail.api_key, domain: config.mail.domain});

var data = {
  from: '',
  to: '',
  subject: 'SUBSCRIPTION',
  text: 'Testing some Mailgun awesomness!'
};

class MailSender {
    constructor() {

    }

    sendMail() {
        mailgun.messages().send(data, function (error, body) {
            console.log(body);
          });
    }
} 
