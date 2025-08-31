import React, { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]); // API data
  const [currentPage, setCurrentPage] = useState(1); // active page
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // search input

  const recordsPerPage = 10; // har page pe records

  // API fetch
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const result = await res.json();
      setData(result);
      setLoading(false);
    };
    fetchData();
  }, []);

  // 🔍 Filtered Data
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  // Page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📄 Search + Pagination Example</h1>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search title..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1); // search karte hi page reset ho
        }}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid gray",
        }}
      />

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          {/* Data show */}
          <ul>
            {currentRecords.length > 0 ? (
              currentRecords.map((item) => (
                <li key={item.id}>
                  <strong>{item.id}. </strong> {item.title}
                </li>
              ))
            ) : (
              <h3>No results found ❌</h3>
            )}
          </ul>

          {/* Pagination UI */}
          {filteredData.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={() =>
                  currentPage > 1 && setCurrentPage(currentPage - 1)
                }
                disabled={currentPage === 1}
              >
                ⬅ Prev
              </button>

              {[...Array(totalPages).keys()].map((num) => (
                <button
                  key={num + 1}
                  onClick={() => paginate(num + 1)}
                  style={{
                    margin: "0 5px",
                    padding: "5px 10px",
                    backgroundColor:
                      currentPage === num + 1 ? "blue" : "lightgray",
                    color: currentPage === num + 1 ? "white" : "black",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {num + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  currentPage < totalPages && setCurrentPage(currentPage + 1)
                }
                disabled={currentPage === totalPages}
              >
                Next ➡
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
