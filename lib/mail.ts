import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
export const sendVerificationEmail = async (email: string, token: string) => {
  //sends link to email
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
export const sendPasswordResetEmail = async (email: string, token: string) => {
  //sends link to email
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your Password",
    html: `<p>click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};
