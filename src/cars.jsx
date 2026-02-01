import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import TopBar from "./TopBar.jsx";
import { useCars } from "./useCars";
import "./Cars.css";

export default function Cars() {
  const { t } = useTranslation();
  const { cars, loading, error } = useCars();

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

        {!loading && cars?.length === 0 && (
          <p className="cars-status">{t("cars.noCars")}</p>
        )}

        <div className="cars-grid">
          {cars?.map((car) => (
            <article key={car.id} className="car-card">
              <div className="car-image-wrap">
                <img
                  src={car.image_url}
                  alt={car.name}
                  onError={(e) => {
                    e.target.src = "https://placehold.co/800x500?text=Car";
                  }}
                />
              </div>

              <div className="car-info">
                <h3 className="car-name">{car.name}</h3>

                <p className="car-type">
                  {car.transmission === "manual"
                    ? t("cars.manual")
                    : t("cars.automatic")}
                </p>

                <div className="car-meta">
                  <span>
                    {car.seats} {t("cars.seats")}
                  </span>
                  <span>
                    {car.doors} {t("cars.doors")}
                  </span>
                </div>

                <div className="car-footer">
                  <span className="car-price">
                    ${car.price_per_day} / {t("cars.day")}
                  </span>

                  <button className="car-btn">{t("cars.reserve")}</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
