import { rest } from 'msw';
import { isEmail } from '../utils/validators';

export const handlers = [
  rest.post('http://localhost:8080/v1/user/register/code', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ data: { login_code: '5486554358112379' } }),
    );
  }),

  rest.post(
    'http://localhost:8080/v1/user/register/email',
    async (req, res, ctx) => {
      const { email } = await req.json();

      const invalid = !isEmail(email);

      if (invalid) {
        return res(
          ctx.status(422),
          ctx.json({
            error: {
              code: 'VALIDATION_ERROR',
              message: 'Email address format is incorrect',
              details: [
                {
                  field: 'email',
                  message: 'Email address format is incorrect',
                },
              ],
            },
          }),
        );
      }

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
      const { pincode } = await req.json();
      if (pincode === 123456) {
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

  rest.post(
    'http://localhost:8080/v1/user/register/google_account',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: {
            session: 'mock-session',
          },
        }),
      );
    },
  ),
];
