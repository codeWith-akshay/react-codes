import { useState, useEffect, useRef } from "react";
import axios from "axios";

const usePolling = (url, intervalTime = 5000) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [polling, setPolling] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!polling) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // first call immediately
    intervalRef.current = setInterval(fetchData, intervalTime);

    return () => clearInterval(intervalRef.current);
  }, [url, intervalTime, polling]);

  const stopPolling = () => {
    setPolling(false);
    clearInterval(intervalRef.current);
  };

  const startPolling = () => {
    if (!polling) {
      setPolling(true);
    }
  };

  return { data, error, loading, polling, stopPolling, startPolling };
};

export default usePolling;
