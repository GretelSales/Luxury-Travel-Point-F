import "./CarCard.css";

export default function CarCard({ car, isDesktop, onHover, onSelect }) {
  const handleMouseEnter = () => {
    if (isDesktop && onHover) {
      onHover(car);
    }
  };

  const handleClick = () => {
    if (!isDesktop && onSelect) {
      onSelect(car);
    }
  };

  return (
    <div
      className="car-card"
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      <div className="car-card-image">
        <img src={car.photoUrl} alt={car.tipo} loading="lazy" />
      </div>

      <div className="car-card-info">
        <span className="car-card-type">{car.tipo}</span>
        <span className="car-card-price">${car.precio} / día</span>
      </div>
    </div>
  );
}
