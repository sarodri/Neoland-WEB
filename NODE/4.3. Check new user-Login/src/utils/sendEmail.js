const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const { setTestEmailSend } = require("../state/state.data");

const sendEmail = (userEmail, name, confirmationCode) => {
  /**^reseteo el estado a false ---> es el estado inicial */
  setTestEmailSend(false); // aun no hemos enviado el correo
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;
// creamos el trasnporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: password,
    },
  });
// creamos la carta del correo
  const mailOptions = {
    from: email,
    to: userEmail,
    subject: "Confirmation code",
    text: `tu codigo es ${confirmationCode}, gracias por confiar en nosotros ${name}`,
  };
// enviamos el email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      setTestEmailSend(false);
      return;
    }
    console.log("Email sent: " + info.response);
    setTestEmailSend(true); // seteo que se ha enviado el email
  });
};

module.exports = sendEmail;
