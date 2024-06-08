
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     // TODO: replace `user` and `pass` values from <https://forwardemail.net>
//     user: "narendrasince143@gmail.com",
//     pass: "grwfzxxoihndgfhh",
//   },
// });

// let sendmail = async (req , res) => {
   
//     const mail =async () => {
//         const info = await transporter.sendMail({
//             from: 'narendrasince143@gmail.com', // sender address
//             to: "narendrasince143@gmail.com", // list of receivers
//             subject: "Hello ✔", // Subject line
//             text: "Hello world?", // plain text body
//             html: "<b>Hello world?</b>", // html body
//           });

//       console.log("Message sent: %s", info.messageId);

//     }
    
//     mail()
// }


// module.exports = {sendmail}