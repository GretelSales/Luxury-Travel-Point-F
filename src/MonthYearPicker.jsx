import { useState } from "react";
import "./MonthYearPicker.css";
import { useTranslation } from "react-i18next";

export default function MonthYearPicker({ value, onChange }) {
  const { t } = useTranslation();

  // Lista de meses generada dinámicamente usando traducciones
  const months = Array.from({ length: 12 }, (_, i) => {
    const monthValue = String(i + 1).padStart(2, "0");
    return { value: monthValue, label: t(`monthNames.${monthValue}`) };
  });

  // Años del 2026 al 2036
  const years = Array.from({ length: 11 }, (_, i) => 2026 + i);

  const [selectedMonth, setSelectedMonth] = useState(value?.month || "");
  const [selectedYear, setSelectedYear] = useState(value?.year || "");

  const update = (m, y) => {
    if (m && y) {
      onChange({ month: m, year: y });
    }
  };

  return (
    <div className="month-year-container">
      <select
        className="month-year-select"
        value={selectedMonth}
        onChange={(e) => {
          setSelectedMonth(e.target.value);
          update(e.target.value, selectedYear);
        }}
      >
        {/* Placeholder traducido */}
        <option value="">{t("month")}</option>
        {months.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </select>

      <select
        className="month-year-select"
        value={selectedYear}
        onChange={(e) => {
          setSelectedYear(e.target.value);
          update(selectedMonth, e.target.value);
        }}
      >
        {/* Placeholder traducido */}
        <option value="">{t("year")}</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}
