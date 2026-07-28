import { Pencil, Trash2 } from "lucide-react";

export default function TransactionTable({ transactions, onDelete, onEdit }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 mt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
            Recent Transactions
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {" "}
            Manage your income and expenses
          </p>
        </div>

        <span className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-3 py-2 text-xs sm:text-smrounded-full text-sm font-semibold">
          {transactions.length} Transactions
        </span>
      </div>
      <div className="overflow-x-auto rounded-2xl scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
        <table className="min-w-[900px] w-full">
          <thead>
            <tr className="border-b bg-gray-50 dark:bg-gray-700">
              <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300 whitespace-nowrap">
                Title
              </th>
              <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300 whitespace-nowrap">
                Type
              </th>
              <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300 whitespace-nowrap">
                Category
              </th>
              <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300 whitespace-nowrap">
                Amount
              </th>
              <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300 whitespace-nowrap">
                Date
              </th>
              <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300 whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10">
                  <div className="flex flex-col items-center">
                    <div className="text-4xl sm:text-5xl">📂</div>
                    <p className="mt-3 text-lg font-semibold text-gray-600 dark:text-gray-300">
                      No Transactions Yet
                    </p>

                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      Start by adding your first income or expense.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              transactions.map((transaction, index) => (
                <tr
                  key={transaction._id}
                  className={`border-b border-gray-200 dark:border-gray-700 transition duration-200 hover:bg-indigo-50 dark:hover:bg-gray-700  ${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-50 dark:bg-gray-700"
                  }`}
                >
                  <td className="px-3 sm:px-6 py-4 font-semibold text-gray-800 dark:text-white whitespace-nowrap">
                    {transaction.title}
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        transaction.type === "income"
                          ? "bg-green-100 text-green-700 "
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>

                  <td>
                    <span className="px-3 sm:px-6 py-4 font-semibold text-gray-800 dark:text-white whitespace-nowrap">
                      {transaction.category}
                    </span>
                  </td>
                  <td
                    className={`font-bold ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"} ₹
                    {Number(transaction.amount).toLocaleString()}
                  </td>
                  <td className="px-3 sm:px-6 py-4 font-semibold text-gray-800 dark:text-white whitespace-nowrap">
                    {" "}
                    {new Date(transaction.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                  </td>

                  <td>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onEdit(transaction)}
                        className="bg-blue-100 dark:bg-blue-900/40 hover:bg-blue-200 dark:hover:bg-blue-800 p-2 rounded-lg transition-all duration-200 hover:scale-110"
                      >
                        <Pencil size={18} className="text-blue-600" />
                      </button>

                      <button
                        onClick={() => onDelete(transaction._id)}
                        className="bg-red-100 dark:bg-red-900/40 hover:bg-red-200 dark:hover:bg-red-800 p-2 rounded-lg transition-all duration-200 hover:scale-110"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
