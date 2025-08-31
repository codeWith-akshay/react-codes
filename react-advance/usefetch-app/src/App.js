import React, { useState } from "react";
import useFetch from "./useFetch";
import useFetchAxios from "./useFetchAxios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

const App = () => {
  const [useAxios, setUseAxios] = useState(false);

  // dono hook call karte hai
  const fetchHook = useFetch(API_URL);
  const axiosHook = useFetchAxios(API_URL);

  // toggle ke hisaab se kaunsa data lena hai decide karenge
  const { data, loading, error } = useAxios ? axiosHook : fetchHook;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Custom Hook Demo</h1>

      {/* Toggle Button */}
      <button
        onClick={() => setUseAxios(!useAxios)}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Switch to {useAxios ? "Fetch" : "Axios"}
      </button>

      {loading && <h2>Loading...</h2>}
      {error && <h2 style={{ color: "red" }}>Error: {error}</h2>}

      {!loading && !error && (
        <ul>
          {data &&
            data.map((user) => (
              <li key={user.id}>
                {user.name} ({user.email})
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default App;
