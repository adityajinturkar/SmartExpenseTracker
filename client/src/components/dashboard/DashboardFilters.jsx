import {
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaTimesCircle,
} from "react-icons/fa";
import Select from "react-select";

export default function DashboardFilters({
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  categories,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  darkMode,
}) {
  const inputClass =
    "w-full h-12 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300";
  const categoryOptions = categories.map((category) => ({
    value: category,
    label: category,
  }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 mt-8">
      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800  dark:text-white">
          Filter Transactions
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {" "}
          Search and filter your transactions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {/* Search */}

        <div>
          <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <FaSearch className="text-indigo-600" />
            Search
          </label>

          <input
            type="text"
            placeholder="Search transaction..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Category */}

        <div>
          <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
            <FaFilter className="text-purple-600" />
            Category
          </label>
          <Select
            options={categoryOptions}
            placeholder="Search category..."
            isSearchable
            menuPlacement="auto"
            menuPortalTarget={document.body}
            value={categoryOptions.find(
              (option) => option.value === categoryFilter,
            )}
            onChange={(selected) =>
              setCategoryFilter(selected ? selected.value : "All")
            }
            styles={{
              menuPortal: (base) => ({
                ...base,
                zIndex: 9999,
              }),

              control: (provided) => ({
                ...provided,
                backgroundColor: darkMode ? "#374151" : "#FFFFFF",
                borderColor: darkMode ? "#4B5563" : "#D1D5DB",
                color: darkMode ? "#FFFFFF" : "#111827",
                minHeight: "50px",
                boxShadow: "none",
                "&:hover": {
                  borderColor: "#6366F1",
                },
              }),

              menu: (provided) => ({
                ...provided,
                backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                zIndex: 9999,
              }),

              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused
                  ? darkMode
                    ? "#374151"
                    : "#EEF2FF"
                  : darkMode
                    ? "#1F2937"
                    : "#FFFFFF",
                color: darkMode ? "#FFFFFF" : "#111827",
                cursor: "pointer",
              }),

              singleValue: (provided) => ({
                ...provided,
                color: darkMode ? "#FFFFFF" : "#111827",
              }),

              placeholder: (provided) => ({
                ...provided,
                color: darkMode ? "#9CA3AF" : "#6B7280",
              }),

              input: (provided) => ({
                ...provided,
                color: darkMode ? "#FFFFFF" : "#111827",
              }),

              dropdownIndicator: (provided) => ({
                ...provided,
                color: darkMode ? "#D1D5DB" : "#6B7280",
              }),

              indicatorSeparator: (provided) => ({
                ...provided,
                backgroundColor: darkMode ? "#4B5563" : "#D1D5DB",
              }),
            }}
          />
        </div>

        {/* From Date */}

        <div>
          <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
            <FaCalendarAlt className="text-green-600" />
            From
          </label>

          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className={`${inputClass} cursor-pointer`}
          />
        </div>

        {/* To Date */}

        <div>
          <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
            <FaCalendarAlt className="text-red-600" />
            To
          </label>

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Clear Button */}

      <div className="mt-8 flex flex-col sm:flex-row justify-end">
        <button
          onClick={() => {
            setSearch("");
            setCategoryFilter("All");
            setFromDate("");
            setToDate("");
          }}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <FaTimesCircle />
          Clear Filters
        </button>
      </div>
    </div>
  );
}
