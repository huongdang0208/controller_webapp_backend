export const mailConfig = () => ({
    mail: {
        smtp: {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        },
        default: {
            from: process.env.MAIL_DEFAULT_FROM,
            name: process.env.MAIL_DEFAULT_NAME,
            to: process.env.MAIL_DEFAULT_TO,
        },
    },
});
