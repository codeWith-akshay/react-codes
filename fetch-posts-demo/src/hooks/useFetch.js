import { useState, useEffect, useCallback } from "react";
import axios from "axios";

/**
 * Custom hook for fetching API data
 * @param {string} url - API endpoint
 * @returns {object} { data, loading, error, refetch }
 */

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(
    async (signal) => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(url, { signal });
        console.log(res);
        setData(res.data);
      } catch (err) {
        if (axios.isCancel?.(err) || err.name === "CanceledError") return;
        setError(err?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}





// const fetchData = useCallback(
//     async (signal) => {
//       setLoading(true);
//       setError("");
//       try {
//         const res = await fetch(url, { signal });
//         if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
//         const json = await res.json();
//         setData(json);
//       } catch (err) {
//         if (err.name === "AbortError") return; // request cancelled
//         setError(err.message || "Failed to fetch data");
//       } finally {
//         setLoading(false);
//       }
//     },
//     [url]
//   );

//   useEffect(() => {
//     const controller = new AbortController();
//     fetchData(controller.signal);
//     return () => controller.abort();
//   }, [fetchData]);

//   return { data, loading, error, refetch: fetchData };
// }
