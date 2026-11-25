import { cleanField, isValidEmail, MailerError, sendLeadEmail } from './_lib/mailer';

interface ApiRequest {
  method?: string;
  body?: unknown;
}

interface ApiResponse {
  status(code: number): ApiResponse;
  json(body: Record<string, unknown>): void;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const data = req.body;
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return res.status(400).json({ error: 'Invalid request payload' });
  }

  const payload = data as Record<string, unknown>;
  const name = cleanField(payload.name, 120);
  const phone = cleanField(payload.phone, 40);
  const email = cleanField(payload.email, 160);
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: 'A valid email address is required' });
  }

  try {
    await sendLeadEmail(payload, 'Service request');
    return res.status(200).json({
      success: true,
      message: 'Service request emailed successfully',
      founderWhatsApp: '919000859695',
      founderEmail: 'smartscaletechforyou@gmail.com',
    });
  } catch (err) {
    const code = err instanceof MailerError ? err.code : 'EMAIL_DELIVERY_FAILED';
    const detail = err instanceof Error ? err.message : 'Unknown email error';
    console.error(`[Service Request Error] ${code}: ${detail}`);
    return res.status(503).json({
      code,
      error: 'Unable to send your request by email right now. Please contact us directly.',
    });
  }
}
