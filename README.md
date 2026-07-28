# 💰 SmartExpenseTracker

An AI-powered Smart Expense Tracker built with the MERN Stack that helps users manage income and expenses, visualize financial data, and generate AI-based financial insights.

## 🚀 Features

- 🔐 User Authentication (JWT)
- 👤 Register & Login
- 🔑 Forgot & Reset Password
- 📧 Email Notifications
- 💵 Add, Edit & Delete Transactions
- 📊 Dashboard with Analytics
- 📈 Monthly Expense & Income Charts
- 🥧 Expense Category Pie Chart
- 📄 Export Transactions to PDF
- 📊 Export Transactions to Excel
- 🌙 Dark Mode
- 🤖 AI Financial Insights (OpenRouter AI)
- 📱 Responsive Design

---

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router
- React Hot Toast
- Chart.js

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Nodemailer
- OpenRouter AI API

---

## 📂 Project Structure

```
SmartExpenseTracker/
│
├── client/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/adityajinturkar/SmartExpenseTracker.git
```

```bash
cd SmartExpenseTracker
```

---

## Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

OPENROUTER_API_KEY=your_openrouter_api_key

CLIENT_URL=http://localhost:5173

EMAIL_USER=your_email

EMAIL_PASS=your_email_password
```

Run backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file inside the `client` folder.

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend

```bash
npm run dev
```

---

## 📸 Screenshots

> Add screenshots of:

- Login Page
- Dashboard
- Charts
- AI Insights
- Dark Mode

---

## 🌐 Deployment

### Frontend

- Vercel

### Backend

- Render

---

## 👨‍💻 Author

Aditya Jinturkar

GitHub:
https://github.com/adityajinturkar

## ⭐ Support
If you found this project useful, please consider giving it a ⭐ on GitHub.


