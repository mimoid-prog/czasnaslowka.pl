const nodemailer = require("nodemailer");
const getEmail = require("./emailTemplate");
const from = '"CzasNaSlowka.pl" <kontakt@czasnaslowka.pl>';

function setup() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

module.exports = {
  sendConfirmationEmail: function (user) {
    const tranport = setup();
    const htmlEmail = getEmail({
      text: "Wciśnij przycisk, aby aktywować swoje konto.",
      btnHref: user.generateConfirmationUrl(),
      btnText: "Aktywuj konto",
    });

    const email = {
      from,
      to: user.email,
      subject: "Witaj w CzasNaSlowka.pl",
      html: htmlEmail,
    };

    tranport.sendMail(email);
  },
  sendResetPasswordEmail: function (user) {
    const tranport = setup();
    const htmlEmail = getEmail({
      text: "Wciśnij przycisk, aby zmienić swoje hasło.",
      btnHref: user.generateResetPasswordLink(),
      btnText: "Zmień hasło",
    });

    const email = {
      from,
      to: user.email,
      subject: "Zmiana hasła - CzasNaSlowka.pl",
      html: htmlEmail,
    };

    tranport.sendMail(email);
  },
};
