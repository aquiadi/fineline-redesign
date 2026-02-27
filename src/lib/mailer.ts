import nodemailer from 'nodemailer';

interface EmailData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// HTML-encode user input to prevent XSS in email clients
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Create transporter - uses environment variables for config
// For Gmail: set EMAIL_USER and EMAIL_PASS (use App Password, not regular password)
function createTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.warn('⚠️  EMAIL_USER or EMAIL_PASS not set. Email notifications disabled.');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
}

export async function sendContactNotification(data: EmailData): Promise<boolean> {
  const transporter = createTransporter();

  if (!transporter) {
    console.log('📧 Email skipped (no credentials configured). Submission still saved to JSON.');
    return false;
  }

  const recipientEmail = process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER;

  // Escape ALL user input before embedding in HTML
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safePhone = escapeHtml(data.phone || 'Not provided');
  const safeMessage = escapeHtml(data.message);

  const mailOptions = {
    from: `"Fine Line Auto Body Website" <${process.env.EMAIL_USER}>`,
    to: recipientEmail,
    replyTo: data.email,
    subject: `🔧 New Contact Form Submission from ${safeName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; color: #f5f5f5; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #E10600, #FF2D20); padding: 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 20px; letter-spacing: 2px; color: white;">FINE LINE AUTO BODY</h1>
          <p style="margin: 4px 0 0; font-size: 12px; color: rgba(255,255,255,0.8); letter-spacing: 3px;">NEW CONTACT FORM SUBMISSION</p>
        </div>
        <div style="padding: 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #E10600; font-weight: bold; width: 120px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #E10600; font-weight: bold;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);"><a href="mailto:${safeEmail}" style="color: #FF6B6B;">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #E10600; font-weight: bold;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">${safePhone}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 20px; background: rgba(255,255,255,0.05); border-left: 3px solid #E10600; border-radius: 4px;">
            <p style="margin: 0 0 8px; color: #E10600; font-weight: bold; font-size: 12px; letter-spacing: 1px;">MESSAGE</p>
            <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #666;">Submitted at ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} PT</p>
        </div>
      </div>
    `,
    text: `New contact from ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\n\nMessage:\n${data.message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Email notification sent to ${recipientEmail}`);
    return true;
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    return false;
  }
}
