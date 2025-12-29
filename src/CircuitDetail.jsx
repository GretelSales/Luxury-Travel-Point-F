import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CircuitDetail.css";

const API_URL =
  "https://luxury-travel-point-frontend.onrender.com/api/circuits";

export default function CircuitDetailPage() {
  const { id } = useParams();

  const [circuit, setCircuit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCircuit = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}/fullById`);
        if (!res.ok) throw new Error("Error al cargar circuito");
        const data = await res.json();
        console.log("📦 CIRCUIT:", data);
        setCircuit(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCircuit();
  }, [id]);

  if (loading) return <div className="circuit-loading">Cargando…</div>;
  if (error) return <div className="circuit-error">{error}</div>;
  if (!circuit) return null;

  // Todas las imágenes del circuito
  const allImages = circuit.daysData?.flatMap((day) => day.images || []) || [];

  return (
    <div className="circuit-detail-bg">
      <div className="circuit-detail-wrapper">
        {/* Header */}
        <header className="circuit-header">
          <h1>{circuit.name}</h1>
          <div className="circuit-meta">
            <span>{circuit.days} días</span>
            <span>Desde ${circuit.base_price}</span>
            <span>Inicio: {circuit.starting_point}</span>
          </div>
        </header>

        {/* Galería */}
        <section className="circuit-gallery">
          {allImages.length > 0 ? (
            allImages.map((img, i) => (
              <img key={i} src={img} alt={`Circuito ${i + 1}`} />
            ))
          ) : (
            <img src="https://placehold.co/800x500?text=Sin+imagen" />
          )}
        </section>

        {/* Días */}
        <section className="circuit-section">
          <h2>Itinerario</h2>
          <ul className="days-list">
            {circuit.daysData.map((day, i) => (
              <li key={i}>
                <div className="day-title">
                  Día {day.day} · {day.city}, {day.country}
                </div>
                <p>{day.description}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Incluye */}
        <section className="circuit-section">
          <h2>Incluye</h2>
          <ul className="includes-list">
            {circuit.includes.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
