import ReactMarkdown from "react-markdown";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

export default function AIInsights({ insights, loading, onRefresh }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-black/30 hover:shadow-xl transition-all duration-300 p-4 sm:p-6 mt-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
          🤖 AI Financial Insights
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          {insights && (
            <CopyToClipboard
              text={insights}
              onCopy={() => toast.success("AI Report Copied!")}
            >
              <button
                className="
                  w-full
                  sm:w-auto
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  font-medium
                  transition-all
                  duration-300
                  hover:scale-105
                "
              >
                📋 Copy Report
              </button>
            </CopyToClipboard>
          )}

          <button
            onClick={onRefresh}
            disabled={loading}
            className="
              w-full
              sm:w-auto
              bg-gradient-to-r
              from-indigo-600
              to-blue-600
              hover:from-indigo-700
              hover:to-blue-700
              disabled:bg-gray-400
              text-white
              px-5
              py-2
              rounded-lg
              font-medium
              transition-all
              duration-300
              hover:scale-105
              disabled:hover:scale-100
            "
          >
            {loading ? "Generating..." : "✨ Generate AI Insights"}
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <p className="text-gray-500 dark:text-gray-300 animate-pulse text-center">
            🤖 Generating AI insights...
          </p>
        </div>
      ) : !insights ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-4xl sm:text-5xl mb-4 animate-bounce">🤖</div>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
            AI Insights Not Generated
          </h3>

          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-lg text-sm sm:text-base">
            Click the <strong>"Generate AI Insights"</strong> button above to
            analyze your transactions and receive personalized financial
            recommendations.
          </p>
        </div>
      ) : (
        /* AI Report */
        <div className="mt-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
          <div
            className="
              max-h-[500px]
              overflow-y-auto
              pr-2

              prose
              dark:prose-invert
              max-w-none

              text-sm
              sm:text-base

              text-gray-800
              dark:text-gray-200

              prose-headings:text-gray-900
              dark:prose-headings:text-white

              prose-p:text-gray-700
              dark:prose-p:text-gray-300

              prose-strong:text-indigo-600
              dark:prose-strong:text-indigo-300

              prose-li:text-gray-700
              dark:prose-li:text-gray-300

              prose-code:text-pink-500
              dark:prose-code:text-pink-300

              prose-a:text-indigo-600
              dark:prose-a:text-indigo-400
            "
          >
            <ReactMarkdown>{insights}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
