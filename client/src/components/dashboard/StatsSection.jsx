import {
  FaWallet,
  FaMoneyBillWave,
  FaArrowTrendUp,
  FaChartPie,
} from "react-icons/fa6";

export default function StatsSection({ summary, transactions }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 my-10">
      {/* Balance */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <FaWallet className="text-3xl sm:text-4xl text-blue-600 mb-3" />

        <h3 className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
          Balance
        </h3>

        <p className="mt-2 text-2xl sm:text-3xl font-bold break-words">
          ₹{summary?.balance ?? 0}
        </p>
      </div>

      {/* Income */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <FaMoneyBillWave className="text-3xl sm:text-4xl text-green-600 mb-3" />

        <h3 className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
          Income
        </h3>

        <p className="mt-2 text-2xl sm:text-3xl font-bold break-words">
          ₹{summary?.totalIncome ?? 0}
        </p>
      </div>

      {/* Expenses */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <FaArrowTrendUp className="text-3xl sm:text-4xl text-red-500 mb-3" />

        <h3 className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
          Expenses
        </h3>

        <p className="mt-2 text-2xl sm:text-3xl font-bold break-words">
          ₹{summary?.totalExpense ?? 0}
        </p>
      </div>

      {/* Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <FaChartPie className="text-3xl sm:text-4xl text-purple-600 mb-3" />

        <h3 className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
          Transactions
        </h3>

        <p className="mt-2 text-2xl sm:text-3xl font-bold">
          {transactions?.length ?? 0}
        </p>
      </div>
    </section>
  );
}
