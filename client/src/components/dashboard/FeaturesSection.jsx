import {
  FaRobot,
  FaChartLine,
  FaFilePdf,
  FaFileExcel,
  FaMoon,
  FaBell,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRobot className="text-4xl sm:text-5xl text-blue-600" />,
    title: "AI Insights",
    desc: "Get personalized financial insights and smart recommendations.",
  },
  {
    icon: <FaChartLine className="text-4xl sm:text-5xl text-green-600" />,
    title: "Analytics",
    desc: "Visualize income and expenses with interactive charts.",
  },
  {
    icon: <FaFilePdf className="text-4xl sm:text-5xl text-red-600" />,
    title: "PDF Reports",
    desc: "Export your financial reports as professional PDF documents.",
  },
  {
    icon: <FaFileExcel className="text-4xl sm:text-5xl text-emerald-600" />,
    title: "Excel Export",
    desc: "Download all transactions in Excel format.",
  },
  {
    icon: <FaMoon className="text-4xl sm:text-5xl text-yellow-500" />,
    title: "Dark Mode",
    desc: "Switch between light and dark themes anytime.",
  },
  {
    icon: <FaBell className="text-4xl sm:text-5xl text-orange-500" />,
    title: "Notifications",
    desc: "Stay informed about transactions and AI reports.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="my-16 sm:my-20 lg:my-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 dark:text-white">
          Features
        </h2>

        <p className="mt-3 text-center text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Everything you need to manage your finances intelligently.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8
              hover:-translate-y-2 hover:shadow-2xl
              transition-all duration-300
              flex flex-col
              min-h-[240px]"
            >
              <div className="mb-5">{feature.icon}</div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>

              <p className="mt-3 text-gray-600 dark:text-gray-300 leading-7 flex-grow">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
