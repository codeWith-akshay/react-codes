import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const debounceRef = useRef();

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    if (!query) {
      setResults([]);
      setError('');
      setLoading(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(() => {
      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
          // Filter client-side because API doesn't support ?q for users
          const filtered = data.filter((user) =>
            user.name.toLowerCase().includes(query.toLowerCase())
          );
          setResults(filtered);
          setError(filtered.length === 0 ? 'No results found' : '');
          setLoading(false);
        })
        .catch(() => {
          setError('Error fetching data');
          setResults([]);
          setLoading(false);
        });
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  return (
    <div className="debounced-search-container">
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="debounced-search-input"
      />
      {loading && <div className="loader">Loading...</div>}
      {error && !loading && <div className="error">{error}</div>}
      {!loading && !error && results.length > 0 && (
        <ul className="results-list">
          {results.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
