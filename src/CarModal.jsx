import { useEffect, useRef } from "react";
import "./CarModal.css";

export default function CarModal({ car, onClose }) {
  const startY = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    // Bloquear scroll del body
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    currentY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (currentY.current - startY.current > 80) {
      onClose();
    }
    startY.current = 0;
    currentY.current = 0;
  };

  if (!car) return null;

  return (
    <div className="car-modal-backdrop" onClick={onClose}>
      <div
        className="car-modal"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button
          className="car-modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="car-modal-image">
          <img src={car.photoUrl} alt={car.tipo} />
        </div>

        <div className="car-modal-info">
          <h3>{car.tipo}</h3>

          {car.descripcion && (
            <p className="car-modal-description">{car.descripcion}</p>
          )}

          <div className="car-modal-price">
            ${car.precio} <span>/ día</span>
          </div>
        </div>
      </div>
    </div>
  );
}
