import nodemailer from 'nodemailer'

function EnviarMail(cuentaDePrueba, asunto, mensajeHtml ) {

const sendMail = createSendMailGoogle()

    sendMail ({
    to: cuentaDePrueba,
    subject: asunto,
    html: mensajeHtml,
  })

  function createSendMail(mailConfig) {
    const transporter = nodemailer.createTransport(mailConfig);
    return function sendMail({ to, subject, html}) {
      const mailOptions = { from: mailConfig.auth.user, to, subject, html};
      return transporter.sendMail(mailOptions)
    }
  }

  function createSendMailGoogle() {
    return createSendMail({
      service: 'gmail',
      auth: {
        user: 'dtellerin@gmail.com',
        pass: 'hfprhjynfiokglqa'
      }
    })
  }
}

export default EnviarMail

