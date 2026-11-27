# 💰 SmartExpenseTracker AI

An AI-powered expense tracker built with the MERN stack. Track income and expenses, view dashboard analytics, and generate AI-assisted financial insights.

## Live Demo

- **Frontend:** https://smartexpensetrackerai.vercel.app/
- **Backend health endpoint:** https://smartexpensetracker-iwn9.onrender.com/
- **Source code:** https://github.com/adityajinturkar/SmartExpenseTracker

> The backend is hosted on Render Free and may take longer to respond after inactivity. AI insights rely on a third-party free model whose availability and limits can change.

## Features

- JWT user registration and login
- Add, edit, delete, search, and filter transactions
- Dashboard summaries and charts
- AI-generated financial insights through OpenRouter
- PDF and Excel exports
- Dark mode and responsive UI
- Password reset and email notifications through Resend

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS |
| Backend | Node.js, Express 5 |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JWT, bcrypt |
| AI | OpenRouter API (OpenAI-compatible SDK) |
| Email | Resend |
| Hosting | Vercel (frontend), Render (backend) |

## Run Locally

Prerequisites: Git and Node.js 22 LTS.

1. Clone the repository:

   ```bash
   git clone https://github.com/adityajinturkar/SmartExpenseTracker.git
   cd SmartExpenseTracker
   ```

2. Set up the backend:

   ```bash
   cd server
   npm ci
   ```

   Copy `server/.env.example` to `server/.env` and fill in your own values.

   ```bash
   npm run dev
   ```

3. In a second terminal, set up the frontend:

   ```bash
   cd client
   npm ci
   ```

   Copy `client/.env.example` to `client/.env`. For local development, use `VITE_API_URL=http://localhost:5000`.

   ```bash
   npm run dev
   ```

4. Open the local URL printed by Vite (normally http://localhost:5173).

For a production frontend build, run `npm run build` from `client/`.

## Environment Variables

**Backend** (`server/.env`): `PORT`, `MONGO_URI`, `JWT_SECRET`, `OPENROUTER_API_KEY`, `RESEND_API_KEY`, and `CLIENT_URL`.

**Frontend** (`client/.env`): `VITE_API_URL`.

See the example files for placeholders. Never commit real credentials or put server secrets in Vite variables.

## Recovery and Deployment

See **[docs/RECOVERY.md](docs/RECOVERY.md)** for:
- Fresh local setup and recovery after a long break
- Render and Vercel deployment settings
- MongoDB Atlas, OpenRouter, and Resend troubleshooting
- Smoke-test checklist and backup recommendations

## Security Notes

- Keep `.env` files private.
- Rotate credentials if they are exposed.
- Use test accounts and sample transactions for demos.
- Back up MongoDB data separately; GitHub stores source code, not database records.

## Author

**Aditya Jinturkar**  
GitHub: https://github.com/adityajinturkar
