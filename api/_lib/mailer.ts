import nodemailer from 'nodemailer';
import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';

const EMAIL_FIELDS: Array<[string, string, number]> = [
  ['Name', 'name', 120],
  ['Email', 'email', 160],
  ['Phone', 'phone', 40],
  ['Service', 'service', 160],
  ['Source page', 'sourcePage', 160],
  ['LinkedIn URL', 'linkedInUrl', 500],
  ['Current role', 'currentRole', 160],
  ['Company or college', 'companyOrCollege', 160],
  ['Experience level', 'experienceLevel', 120],
  ['Target role', 'targetRole', 160],
  ['Timeline', 'timeline', 120],
  ['Budget', 'budget', 120],
  ['Project brief', 'projectBrief', 3000],
  ['Resume or brief link', 'resumeLink', 500],
  ['Additional notes', 'note', 2000],
];

export const cleanField = (value: unknown, maxLength: number): string =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[character];
  });

const isEnabled = (value: string | undefined): boolean =>
  value?.toLowerCase() === 'true';

export async function sendLeadEmail(
  data: Record<string, unknown>,
  type: string
): Promise<void> {
  const mailer = process.env.MAILER || 'smtp';
  const username = process.env.MAIL_USERNAME;
  const password = process.env.MAIL_PASSWORD?.replace(/\s/g, '');
  const host = process.env.MAIL_HOST || 'smtp.gmail.com';
  const port = Number(process.env.MAIL_PORT || 587);
  const encryption = (process.env.MAIL_ENCRYPTION || 'tls').toLowerCase();
  const from = process.env.MAIL_FROM || username;
  const fromName = process.env.MAIL_FROM_NAME || 'Smart Scale Tech';
  const to = process.env.EMAIL_TO || username;

  if (mailer !== 'smtp') {
    throw new Error('Unsupported mailer configuration');
  }
  if (!username || !password || !from || !to) {
    throw new Error('SMTP email delivery is not configured');
  }
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('Invalid SMTP port configuration');
  }

  const secure = encryption === 'ssl' || port === 465;
  const requireTLS = !secure && (
    isEnabled(process.env.SMTP_USE_TLS) || encryption === 'tls'
  );
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    requireTLS,
    auth: { user: username, pass: password },
  });

  const values = EMAIL_FIELDS
    .map(([label, key, maxLength]) =>
      [label, cleanField(data[key], maxLength).replace(/[\r\n]+/g, ' ')] as const
    )
    .filter(([, value]) => value);
  const name = cleanField(data.name, 120).replace(/[\r\n]+/g, ' ');
  const service = cleanField(data.service, 160).replace(/[\r\n]+/g, ' ') || 'General inquiry';
  const replyTo = cleanField(data.email, 160);
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const logo = await readFile(path.resolve(process.cwd(), 'public', 'logo.png'));
  const logoCid = `smartscaletech-logo-${randomUUID()}@smartscaletech`;
  const rows = values.map(([label, value]) => `
    <tr>
      <td style="padding:12px 14px;border-bottom:1px solid #eae3d5;color:#6b6862;font-size:13px;font-weight:600;vertical-align:top;width:34%;">${escapeHtml(label)}</td>
      <td style="padding:12px 14px;border-bottom:1px solid #eae3d5;color:#111111;font-size:14px;line-height:1.55;vertical-align:top;word-break:break-word;">${escapeHtml(value)}</td>
    </tr>`).join('');
  const html = `
    <div style="margin:0;padding:32px 16px;background-color:#f3eee3;font-family:Arial,Helvetica,sans-serif;color:#111111;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:640px;margin:0 auto;">
        <tr>
          <td style="padding:0 0 18px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="width:38px;height:38px;"><img src="cid:${logoCid}" alt="SST" width="38" height="38" style="display:block;width:38px;height:38px;border-radius:10px;" /></td>
                <td style="padding-left:10px;font-size:19px;font-weight:800;letter-spacing:-0.4px;">SmartScale<span style="color:#d9541e;">Tech</span></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:30px;background-color:#ffffff;border:1px solid #d8d3c9;border-radius:18px;">
            <p style="margin:0 0 8px;color:#d9541e;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Website notification</p>
            <h1 style="margin:0 0 10px;font-size:25px;line-height:1.25;color:#111111;">New ${escapeHtml(type)}</h1>
            <p style="margin:0 0 22px;color:#57534e;font-size:14px;line-height:1.6;">A new inquiry was submitted through the SmartScaleTech website. Details are below.</p>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #eae3d5;border-radius:12px;border-collapse:separate;border-spacing:0;overflow:hidden;">
              ${rows}
              <tr>
                <td style="padding:12px 14px;color:#6b6862;font-size:13px;font-weight:600;">Submitted</td>
                <td style="padding:12px 14px;color:#111111;font-size:14px;">${escapeHtml(timestamp)} IST</td>
              </tr>
            </table>
            <p style="margin:22px 0 0;padding:14px 16px;border-left:3px solid #d9541e;background-color:#f3eee3;color:#57534e;font-size:13px;line-height:1.55;">Reply to this email to respond directly to the customer, when their email address was provided.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:18px 8px 0;text-align:center;color:#6b6862;font-size:12px;line-height:1.6;">Smart Scale Tech · Hitech City, Hyderabad<br/><a href="mailto:smartscaletechforyou@gmail.com" style="color:#d9541e;text-decoration:none;">smartscaletechforyou@gmail.com</a> · +91 90008 59695</td>
        </tr>
      </table>
    </div>`;
  const text = [
    `New ${type.toLowerCase()} received from the SmartScaleTech website.`,
    '',
    ...values.map(([label, value]) => `${label}: ${value}`),
    `Submitted at: ${timestamp} IST`,
  ].join('\n');

  await transporter.sendMail({
    from: { name: fromName, address: from },
    to,
    ...(isValidEmail(replyTo) ? { replyTo } : {}),
    subject: `[SmartScaleTech] ${type}: ${service}${name ? ` — ${name}` : ''}`,
    html,
    text,
    attachments: [{
      filename: 'sst-logo.png',
      content: logo,
      contentType: 'image/png',
      contentDisposition: 'inline',
      cid: logoCid,
    }],
  });
}
