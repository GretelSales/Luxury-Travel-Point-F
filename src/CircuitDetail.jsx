import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CircuitDetail.css";

const API_URL =
  "https://luxury-travel-point-frontend.onrender.com/api/circuits";

export default function CircuitDetailPage() {
  const { id } = useParams(); // id pasado en la URL
  const navigate = useNavigate();

  const [circuit, setCircuit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCircuit = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/${id}/fullById`);
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
        const data = await res.json();
        setCircuit(data);
      } catch (err) {
        setError(err.message || "Error al cargar circuito");
      } finally {
        setLoading(false);
      }
    };

    fetchCircuit();
  }, [id]);

  if (loading) return <div className="circuit-loading">Cargando...</div>;
  if (error) return <div className="circuit-error">{error}</div>;
  if (!circuit) return null;

  return (
    <div className="circuit-detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <header className="circuit-header">
        <h1>{circuit.name}</h1>
        <div className="circuit-base-info">
          <span>{circuit.days} días</span>
          <span>Desde ${circuit.base_price}</span>
          <span>Punto de inicio: {circuit.starting_point}</span>
        </div>
      </header>

      <section className="circuit-images">
        {circuit.images && circuit.images.length > 0 ? (
          circuit.images.map((img) => (
            <img
              key={img.id}
              src={img.image_url}
              alt={circuit.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/1200x800?text=Imagen+no+disponible";
              }}
            />
          ))
        ) : (
          <img
            src="https://placehold.co/1200x800?text=Sin+imagen"
            alt="Sin imagen"
          />
        )}
      </section>

      <section className="circuit-days">
        <h2>Días del circuito</h2>
        {circuit.daysData && circuit.daysData.length > 0 ? (
          <ul>
            {circuit.daysData.map((day) => (
              <li key={day.id}>
                <strong>Día {day.day_number}:</strong>{" "}
                {day.city ? day.city.name || day.city : "Sin ciudad"}{" "}
                {day.city?.country ? `(${day.city.country})` : ""}
                <p>{day.city?.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay información de días disponible.</p>
        )}
      </section>

      <section className="circuit-includes">
        <h2>Incluye</h2>
        {circuit.includes && circuit.includes.length > 0 ? (
          <ul>
            {circuit.includes.map((item) => (
              <li key={item.id}>{item.label}</li>
            ))}
          </ul>
        ) : (
          <p>No hay información de items incluidos.</p>
        )}
      </section>
    </div>
  );
}
