import { useEffect, useState } from "react";

export function useCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        setLoading(true);

        // ⬇️ Simulación de endpoint real
        const response = await fetch("/api/cars");

        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }

        const data = await response.json();

        if (isMounted) {
          setCars(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCars();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    cars,
    loading,
    error,
  };
}
