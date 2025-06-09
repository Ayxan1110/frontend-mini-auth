import { rest } from 'msw';

export const handlers = [
  rest.post('http://localhost:8080/v1/user/register/code', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ data: { login_code: '5486554358112379' } }),
    );
  }),

  rest.post(
    'http://localhost:8080/v1/user/register/email',
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ data: [] }));
    },
  ),

  rest.post('http://localhost:8080/v1/auth/login/code', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ data: { session: 'mock-anon-session-token' } }),
    );
  }),

  rest.post(
    'http://localhost:8080/v1/auth/login/email',
    async (req, res, ctx) => {
      const body = await req.json();
      if (body.pincode === 123456) {
        return res(
          ctx.status(200),
          ctx.json({ data: { session: 'mock-email-session-token' } }),
        );
      }
      return res(
        ctx.status(401),
        ctx.json({
          error: {
            code: 'WRONG_PIN_CODE',
            message: 'PIN code expired or missing',
          },
        }),
      );
    },
  ),
];
