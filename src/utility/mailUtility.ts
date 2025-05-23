import nodemailer from "nodemailer"


export default async function send_mail(to: string, title: string, body: string){
    const transport =  nodemailer.createTransport({
        service: "Zoho",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        }
    });

    await transport.sendMail({
        from: "Sairash <me@sairashgautam.com.np>",
        to: to,
        subject: title,
        html: body,
    });
}