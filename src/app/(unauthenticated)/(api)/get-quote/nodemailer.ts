import nodemailer from 'nodemailer'

const emailAddress = 'kwadwoneer@yahoo.com';
const EMAIL_AUTH = process.env.EMAIL_AUTH;

if ( !EMAIL_AUTH ) throw new Error( 'Email password not set correctly' );

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.yahoo.com',
  port: 587,
  secure: false,
  service: 'yahoo',
  auth: {
    user: emailAddress,
    pass: EMAIL_AUTH,
  },
});


export { transporter };