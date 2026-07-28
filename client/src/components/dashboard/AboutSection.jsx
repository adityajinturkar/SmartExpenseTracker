import { FaRobot } from "react-icons/fa";

export default function AboutSection() {
  return (
    <section id="about" className="mt-16 sm:mt-20 lg:mt-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
            <FaRobot className="text-2xl sm:text-3xl text-blue-600" />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              About SmartExpenseAI
            </h2>

            <p className="mt-1 text-sm sm:text-base text-gray-500 dark:text-gray-400">
              AI-Powered Personal Finance Management
            </p>
          </div>
        </div>

        <p className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 dark:text-gray-300">
          SmartExpenseAI is an intelligent expense management platform designed
          to help users efficiently manage their income and expenses. It
          provides interactive financial dashboards, insightful analytics,
          AI-generated spending insights, and seamless PDF and Excel export
          features to make personal finance tracking simple, organized, and
          data-driven.
        </p>
      </div>
    </section>
  );
}
