import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import CreatableSelect from "react-select/creatable";
import categoryOptions from "../../data/categories";
export default function EditTransactionModal({
  isOpen,
  onClose,
  transaction,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    type: "expense",
    title: "",
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        type: transaction.type,
        title: transaction.title,
        amount: transaction.amount,
        category: transaction.category,
        description: transaction.description || "",
        date: transaction.date?.split("T")[0],
      });
    }
  }, [transaction]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formattedData = {
        ...formData,
        category: formData.category
          .trim()
          .toLowerCase()
          .replace(/\b\w/g, (char) => char.toUpperCase()),
      };

      await api.put(`/transactions/${transaction._id}`, formattedData);

      toast.success("Transaction Updated");

      onSuccess();
      onClose();
    } catch (err) {
      toast.error("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const inputClass =
    "w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 w-full max-w-2xl transition-colors duration-300">
        {" "}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              ✏️ Edit Transaction
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Update your transaction details.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-2xl text-gray-400 dark:text-gray-300 hover:text-red-500 transition"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleUpdate} className="grid md:grid-cols-2 gap-6">
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={inputClass}
          />

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className={inputClass}
          />
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Category
            </label>

            <CreatableSelect
              options={categoryOptions}
              isClearable
              isSearchable
              placeholder="Search or create category..."
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
                  category: selected ? selected.value : "",
                })
              }
              styles={{
                control: (base, state) => ({
                  ...base,
                  minHeight: "52px",
                  borderRadius: "12px",
                  borderColor: state.isFocused ? "#6366F1" : "#D1D5DB",
                  boxShadow: state.isFocused
                    ? "0 0 0 3px rgba(99,102,241,0.15)"
                    : "none",
                  "&:hover": {
                    borderColor: "#6366F1",
                  },
                }),
                menu: (base) => ({
                  ...base,
                  borderRadius: "12px",
                }),
              }}
            />
          </div>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={inputClass}
          />

          <div className="md:col-span-2">
            <textarea rows={4} className={`${inputClass} resize-none`} />
          </div>

          <div className="md:col-span-2 flex justify-end gap-4 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="
px-6 py-3
rounded-xl
bg-gray-200
dark:bg-gray-700
hover:bg-gray-300
dark:hover:bg-gray-600
text-gray-700
dark:text-white
font-semibold
transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="
px-6 py-3
rounded-xl
bg-gradient-to-r
from-indigo-600
to-blue-600
hover:from-indigo-700
hover:to-blue-700
text-white
font-semibold
shadow-lg
hover:shadow-xl
transition-all
disabled:opacity-60"
            >
              {loading ? "Updating..." : "💾 Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
