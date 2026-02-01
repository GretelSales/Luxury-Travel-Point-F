import { useEffect, useState } from "react";

const API_URL = import.meta.env.REACT_APP_API_URL;

export function useCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCars = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_URL}/api/cars`);

        if (!res.ok) {
          throw new Error("Failed to fetch cars");
        }

        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          throw new Error("Response is not JSON");
        }

        const data = await res.json();

        if (isMounted) {
          setCars(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          console.error("useCars error:", err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchCars();

    return () => {
      isMounted = false;
    };
  }, []);

  return { cars, loading, error };
}
