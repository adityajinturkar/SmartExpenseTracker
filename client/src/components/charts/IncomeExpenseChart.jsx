import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function IncomeExpenseChart({ summary, darkMode }) {
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount (₹)",
        data: [summary.totalIncome, summary.totalExpense],
        backgroundColor: ["#10B981", "#EF4444"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Income vs Expense",
        color: darkMode ? "#FFFFFF" : "#111827",
      },
      tooltip: {
        backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
        titleColor: darkMode ? "#FFFFFF" : "#111827",
        bodyColor: darkMode ? "#FFFFFF" : "#111827",
        borderColor: darkMode ? "#374151" : "#E5E7EB",
        borderWidth: 1,
      },
    },

    scales: {
      x: {
        ticks: {
          color: darkMode ? "#D1D5DB" : "#374151",
        },
        grid: {
          color: darkMode ? "#374151" : "#E5E7EB",
        },
      },

      y: {
        beginAtZero: true,
        ticks: {
          color: darkMode ? "#D1D5DB" : "#374151",
        },
        grid: {
          color: darkMode ? "#374151" : "#E5E7EB",
        },
      },
    },
  };

  return (
    <div className="w-full">
      <Bar data={data} options={options} />
    </div>
  );
}
