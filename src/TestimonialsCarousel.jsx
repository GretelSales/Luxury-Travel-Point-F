import { useState } from "react";
import "./TestimonialsCarousel.css";
import { useTranslation } from "react-i18next";

export default function TestimonialsCarousel({ testimonials = [] }) {
  const { i18n } = useTranslation();
  const [index, setIndex] = useState(0);

  const visibleCount = 3;

  const next = () => {
    if (index + visibleCount < testimonials.length) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const visibleItems = testimonials.slice(index, index + visibleCount);

  return (
    <section className="ltp-testimonials ltp-section ltp-section-narrow">
      <h2 className="testimonials-title">
        {i18n.language === "es" ? "Opiniones" : "Reviews"}
      </h2>

      <div className="carousel-container">
        <button className="carousel-btn left" onClick={prev}>
          ‹
        </button>

        <div className="testimonials-wrapper">
          {visibleItems.map((t, i) => (
            <div key={i} className="testimonial-card">
              <p className="testimonial-text">
                {i18n.language.startsWith("es") ? t.text_es : t.text_en}
              </p>

              <div className="testimonial-author">
                <span className="name">{t.name}</span>
                <span className="stars">{"★".repeat(t.stars)}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-btn right" onClick={next}>
          ›
        </button>
      </div>
    </section>
  );
}
