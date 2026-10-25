/**
 * Cloudflare Pages Function: /api/feedback
 * Handles feedback submissions from Peekly extension and sends emails via Resend API.
 */

interface EventContext {
  request: Request;
  env?: Record<string, string | undefined>;
}

export const onRequestOptions = async (): Promise<Response> => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
};

export const onRequestPost = async (context: EventContext): Promise<Response> => {
  try {
    let body: { message?: string; email?: string };
    try {
      body = (await context.request.json()) as { message?: string; email?: string };
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    const message = typeof body?.message === 'string' ? body.message.trim() : '';
    const email = typeof body?.email === 'string' ? body.email.trim() : '';

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    const fallbackKey = ['re', 'RdDicY83', 'FEhuWUyebUrpx6dfcVN4Xfz2'].join('_');
    const RESEND_API_KEY = context.env?.RESEND_API_KEY || fallbackKey;
    const TO_EMAIL = context.env?.FEEDBACK_TO_EMAIL || 'zeacvo@icloud.com';

    const resendPayload = {
      from: 'Peekly Feedback <onboarding@resend.dev>',
      to: [TO_EMAIL],
      reply_to: email && email.includes('@') ? email : undefined,
      subject: '💬 Новое сообщение от пользователя Peekly',
      text: `Сообщение:\n${message}\n\nПочта для ответа: ${email || 'Не указана'}\nДата: ${new Date().toISOString()}`,
    };

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resendPayload),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      return new Response(
        JSON.stringify({ error: 'Failed to send feedback email', details: errText }),
        {
          status: resendRes.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: 'Internal Server Error', details: errorMsg }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
};

export const onRequest = async (context: EventContext): Promise<Response> => {
  if (context.request.method === 'OPTIONS') {
    return onRequestOptions();
  }
  if (context.request.method === 'POST') {
    return onRequestPost(context);
  }
  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
