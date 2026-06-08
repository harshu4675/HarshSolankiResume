const nodemailer = require("nodemailer");

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

/**
 * Send notification email when someone submits the contact form
 */
const sendContactNotification = async (contactData) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log("📧 Email not configured. Skipping notification.");
      return false;
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || "harshu6278@gmail.com",
      subject: `📩 New Portfolio Message: ${contactData.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background: #F7F2EE; }
            .container { max-width: 560px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
            .header { background: linear-gradient(135deg, #111111, #333333); padding: 32px; text-align: center; }
            .header h1 { color: #ffffff; font-size: 20px; margin: 0 0 4px; letter-spacing: -0.02em; }
            .header p { color: rgba(255,255,255,0.6); font-size: 13px; margin: 0; }
            .body { padding: 32px; }
            .field { margin-bottom: 20px; }
            .field-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 6px; }
            .field-value { font-size: 15px; color: #111; line-height: 1.5; }
            .message-box { background: #F7F2EE; border-radius: 12px; padding: 20px; margin-top: 8px; }
            .message-text { font-size: 14px; color: #333; line-height: 1.7; white-space: pre-wrap; }
            .footer { padding: 24px 32px; border-top: 1px solid #f0f0f0; text-align: center; }
            .footer p { font-size: 12px; color: #999; margin: 0; }
            .accent { color: #FF5E57; }
            .badge { display: inline-block; padding: 4px 12px; border-radius: 8px; font-size: 11px; font-weight: 700; background: #FF5E5715; color: #FF5E57; margin-bottom: 16px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Message</h1>
              <p>Someone reached out through your portfolio</p>
            </div>
            <div class="body">
              <span class="badge">New Message</span>
              
              <div class="field">
                <div class="field-label">From</div>
                <div class="field-value">${contactData.name}</div>
              </div>
              
              <div class="field">
                <div class="field-label">Email</div>
                <div class="field-value">
                  <a href="mailto:${contactData.email}" style="color: #FF5E57; text-decoration: none;">${contactData.email}</a>
                </div>
              </div>
              
              <div class="field">
                <div class="field-label">Subject</div>
                <div class="field-value">${contactData.subject}</div>
              </div>
              
              <div class="field">
                <div class="field-label">Message</div>
                <div class="message-box">
                  <div class="message-text">${contactData.message}</div>
                </div>
              </div>
            </div>
            <div class="footer">
              <p>Received on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Contact notification email sent");
    return true;
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    return false;
  }
};

module.exports = { sendContactNotification };
