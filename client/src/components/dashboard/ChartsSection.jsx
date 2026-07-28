import { FaChartPie, FaChartColumn, FaChartLine } from "react-icons/fa6";

import ExpensePieChart from "../charts/ExpensePieChart";
import IncomeExpenseChart from "../charts/IncomeExpenseChart";
import MonthlyTrendChart from "../charts/MonthlyTrendChart";

export default function ChartsSection({ summary, transactions, darkMode }) {
  return (
    <div className="space-y-8 my-8">
      {/* Top Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-black/30 p-4 sm:p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-xl">
              <FaChartPie className="text-indigo-600 text-lg sm:text-xl" />
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                Expense Distribution
              </h2>

              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Category-wise expense analysis
              </p>
            </div>
          </div>

          <div className="h-[320px] sm:h-[380px]">
            <ExpensePieChart transactions={transactions} darkMode={darkMode} />
          </div>
        </div>

        {/* Income vs Expense */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-black/30 p-4 sm:p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
              <FaChartColumn className="text-indigo-600 text-lg sm:text-xl" />
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                Income vs Expense
              </h2>

              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {" "}
                Overall financial comparison
              </p>
            </div>
          </div>
          <div className="h-[280px] sm:h-[350px] overflow-hidden">
            <IncomeExpenseChart summary={summary} darkMode={darkMode} />
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-black/30 p-4 sm:p-6 hover:shadow-2xl
hover:-translate-y-1
transition-all
duration-300"
      >
        {" "}
        <div className="flex items-center gap-3 mb-5">
          <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl">
            <FaChartLine className="text-indigo-600 text-lg sm:text-xl" />
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
              Monthly Spending Trend
            </h2>

            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {" "}
              Track your expenses over time
            </p>
          </div>
        </div>
        <div className="h-[280px] sm:h-[350px] overflow-hidden">
          <MonthlyTrendChart transactions={transactions} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}
