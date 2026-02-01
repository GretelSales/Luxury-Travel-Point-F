import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import TopBar from "./TopBar.jsx";
import CarCard from "./CarCard.jsx";
import { useCars } from "./useCars";
import "./Cars.css";

export default function Cars() {
  const { t } = useTranslation();
  const { cars, loading, error } = useCars();

  const isDesktop = window.innerWidth >= 1024;

  useEffect(() => {
    document.body.classList.add("light-page");
    return () => document.body.classList.remove("light-page");
  }, []);

  return (
    <>
      <TopBar />

      <section className="cars-page">
        <header className="cars-header">
          <h1>{t("cars.title")}</h1>
          <p className="cars-subtitle">{t("cars.subtitle")}</p>
        </header>

        {loading && <p className="cars-status">{t("common.loading")}</p>}
        {error && <p className="cars-status error">{t("common.error")}</p>}

        {!loading && cars.length === 0 && (
          <p className="cars-status">{t("cars.noCars")}</p>
        )}

        <div className="cars-grid">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} isDesktop={isDesktop} />
          ))}
        </div>
      </section>
    </>
  );
}
