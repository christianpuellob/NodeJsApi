import nodemailer from 'nodemailer'
import config from '../config.js'

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: config.email_user,
    pass: config.email_password
  }
})

async function enviarEmail(usuario) {
  await transporter.sendMail({
    from: config.email_user,
    to: `${usuario[0].email}`, 
    subject: "Cambio de contraseña  ✔",
    text: `Saludo ${usuario.primer_nombre}?`,
    html: "<b>Cambio de contraseña exitoso...</b>",
  })  
}

export default enviarEmail