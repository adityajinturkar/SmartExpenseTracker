import { FaWallet, FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

export default function SummaryCards({ summary }) {
  const formatCurrency = (amount = 0) => `₹${amount.toLocaleString("en-IN")}`;

  const cards = [
    {
      title: "Total Income",
      amount: formatCurrency(summary?.totalIncome),
      icon: <FaArrowTrendUp />,
      gradient: "from-emerald-500 to-green-600",
      message: "Money Coming In",
    },
    {
      title: "Total Expense",
      amount: formatCurrency(summary?.totalExpense),
      icon: <FaArrowTrendDown />,
      gradient: "from-rose-500 to-red-600",
      message: "Track Your Spending",
    },
    {
      title: "Current Balance",
      amount: formatCurrency(summary?.balance),
      icon: <FaWallet />,
      gradient: "from-indigo-500 to-blue-600",
      message: "Available Balance",
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-gradient-to-r ${card.gradient}
            rounded-2xl
            p-5 sm:p-6 lg:p-7
            text-white
            shadow-lg dark:shadow-black/30
            hover:shadow-2xl
            hover:-translate-y-1
            hover:scale-[1.02]
            transition-all duration-300
            flex justify-between items-center
            min-h-[170px]`}
        >
          <div className="flex-1 pr-4">
            <p className="text-white/80 text-sm font-medium">{card.title}</p>

            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold break-words">
              {card.amount}
            </h2>

            <p className="mt-4 text-xs sm:text-sm text-white/80">
              {card.message}
            </p>
          </div>

          <div className="flex-shrink-0 bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-5 text-3xl sm:text-4xl shadow-md">
            {card.icon}
          </div>
        </div>
      ))}
    </section>
  );
}
