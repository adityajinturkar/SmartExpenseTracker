import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
);

export default function MonthlyTrendChart({ transactions, darkMode }) {
  const monthTotals = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      const month = new Date(t.date).toLocaleString("default", {
        month: "short",
      });

      monthTotals[month] = (monthTotals[month] || 0) + Number(t.amount);
    });

  if (Object.keys(monthTotals).length === 0) {
    return (
      <div className="flex items-center justify-center h-72 text-gray-500 dark:text-gray-400">
        No monthly expense data available.
      </div>
    );
  }

  const data = {
    labels: Object.keys(monthTotals),
    datasets: [
      {
        label: "Monthly Expenses",
        data: Object.values(monthTotals),
        borderColor: "#2563EB",
        backgroundColor: "rgba(37,99,235,0.25)",
        pointBackgroundColor: "#2563EB",
        pointBorderColor: "#FFFFFF",
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 3,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: darkMode ? "#E5E7EB" : "#374151",
        },
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
      <Line data={data} options={options} />
    </div>
  );
}
