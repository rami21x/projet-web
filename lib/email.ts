import { Resend } from 'resend';

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

// Email sender configuration
const FROM_EMAIL = process.env.FROM_EMAIL || 'ARTERAL <onboarding@resend.dev>';
const SITE_NAME = 'ARTERAL';

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: SendEmailParams) {
  // Skip if no API key configured
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured - email not sent');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''),
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

// Design submission confirmation email
export async function sendDesignSubmissionEmail(params: {
  to: string;
  artistName: string;
  designTitle: string;
}) {
  const { to, artistName, designTitle } = params;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Soumission reçue - ${SITE_NAME}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; max-width: 600px;">
          <!-- Header -->
          <tr>
            <td style="background-color: #1A1A1A; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 8px;">
                ${SITE_NAME}
              </h1>
              <p style="color: #888888; margin: 10px 0 0; font-size: 11px; letter-spacing: 3px; text-transform: uppercase;">
                Mode Philosophique
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 50px 40px;">
              <h2 style="color: #1A1A1A; margin: 0 0 20px; font-size: 24px; font-weight: 500;">
                Merci pour votre soumission !
              </h2>

              <p style="color: #4A4A4A; font-size: 16px; line-height: 1.6; margin: 0 0 25px;">
                Bonjour <strong>${artistName}</strong>,
              </p>

              <p style="color: #4A4A4A; font-size: 16px; line-height: 1.6; margin: 0 0 25px;">
                Nous avons bien reçu votre œuvre "<strong>${designTitle}</strong>".
                Notre équipe va l'examiner et vous notifier dès qu'elle sera validée.
              </p>

              <div style="background-color: #f8f8f8; border-left: 4px solid #D4AF37; padding: 20px; margin: 30px 0;">
                <p style="color: #1A1A1A; font-size: 14px; margin: 0; font-style: italic;">
                  "Chaque création est une exploration philosophique incarnée."
                </p>
              </div>

              <p style="color: #4A4A4A; font-size: 16px; line-height: 1.6; margin: 25px 0;">
                Une fois approuvée, votre œuvre apparaîtra dans le <strong>Livret d'Or</strong>
                où les visiteurs pourront voter pour elle.
              </p>

              <p style="color: #4A4A4A; font-size: 16px; line-height: 1.6; margin: 25px 0 0;">
                À très bientôt,<br>
                <strong>L'équipe ARTERAL</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1A1A1A; padding: 30px; text-align: center;">
              <p style="color: #888888; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} ARTERAL. Tous droits réservés.
              </p>
              <p style="color: #666666; font-size: 11px; margin: 15px 0 0;">
                <a href="https://instagram.com/arteral_clo" style="color: #D4AF37; text-decoration: none;">
                  @arteral_clo
                </a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  return sendEmail({
    to,
    subject: `${SITE_NAME} - Votre œuvre "${designTitle}" a été reçue`,
    html,
  });
}

// Password reset email
export async function sendPasswordResetEmail(params: {
  to: string;
  userName: string;
  resetUrl: string;
}) {
  const { to, userName, resetUrl } = params;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Réinitialisation de mot de passe - ${SITE_NAME}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; max-width: 600px;">
          <!-- Header -->
          <tr>
            <td style="background-color: #1A1A1A; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 8px;">
                ${SITE_NAME}
              </h1>
              <p style="color: #888888; margin: 10px 0 0; font-size: 11px; letter-spacing: 3px; text-transform: uppercase;">
                Mode Philosophique
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 50px 40px;">
              <h2 style="color: #1A1A1A; margin: 0 0 20px; font-size: 24px; font-weight: 500;">
                Réinitialisation de mot de passe
              </h2>

              <p style="color: #4A4A4A; font-size: 16px; line-height: 1.6; margin: 0 0 25px;">
                Bonjour <strong>${userName}</strong>,
              </p>

              <p style="color: #4A4A4A; font-size: 16px; line-height: 1.6; margin: 0 0 25px;">
                Vous avez demandé à réinitialiser votre mot de passe.
                Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe.
              </p>

              <div style="text-align: center; margin: 40px 0;">
                <a href="${resetUrl}" style="display: inline-block; background-color: #D4AF37; color: #ffffff; text-decoration: none; padding: 16px 40px; font-size: 16px; font-weight: 600; letter-spacing: 1px;">
                  RÉINITIALISER MON MOT DE PASSE
                </a>
              </div>

              <p style="color: #888888; font-size: 14px; line-height: 1.6; margin: 25px 0;">
                Ce lien expire dans <strong>1 heure</strong>.
              </p>

              <div style="background-color: #f8f8f8; border-left: 4px solid #D4AF37; padding: 20px; margin: 30px 0;">
                <p style="color: #666666; font-size: 13px; margin: 0;">
                  Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email en toute sécurité.
                </p>
              </div>

              <p style="color: #888888; font-size: 12px; margin-top: 30px;">
                Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br>
                <a href="${resetUrl}" style="color: #D4AF37; word-break: break-all;">${resetUrl}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1A1A1A; padding: 30px; text-align: center;">
              <p style="color: #888888; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} ARTERAL. Tous droits réservés.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  return sendEmail({
    to,
    subject: `${SITE_NAME} - Réinitialisation de votre mot de passe`,
    html,
  });
}
