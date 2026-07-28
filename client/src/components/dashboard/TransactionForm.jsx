import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import {
  FaMoneyBillWave,
  FaTag,
  FaCalendarAlt,
  FaStickyNote,
  FaWallet,
} from "react-icons/fa";
import CreatableSelect from "react-select/creatable";
import categoryOptions from "../../data/categories";

export default function TransactionForm({ onSuccess, darkMode }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    type: "expense",
    title: "",
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.amount ||
      !formData.category ||
      !formData.date
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const formattedData = {
        ...formData,
        category: formData.category
          .trim()
          .toLowerCase()
          .replace(/\b\w/g, (char) => char.toUpperCase()),
      };

      const response = await api.post("/transactions", formattedData);
      toast.success("Transaction Added Successfully");

      setFormData({
        type: "expense",
        title: "",
        amount: "",
        category: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
      });

      onSuccess(response.data.transaction);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mt-8"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Add New Transaction
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Record your income and expenses.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Type */}
        <div>
          <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <FaWallet className="text-indigo-600" />
            Transaction Type
          </label>

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <FaStickyNote className="text-indigo-600" />
            Title
          </label>

          <input
            type="text"
            name="title"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Amount */}
        <div>
          <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <FaMoneyBillWave className="text-green-600" />
            Amount
          </label>

          <input
            type="number"
            name="amount"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Category */}
        <div>
          <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <FaTag className="text-purple-600" />
            Category
          </label>

          <div>
            <CreatableSelect
              options={categoryOptions}
              placeholder="Search or create category..."
              isClearable
              value={
                formData.category
                  ? {
                      value: formData.category,
                      label: formData.category,
                    }
                  : null
              }
              onChange={(selected) =>
                setFormData({
                  ...formData,
                  category: selected?.value || "",
                })
              }
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: darkMode ? "#374151" : "#FFFFFF",
                  borderColor: darkMode ? "#4B5563" : "#D1D5DB",
                  minHeight: "50px",
                  boxShadow: "none",
                  "&:hover": {
                    borderColor: "#6366F1",
                  },
                }),

                valueContainer: (provided) => ({
                  ...provided,
                  backgroundColor: darkMode ? "#374151" : "#FFFFFF",
                }),

                input: (provided) => ({
                  ...provided,
                  color: darkMode ? "#FFFFFF" : "#111827",
                }),

                singleValue: (provided) => ({
                  ...provided,
                  color: darkMode ? "#FFFFFF" : "#111827",
                }),

                placeholder: (provided) => ({
                  ...provided,
                  color: darkMode ? "#9CA3AF" : "#6B7280",
                }),

                menu: (provided) => ({
                  ...provided,
                  backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                  zIndex: 9999,
                }),

                menuList: (provided) => ({
                  ...provided,
                  backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
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
        </div>

        {/* Date */}
        <div>
          <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
            <FaCalendarAlt className="text-orange-500" />
            Date
          </label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
            <FaStickyNote className="text-indigo-600" />
            Description
          </label>

          <textarea
            rows={4}
            name="description"
            placeholder="Write a short description..."
            value={formData.description}
            onChange={handleChange}
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 w-full md:w-auto bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60"
      >
        {loading ? "Adding Transaction..." : "➕ Add Transaction"}
      </button>
    </form>
  );
}
