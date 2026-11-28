import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpensePieChart({ transactions, darkMode }) {
  const expenseTransactions = transactions.filter((t) => t.type === "expense");

  const categoryTotals = {};

  expenseTransactions.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Expenses",
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#06B6D4",
        ],
        borderWidth: 2,
        borderColor: darkMode ? "#1F2937" : "#FFFFFF",
      },
    ],
  };

  const isMobile = window.innerWidth < 640;

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      title: {
        display: true,
        text: "Expense by Category",
        color: darkMode ? "#FFFFFF" : "#111827",
        font: {
          size: isMobile ? 14 : 18,
        },
      },

      legend: {
        position: "bottom",

        labels: {
          color: darkMode ? "#E5E7EB" : "#374151",

          boxWidth: isMobile ? 12 : 18,
          boxHeight: isMobile ? 12 : 18,

          padding: isMobile ? 10 : 20,

          font: {
            size: isMobile ? 10 : 13,
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Pie data={data} options={options} />
    </div>
  );
}
