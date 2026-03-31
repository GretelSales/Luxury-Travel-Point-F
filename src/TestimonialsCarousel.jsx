import { useState, useEffect } from "react";
import "./TestimonialsCarousel.css";
import { useTranslation } from "react-i18next";

export default function TestimonialsCarousel({ testimonials = [] }) {
  const { i18n } = useTranslation();
  const [index, setIndex] = useState(0);

  const visibleCount = 3;

  const next = () => {
    setIndex((prev) => Math.min(prev + 1, testimonials.length - itemsPerView));
  };

  const prev = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth >= 1024) setItemsPerView(3);
      else if (window.innerWidth >= 600) setItemsPerView(2);
      else setItemsPerView(1);
    };

    updateItems(); // inicial
    window.addEventListener("resize", updateItems);

    return () => window.removeEventListener("resize", updateItems);
  }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      setTestimonials(data); // solo vienen los visibles
    };
    fetchTestimonials();
  }, []);

  const visibleItems = testimonials.slice(index, index + visibleCount);

  return (
    <section className="ltp-testimonials ltp-section ltp-section-narrow">
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
