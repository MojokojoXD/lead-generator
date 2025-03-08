import nodemailer from 'nodemailer'

const emailAddress = 'kwadwoneer@yahoo.com';
const YAHOO_PASS = process.env.YAHOO_PASS;

if ( !YAHOO_PASS ) throw new Error( 'Email password not set correctly' );

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.yahoo.com',
  port: 587,
  secure: false,
  service: 'yahoo',
  auth: {
    user: emailAddress,
    pass: YAHOO_PASS,
  },
});


export { transporter };