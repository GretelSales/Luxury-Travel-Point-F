import CarCard from "./CarCard";
import "./CarCarousel.css";

export default function CarCarousel({
  cars = [],
  isDesktop,
  onHover,
  onLeave,
  onSelect,
}) {
  const availableCars = cars.filter((car) => car.disponible);

  if (!availableCars.length) return null;

  return (
    <div
      className="car-carousel"
      onMouseLeave={isDesktop ? onLeave : undefined}
    >
      <div className="car-carousel-track">
        {availableCars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            isDesktop={isDesktop}
            onHover={onHover}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
