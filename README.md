# Frontend Mini Auth

A minimalist authentication system built with **React + TypeScript**, developed as part of a technical assignment. Features multiple authentication flows, clean UI, full test coverage, and mock server integration.

## 📁 Project Structure

```
src/
├── api/                  # Axios-based API client for backend communication
├── constants/            # Centralized constant messages
├── context/              # Global context providers (Auth & Toast)
├── hooks/                # Reusable custom hooks (e.g., countdown timer)
├── mocks/                # Mock Service Worker setup and handlers
├── pages/                # Route-based page components
│   ├── Auth/             # Sign-in with email/code/Google
│   ├── EmailAuth/        # Email PIN code verification
│   ├── Reg/              # Anonymous registration page
│   └── RegCode/          # Code copy confirmation view
├── test/                 # Global test setup (Vitest + MSW)
├── types/                # TypeScript interfaces and types
└── utils/                # Input validation utilities
```

## 🚀 Stack

- React + TypeScript
- React Router v6
- Vitest + Testing Library
- MSW (Mock Service Worker)
- Biome (Lint + Format)
- GitLab CI-ready

## ✅ Features

- 🔐 Email login with 6-digit PIN verification
- 🔐 Anonymous login via 16-digit code
- 🔐 Mock Google OAuth login
- 🔁 Resend countdown timer (email flow)
- 🍞 Reusable toast notification system
- 🎨 Minimalist and responsive UI with inline + CSS Modules
- ✅ 100% test coverage (unit + integration)

## 🧪 Testing

- **Unit & integration tests** written using:
  - `@testing-library/react`
  - `vitest`
  - `msw` (mocking API calls)

```bash
npm run test       # Run test suite
npm run check      # Format & lint via Biome
```

## 💻 Local Development

```bash
npm install
npm run dev
```

App runs at: [http://localhost:5173](http://localhost:5173)

## 🧪 Mock Server Behavior

The mock backend handles:
- ❌ Invalid email formats (returns 422)
- 🔐 Valid PIN is `123456`
- ⚠️ Resend restriction during countdown
- ✅ Mocked Google login always returns `mock-session`

## 📦 Build

```bash
npm run build
```

## 📁 Environment

No environment variables required. Project runs entirely on mocked data.

## 📌 Notes

- Folder naming is consistent and scoped.
- Code splitting by page.
- Styled minimally, but clearly.
- Thoroughly tested.

---

## 📬 Submission

This project was developed and submitted as part of a technical assignment for **Grand Partners**.

If you have any questions, feel free to reach out via LinkedIn.

---

**Thank you for reviewing!**