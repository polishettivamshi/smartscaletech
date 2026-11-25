import { cleanField, isValidEmail, sendLeadEmail } from './_lib/mailer';

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
  const service = cleanField(payload.service, 160);
  if (!name || !phone || !service) {
    return res.status(400).json({ error: 'Name, phone, and service are required' });
  }
  if (email && !isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    await sendLeadEmail(payload, 'Website lead');
    return res.status(200).json({ success: true, message: 'Lead emailed successfully' });
  } catch {
    console.error('[Lead Error] Email delivery failed');
    return res.status(503).json({
      error: 'Unable to send your request by email right now. Please contact us directly.',
    });
  }
}
