import ExportExcel from "../components/dashboard/ExportExcel";
import { useEffect, useState, useRef, useMemo } from "react";import Navbar from "../components/dashboard/Navbar";
import TransactionForm from "../components/dashboard/TransactionForm";
import TransactionTable from "../components/dashboard/TransactionTable";
import api from "../services/api";
import toast from "react-hot-toast";
import EditTransactionModal from "../components/dashboard/EditTransactionModal";
import ChartsSection from "../components/dashboard/ChartsSection";
import DashboardFilters from "../components/dashboard/DashboardFilters";
import ExportPDF from "../components/dashboard/ExportPDF";
import AIInsights from "../components/dashboard/AIInsights";
import FeaturesSection from "../components/dashboard/FeaturesSection";
import HeroSection from "../components/dashboard/HeroSection";
import StatsSection from "../components/dashboard/StatsSection";
import AboutSection from "../components/dashboard/AboutSection";
import ContactSection from "../components/dashboard/ContactSection";
import Footer from "../components/dashboard/Footer";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

const [loading, setLoading] = useState(true);

  const [transactions, setTransactions] = useState([]);

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [insights, setInsights] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  const [notifications, setNotifications] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const tableRef = useRef(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    if (search.trim() !== "") {
      tableRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [search]);

  useEffect(() => {
  const loadDashboard = async () => {
    try {
      setLoading(true);

      await Promise.all([
        fetchSummary(),
        fetchTransactions(),
      ]);
    } finally {
      setLoading(false);
    }
  };

  loadDashboard();
}, []);

const fetchSummary = async () => {
  try {
    const { data } = await api.get("/transactions/summary");
    setSummary(data.summary);
  } catch  {
    toast.error("Unable to load summary");
  }
};

  const fetchTransactions = async () => {
  try {
    const { data } = await api.get("/transactions");
    setTransactions(data.transactions);
  } catch {
    toast.error("Unable to load transactions");
  }
};

  const fetchAIInsights = async () => {
    try {
      setLoadingAI(true);

      const res = await api.get("/ai/insights");

      setInsights(res.data.insights);
      setNotifications((prev) => [
        {
          id: Date.now(),
          title: "🤖 AI Report Ready",
          message: "Your AI financial insights have been generated.",
          time: "Just now",
        },
        ...prev,
      ]);
    } catch (err) {
      toast.error("Failed to load AI insights");
      console.error(err);
    } finally {
      setLoadingAI(false);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);

      toast.success("Transaction Deleted");

      setNotifications((prev) => [
        {
          id: Date.now(),
          title: "🗑️ Transaction Deleted",
          message: "A transaction was deleted successfully.",
          time: "Just now",
        },
        ...prev,
      ]);

      fetchSummary();
      fetchTransactions();
    } catch {
      toast.error("Delete Failed");
    }
  };

  const categories = ["All", ...new Set(transactions.map((t) => t.category))];

  const filteredTransactions = useMemo(() => {
  return transactions.filter((transaction) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      transaction.title.toLowerCase().includes(searchText) ||
      transaction.category.toLowerCase().includes(searchText) ||
      transaction.type.toLowerCase().includes(searchText) ||
      (transaction.description || "").toLowerCase().includes(searchText) ||
      String(transaction.amount).includes(searchText);

    const matchesCategory =
      categoryFilter === "All" ||
      transaction.category === categoryFilter;

    const transactionDate = new Date(transaction.date);

    const matchesFrom =
      !fromDate || transactionDate >= new Date(fromDate);

    const matchesTo =
      !toDate || transactionDate <= new Date(toDate);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesFrom &&
      matchesTo
    );
  });
}, [transactions, search, categoryFilter, fromDate, toDate]);

if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>

        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Loading Dashboard...
        </p>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        notifications={notifications}
        user={user}
      />

      <div className="max-w-7xl mx-auto p-8">
          <section id="home" className="scroll-mt-20">
        <HeroSection
          onAddTransaction={() => {
            document
              .getElementById("transaction-form")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          onGenerateAI={fetchAIInsights}
        />
          </section>

        <StatsSection summary={summary} transactions={transactions} />

        <section id="dashboard" className="scroll-mt-20">
          <ChartsSection
            summary={summary}
            transactions={transactions}
            darkMode={darkMode}
          />
        </section>

        <section id="ai" className="scroll-mt-20">
          <AIInsights
            insights={insights}
            loading={loadingAI}
            onRefresh={fetchAIInsights}
          />
        </section>

        <DashboardFilters
          search={search}
          setSearch={setSearch}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          categories={categories}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          darkMode={darkMode}
        />

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-5 mb-5">
  <ExportExcel transactions={filteredTransactions} />
  <ExportPDF transactions={filteredTransactions} summary={summary} />
</div>

        <div>
          <section id="transactions" className="scroll-mt-20">
            <TransactionTable
              transactions={filteredTransactions}
              onDelete={deleteTransaction}
              onEdit={(transaction) => {
                setSelectedTransaction(transaction);
                setIsEditOpen(true);
              }}
            />
          </section>
        </div>

        <section id="transaction-form">
          <TransactionForm
            darkMode={darkMode}
            onSuccess={(transaction) => {
              fetchSummary();
              fetchTransactions();

              setNotifications((prev) => [
                {
                  id: Date.now(),
                  title: "✅ Transaction Added",
                  message: `₹${transaction.amount} ${transaction.type} transaction "${transaction.title}" added successfully.`,
                  time: "Just now",
                },
                ...prev,
              ]);
            }}
          />
        </section>

        <EditTransactionModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          transaction={selectedTransaction}
          onSuccess={() => {
            fetchTransactions();
            fetchSummary();
            fetchAIInsights();
          }}
        />
      </div>
      <section id="features" className="scroll-mt-20">
        <FeaturesSection />
      </section>

<section id="about" className="scroll-mt-20">
      <AboutSection />
      <div className="flex justify-center my-16">
        <div className="w-32 border-t-2 border-gray-300 dark:border-gray-700"></div>
      </div>
      </section>

     <section id="contact" className="scroll-mt-20">
  <ContactSection />
</section>

      <Footer />
    </div>
  );
}
