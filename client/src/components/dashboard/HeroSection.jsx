import { FaPlus, FaRobot, FaCheckCircle } from "react-icons/fa";

export default function HeroSection({ onAddTransaction, onGenerateAI }) {
  return (
    <section
      id="home"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white p-10 shadow-xl"
    >
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        {" "}
        <span className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm mb-4">
          🚀 AI Powered Finance Dashboard
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          AI Smart
          <br />
          Expense Tracker
        </h1>
        <p className="text-base sm:text-lg">
          {" "}
          Track your income, control expenses, analyze spending trends, and
          receive AI-powered financial insights—all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          {" "}
          <button
            onClick={onAddTransaction}
            className="flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            <FaPlus />
            Add Transaction
          </button>
          <button
            onClick={onGenerateAI}
            className="flex items-center gap-2 border border-white px-6 py-3 rounded-xl hover:bg-white/10 transition"
          >
            <FaRobot />
            Generate AI Report
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          <div className="flex items-center gap-2">
            <FaCheckCircle />
            AI Insights
          </div>

          <div className="flex items-center gap-2">
            <FaCheckCircle />
            Analytics
          </div>

          <div className="flex items-center gap-2">
            <FaCheckCircle />
            Budget Tracking
          </div>

          <div className="flex items-center gap-2">
            <FaCheckCircle />
            PDF & Excel Export
          </div>
        </div>
      </div>
    </section>
  );
}
