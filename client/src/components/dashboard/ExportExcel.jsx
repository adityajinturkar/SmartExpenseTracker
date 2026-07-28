import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ExportExcel({ transactions }) {
  const exportToExcel = () => {
    const data = transactions.map((t) => ({
      Date: new Date(t.date).toLocaleDateString(),
      Title: t.title,
      Type: t.type,
      Category: t.category,
      Amount: t.amount,
      Description: t.description,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(file, "Transactions.xlsx");
  };

  return (
    <button
      onClick={exportToExcel}
      className="
    w-full
    sm:w-auto
    flex
    items-center
    justify-center
    gap-2
    bg-green-600
    hover:bg-green-700
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
      📊 Export Excel
    </button>
  );
}
