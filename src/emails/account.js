import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const send = (email, name) => {
  sgMail.send({
    to: email,
    from: "langn128@gmail.com",
    subject: "Thanks",
    text: "Welcome to app, " + name,
  });
};

export { send };
