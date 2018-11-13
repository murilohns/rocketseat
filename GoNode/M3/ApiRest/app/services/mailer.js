const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('handlebars');
const fs = require('fs');
const htmlToText = require('html-to-text');

const {
  host, port, user, pass, templatesPath,
} = require('../../config/mail');

const transport = nodemailer.createTransport({
  host,
  port,
  secure: false,
  auth: {
    user,
    pass,
  },
});

module.exports = ({ template, context, ...options }) => {
  let hbsTemplate;
  if (template) {
    const file = fs.readFileSync(path.join(templatesPath, `${template}.hbs`), 'utf8');
    hbsTemplate = hbs.compile(file)(context);
  }
  const mailHtml = hbsTemplate || options.html;

  return transport.sendMail({
    html: mailHtml,
    ...options,
    text: htmlToText.fromString(mailHtml).trim(),
  });
};
