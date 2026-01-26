import "./CarSidePreview.css";

export default function CarSidePreview({ car, visible }) {
  if (!car) return null;

  return (
    <aside
      className={`car-side-preview ${visible ? "visible" : ""}`}
      aria-hidden={!visible}
    >
      <div className="car-side-preview-image">
        <img src={car.photoUrl} alt={car.tipo} draggable={false} />
      </div>

      <div className="car-side-preview-info">
        <h3 className="car-side-preview-title">{car.tipo}</h3>

        {car.descripcion && (
          <p className="car-side-preview-description">{car.descripcion}</p>
        )}

        <div className="car-side-preview-price">
          ${car.precio} <span>/ día</span>
        </div>
      </div>
    </aside>
  );
}
