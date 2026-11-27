# SmartExpenseTracker — Recovery and Maintenance Guide

This guide records the repository's current setup so the project can be restored after a long period without development.

Repository: https://github.com/adityajinturkar/SmartExpenseTracker  
Frontend: https://smartexpensetrackerai.vercel.app/  
Backend: https://smartexpensetracker-iwn9.onrender.com/

## 1. Architecture

- `client/`: React 19 + Vite frontend.
- `server/`: Node.js + Express 5 API (CommonJS).
- Database: MongoDB Atlas through Mongoose.
- Authentication: JWT.
- AI insights: OpenRouter, called through the OpenAI-compatible SDK.
- Email: Resend.
- Frontend hosting: Vercel.
- Backend hosting: Render.

The API root route `/` returns a small JSON health response. It confirms that the Express process is responding; it does not independently prove that every external service is healthy.

## 2. Prerequisites

Install Node.js 22 LTS (or a Node version supported by the current Vite release) and Git. Keep the committed `package-lock.json` files. Use `npm ci` rather than `npm install` for reproducible installs.

## 3. Fresh local setup

Clone the repository:

```bash
git clone https://github.com/adityajinturkar/SmartExpenseTracker.git
cd SmartExpenseTracker
```

### Backend

```bash
cd server
npm ci
```

Copy `.env.example` to `.env` and fill in the real values (see section 4).

Start the API:

```bash
npm run dev
```

The backend uses `PORT` when provided and otherwise defaults to port 5000. Its root health endpoint should respond at:

```
http://localhost:5000/
```

### Frontend

Open a second terminal from the repository root:

```bash
cd client
npm ci
```

Copy `.env.example` to `.env`. For local work, set `VITE_API_URL=http://localhost:5000`.

Start the Vite development server:

```bash
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

For a production build check:

```bash
cd client
npm run build
```

## 4. Environment variables

### Backend: `server/.env`

| Variable | Purpose |
|---|---|
| `PORT` | Local/server port. Render supplies its own port; the app reads `process.env.PORT`. |
| `MONGO_URI` | MongoDB Atlas connection string. |
| `JWT_SECRET` | Private secret used to sign login tokens. Use a long, random value. |
| `OPENROUTER_API_KEY` | Server-side key for AI insights. |
| `RESEND_API_KEY` | Server-side key used by welcome and password-reset emails. |
| `CLIENT_URL` | Frontend origin used to construct password-reset links. |

### Frontend: `client/.env`

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Backend origin used by the Axios API client. Local: `http://localhost:5000`. Production: `https://smartexpensetracker-iwn9.onrender.com`. |

Vite exposes variables prefixed with `VITE_` to browser code. Never put database credentials, JWT secrets, or provider API keys in the client environment.

Do not copy real secrets into GitHub, screenshots, chat messages, or public issue reports. The example files contain placeholders only.

## 5. Production deployment settings

### Render backend

The repository's backend lives in `server/`. The Render service previously used this configuration:

- Service type: Web Service
- Branch: `main`
- Root Directory: `server`
- Build Command: `npm install` (prefer `npm ci` when the lockfile is present and the service configuration supports it)
- Start Command: `npm start`
- Environment variables: configure the backend variables from section 4 in Render's Environment page.

After changing environment variables, trigger/review the resulting deploy and confirm the service is Live. Check Render application logs for `MongoDB Connected` and the server listening message.

The Render free instance can spin down after inactivity. The first request after inactivity can be delayed. This is a hosting-plan characteristic, not necessarily an application defect.

### Vercel frontend

The frontend lives in `client/`. The Vercel project should use:

- Root Directory: `client`
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment variable: `VITE_API_URL=https://smartexpensetracker-iwn9.onrender.com`

The existing `client/vercel.json` rewrite sends application routes to `index.html`, which supports direct refreshes on client-side routes. Redeploy after changing Vercel environment variables.

The backend CORS allowlist in `server/server.js` currently includes the deployed Vercel origin and `http://localhost:5173`. If the frontend domain changes, update that allowlist deliberately and redeploy the backend.

