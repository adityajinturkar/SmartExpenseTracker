import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ExportPDF({ transactions, summary }) {
  const exportPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.text("Smart Expense Tracker Report", 14, 20);

    // Date
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);

    // Summary
    doc.setFontSize(14);
    doc.text(`Total Income : ₹${summary.totalIncome}`, 14, 40);
    doc.text(`Total Expense : ₹${summary.totalExpense}`, 14, 48);
    doc.text(`Balance : ₹${summary.balance}`, 14, 56);

    // Table
    autoTable(doc, {
      startY: 65,
      head: [["Date", "Title", "Category", "Type", "Amount"]],
      body: transactions.map((t) => [
        new Date(t.date).toLocaleDateString(),
        t.title,
        t.category,
        t.type,
        `₹${t.amount}`,
      ]),
    });

    doc.save("Expense_Report.pdf");
  };

  return (
    <button
      onClick={exportPDF}
      className="
    w-full
    sm:w-auto
    flex
    items-center
    justify-center
    gap-2
    bg-red-600
    hover:bg-red-700
    text-white
    px-5
    py-2.5
    rounded-xl
    font-medium
    transition-all
    duration-300
    hover:scale-105
    shadow-md
  "
    >
      📄 Export PDF
    </button>
  );
}
