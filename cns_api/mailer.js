const nodemailer = require("nodemailer");

const from = '"CzasNaSlowka" <info@czasnaslowka.com>';

function setup() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

module.exports = {
  sendConfirmationEmail: function(user) {
    const tranport = setup();
    const email = {
      from,
      to: user.email,
      subject: "Witamy w CzasNaSlowka",
      text: `
            Wciśnij przycisk, aby aktywować swoje konto.
            <a href="${user.generateConfirmationUrl()}">Aktywuj konto</a>
            `
    };

    tranport.sendMail(email);
  },
  sendResetPasswordEmail: function(user) {
    const tranport = setup();
    const email = {
      from,
      to: user.email,
      subject: "Zmiana hasła - CzasNaSlowka.pl",
      text: `
            Wciśnij przycisk, aby zmienić swoje hasło.
            <a href="${user.generateResetPasswordLink()}">Zmień hasło</a>
            `
    };

    tranport.sendMail(email);
  }
};