## 6. MongoDB Atlas recovery

If logs show DNS errors such as `querySrv ENOTFOUND`, or the database cannot connect:

1. Sign in to MongoDB Atlas and open the SmartExpenseTracker project.
2. Confirm the cluster exists and is running. Resume it if Atlas has paused it due to inactivity.
3. Open Database Access and confirm the database user still exists. Reset its password if necessary.
4. Update the password in the Render `MONGO_URI` and local `server/.env`. URL-encode special characters in the URI password.
5. Open Network Access and confirm the hosting environment is permitted. Avoid leaving a broad public IP rule in place longer than necessary; use the narrowest rule supported by the hosting setup.
6. Confirm the URI hostname matches the current Atlas cluster connection string.
7. Restart/redeploy the backend and look for `MongoDB Connected` in logs.

Do not delete or recreate the Atlas cluster as a first troubleshooting step; it may contain existing user and transaction data.

## 7. OpenRouter AI recovery

The AI feature currently calls the OpenRouter chat-completions endpoint using the model identifier `baidu/ernie-5.5-flash-preview:free` and a server-side `OPENROUTER_API_KEY`.

Free model availability, rate limits, provider routing, and response speed can change. If AI insights stop working:

1. Check Render logs for the provider error and timestamp.
2. Check that `OPENROUTER_API_KEY` is present and valid in Render.
3. Check OpenRouter's model page and current free-tier availability for the configured model.
4. If that model is unavailable, choose a currently available free model on OpenRouter and update the model identifier in `server/services/geminiService.js`.
5. Deploy and test AI insights using a test account with sample transactions.

Do not assume a model remains free or available forever. Do not remove the empty-response/error handling when changing models. AI generation depends on an external free provider and cannot be guaranteed to work continuously.

## 8. Resend email recovery

Welcome and password-reset emails use Resend through `RESEND_API_KEY`. If email actions fail, verify the key and sender/domain status in Resend. The current code uses Resend's onboarding sender address; provider restrictions may apply to recipient addresses until a sender domain is verified.

## 9. Post-recovery smoke test

After restoring either local or hosted services, test in this order:

- [ ] Backend root endpoint responds with the API-running JSON.
- [ ] Render logs show a successful MongoDB connection.
- [ ] Register a new test account (use an email address you control).
- [ ] Log in and confirm the dashboard opens.
- [ ] Add an income transaction.
- [ ] Add an expense transaction.
- [ ] Edit and delete a test transaction.
- [ ] Confirm dashboard totals/charts update.
- [ ] Run AI insights and confirm a non-empty report is returned.
- [ ] Test PDF and Excel exports.
- [ ] Test logout and login again.
- [ ] Refresh a nested frontend route directly.

Use test data, not private financial records, when demonstrating the project.

## 10. Backup and preservation

- Keep the GitHub repository and both `package-lock.json` files.
- Keep private copies of `server/.env` and production environment values in a password manager or other secure secret store. Do not commit them.
- Periodically export/backup the MongoDB database using Atlas-supported backup/export tools. A GitHub source-code backup does not back up user accounts or transactions.
- Before changing dependencies or AI model configuration, commit the known-working version so it can be restored.
- After a successful recovery, record the date, commit SHA, deployment status, and any changed provider settings here.

## 11. Useful commands

```bash
# Install exactly from lockfiles
cd server && npm ci
cd ../client && npm ci

# Run backend (from server/)
npm run dev

# Run frontend (from client/)
npm run dev

# Build frontend (from client/)
npm run build

# Inspect local Git changes (from repository root)
git status
git log -5 --oneline
```

## 12. Current known limitations

- Render Free may sleep when inactive.
- MongoDB Atlas free-tier clusters may pause under provider inactivity policies.
- OpenRouter free model names, availability, quotas, and latency can change.
- Resend onboarding sender restrictions may affect email delivery.
- A successful frontend build does not prove that MongoDB, email, or AI integrations are operational; run the smoke test above.
