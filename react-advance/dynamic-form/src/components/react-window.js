// src/components/ReactWindowSimple.js
import React, { useEffect, useState, useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import axios from "axios";

const ReactWindowSimple = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch data once
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      
      // Simulate 10000 items
      const largeData = Array(10000)
        .fill()
        .map((_, i) => ({ ...res.data[i % 100], id: i + 1 }));
      
      setData(largeData);
    };

    fetchData();
  }, []);

  // Filtered data based on search
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  // Row renderer
  const Row = ({ index, style }) => {
    const item = filteredData[index];
    return (
      <div
        style={{
          ...style,
          borderBottom: "1px solid #ccc",
          padding: "10px",
          backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
        }}
      >
        <strong>{item.id}</strong>: {item.title}
      </div>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Large List + Search</h1>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "10px", width: "100%", marginBottom: "20px" }}
      />

      {/* Virtualized List */}
      <List
        height={600}
        itemCount={filteredData.length}
        itemSize={50}
        width="100%"
      >
        {Row}
      </List>
    </div>
  );
};

export default ReactWindowSimple;
