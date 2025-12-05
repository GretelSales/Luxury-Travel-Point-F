import React, { useEffect, useState } from "react";
import CircuitsGrid from "./CircuitsGrid"; // ajustar ruta si es necesaria

const API_URL = "http://localhost:4000/api/circuits/full";

export default function CircuitsPage() {
  const [allCircuits, setAllCircuits] = useState([]); // todos los circuitos sin filtrar
  const [circuits, setCircuits] = useState([]); // circuitos a mostrar (filtrados)
  const [countries, setCountries] = useState([]); // lista de países para el select
  const [selectedCountry, setSelectedCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ============================
  //  1. Cargamos los circuitos
  // ============================
  useEffect(() => {
    const loadCircuits = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);

        const data = await res.json();

        // Debug: volcar la respuesta cruda (pega primeras líneas en la conversación si sigue fallando)
        console.log(
          "DEBUG: respuesta raw / tipo:",
          Array.isArray(data) ? "array" : "object"
        );
        if (Array.isArray(data)) {
          console.log("DEBUG: primeros 2 items (array):", data.slice(0, 2));
        } else {
          console.log("DEBUG: keys of object response:", Object.keys(data));
          if (Array.isArray(data.circuits))
            console.log(
              "DEBUG: primeros 2 circuits:",
              data.circuits.slice(0, 2)
            );
          if (Array.isArray(data.countries))
            console.log("DEBUG: countries from backend:", data.countries);
        }

        // soporta "array" o "paginated" o { circuits, countries }
        const items = Array.isArray(data)
          ? data
          : data.circuits || data.data || [];
        setAllCircuits(items);
        setCircuits(items); // mostrar todo inicialmente

        // Construir lista de países únicos:
        // 1) si backend ya trae countries globales, úsalo.
        if (
          data &&
          !Array.isArray(data) &&
          Array.isArray(data.countries) &&
          data.countries.length > 0
        ) {
          const backendCountries = [
            ...new Set(data.countries.filter(Boolean)),
          ].sort();
          setCountries(backendCountries);
          console.log(
            "DEBUG: usando countries provistos por backend:",
            backendCountries
          );
        } else {
          // 2) si no, extraemos de daysData de cada circuito
          const countriesSet = new Set();
          items.forEach((c) => {
            // daysData es el array que en tu backend contiene { city, country, description }
            if (Array.isArray(c.daysData)) {
              c.daysData.forEach((d) => {
                if (d && d.country) countriesSet.add(d.country);
              });
            }
            // fallback: si existe c.countries ya calculado en backend
            if (Array.isArray(c.countries)) {
              c.countries.forEach((ct) => {
                if (ct) countriesSet.add(ct);
              });
            }
          });
          const derived = Array.from(countriesSet).sort();
          setCountries(derived);
          console.log(
            "DEBUG: countries derivados desde daysData/c.countries:",
            derived
          );
        }

        setLoading(false);
      } catch (err) {
        console.error("Error cargando circuits:", err);
        setError(err.message || String(err));
        setLoading(false);
      }
    };

    loadCircuits();
  }, []);

  // ============================
  //  2. Aplicar filtro por país (al pulsar botón)
  // ============================
  const applyCountryFilter = () => {
    // safeguard
    if (!selectedCountry) {
      setCircuits(allCircuits);
      return;
    }

    // Filtrar usando daysData (si existe) o c.countries (si existe)
    const filtered = allCircuits.filter((circuit) => {
      // preferimos daysData
      if (Array.isArray(circuit.daysData) && circuit.daysData.length > 0) {
        return circuit.daysData.some((d) => d && d.country === selectedCountry);
      }
      // fallback si backend ya devolvió c.countries
      if (Array.isArray(circuit.countries) && circuit.countries.length > 0) {
        return circuit.countries.includes(selectedCountry);
      }
      // si no hay info de país, excluir
      return false;
    });

    console.log(
      `DEBUG: filtro aplicado para "${selectedCountry}", resultados:`,
      filtered.length
    );
    setCircuits(filtered);
  };

  return (
    <div className="circuits-page">
      <div
        style={{
          padding: "18px 0",
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        <label htmlFor="country-select" style={{ fontWeight: 600 }}>
          País:
        </label>

        <select
          id="country-select"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="country-select"
          style={{ padding: "8px 12px", borderRadius: 8 }}
        >
          <option value="">-- Mostrar todos --</option>
          {countries.length === 0 && (
            <option disabled>Sin países disponibles</option>
          )}
          {countries.map((ct) => (
            <option key={ct} value={ct}>
              {ct}
            </option>
          ))}
        </select>

        <button
          className="ltp-btn"
          onClick={applyCountryFilter}
          style={{ marginLeft: 8 }}
        >
          Filtrar por país
        </button>

        <div style={{ marginLeft: "auto", color: "#666", fontSize: 14 }}>
          {loading
            ? "Cargando circuitos..."
            : `${allCircuits.length} circuitos cargados`}
        </div>
      </div>

      {error && (
        <div style={{ color: "crimson", padding: 8 }}>
          Error al cargar: {error}
        </div>
      )}

      {/* GRILLA DE CIRCUITOS */}
      <CircuitsGrid circuits={circuits} />
    </div>
  );
}
