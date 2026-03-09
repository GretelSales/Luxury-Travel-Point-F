import { useState } from "react";
import "./CarCard.css";

export default function CarCard({ car, isDesktop, onHover, onSelect }) {
  const [showModal, setShowModal] = useState(false);

  const handleMouseEnter = () => {
    if (isDesktop && onHover) {
      onHover(car);
    }
  };

  const handleClick = () => {
    setShowModal(true);

    if (!isDesktop && onSelect) {
      onSelect(car);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
        className="car-card"
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        role="button"
      >
        <div className="car-card-image">
          <img src={car.photoUrl} alt={car.tipo || car.name} loading="lazy" />
        </div>

        <div className="car-card-info">
          <div className="car-card-header">
            <span className="car-card-type">{car.tipo || car.name}</span>

            <span className="car-card-price">${car.precio} / día</span>
          </div>

          {car.descripcion && (
            <p className="car-card-description">{car.descripcion}</p>
          )}
        </div>
      </div>

      {showModal && (
        <div className="car-modal" onClick={closeModal}>
          <button className="modal-close">✕</button>
          <img src={car.photoUrl} alt={car.tipo} />
        </div>
      )}
    </>
  );
}
