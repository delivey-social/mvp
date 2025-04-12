import sendgrid from "@sendgrid/mail";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

if (!SENDGRID_API_KEY) {
  throw new Error(
    "SENDGRID_API_KEY is not defined in the environment variables."
  );
}

sendgrid.setApiKey(SENDGRID_API_KEY);
