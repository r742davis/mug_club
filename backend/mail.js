const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "58da07d0cd4ab9",
    pass: "fa1eec2c3c471f"
  }
});

// const transport = nodemailer.createTransport({
//   host: process.env.MAIL_HOST,
//   port: process.env.MAIL_PORT,
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS,
//   },
// })

const makeANiceEmail = text => `
  <div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <h2>Hello there!</h2>
    <p>${text}</p>

    <p>Richard Davis</p>
  </div>
  `;

exports.transport = transporter;
exports.makeANiceEmail = makeANiceEmail;