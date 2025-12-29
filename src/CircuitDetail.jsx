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

  const allImages = circuit.daysData?.flatMap((day) => day.images || []) || [];

  return (
    <div className="circuit-page">
      {/* HERO */}
      <section className="circuit-hero">
        <div className="hero-content">
          <h1>{circuit.name}</h1>
        </div>
      </section>

      {/* INFO CLAVE */}
      <section className="circuit-key-info">
        <div className="price">
          <span>Desde</span>
          <strong>${circuit.base_price}</strong>
        </div>

        <div className="meta">
          <div>
            <strong>{circuit.days}</strong>
            <span>días</span>
          </div>
          <div>
            <span>Inicio</span>
            <strong>{circuit.starting_point}</strong>
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="circuit-carousel">
        <div className="carousel-track">
          {allImages.length > 0 ? (
            allImages.map((img, i) => (
              <img key={i} src={img} alt={`Vista ${i + 1}`} />
            ))
          ) : (
            <img src="https://placehold.co/1200x700?text=Sin+imagen" />
          )}
        </div>
      </section>

      {/* ITINERARIO */}
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

      {/* INCLUYE */}
      <section className="circuit-section">
        <h2>Incluye</h2>
        <ul className="includes-list">
          {circuit.includes.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
