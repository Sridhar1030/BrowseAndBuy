import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async (Link, recipient_email) => {
    return new Promise(async (resolve, reject) => {
        var transporter = await nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            logger: true,
            secureConnection: false,
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_PASSWORD,
            },
            tls: {
                rejectUnauthorized: true,
            },
        });

        const mail_configs = {
            from: process.env.MY_EMAIL,
            to: recipient_email,
            subject: "Password Reset Request",
            html: `<!DOCTYPE html>
            <html lang="en" >
            <head>
                <meta charset="UTF-8">
                <title>reset password</title>
            </head>
            <body>
            <p>Dear user,</p>
            <p>You have requested a password reset. Please click the link below to reset your password:</p>
            <a href="${Link}">${Link}</a>
            <p>If you did not request this, please secure your account immediately as someone may be attempting to gain unauthorized access.</p>
            <p>Thank you,</p>
            <p>B&B</p>
            </body>
            </html>`,
        };

        transporter.sendMail(mail_configs, function (error) {
            if (error) {
                console.log(error);
                return reject({ message: `An error has occured` });
            }
            return resolve({ message: "Email sent succesfuly" });
        });
    });
};

export { sendEmail };
