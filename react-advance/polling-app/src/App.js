import React from "react";
import usePolling from "./usePolling";
import Loader from "./Loader";

const App = () => {
  const { data, error, loading, polling, stopPolling, startPolling } = usePolling(
    "https://catfact.ninja/fact", // 🔥 Dynamic API
    5000
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Live Cat Facts 🐱</h1>

      {error && <h2 style={{ color: "red" }}>Error: {error}</h2>}
      {loading ? (
        <Loader />
      ) : (
        data && (
          <p style={{ fontSize: "18px", margin: "10px 0" }}>
            {data.fact} ({data.length} chars)
          </p>
        )
      )}

      <div style={{ marginTop: "20px" }}>
        {polling ? (
          <button
            onClick={stopPolling}
            style={{ padding: "10px 20px", background: "red", color: "#fff" }}
          >
            Stop Polling
          </button>
        ) : (
          <button
            onClick={startPolling}
            style={{ padding: "10px 20px", background: "green", color: "#fff" }}
          >
            Restart Polling
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
