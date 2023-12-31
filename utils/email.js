/* eslint-disable import/no-extraneous-dependencies */
const nodemailer = require('nodemailer');
const pug = require('pug');
const { htmlToText } = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Stefan Valentin <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return 1;
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      }
    );
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html,
      text: htmlToText(html),
    };

    this.newTransport();
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send(
      'Welcome',
      'Bine ați venit în aplicația(nume aplicatie web)'
    );
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Token-ul dumneavoastră de resetare a parolei.(Disponibil timp de 10 minute)'
    );
  }
};
