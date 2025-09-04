import React from "react";
import useFetch from "../hooks/useFetch";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

function PostsList() {
  const { data: posts, loading, error, refetch } = useFetch(API_URL);

  if (loading) return <p className="info">Loading…</p>;
  if (error)
    return (
      <div className="errorBox">
        <p>{error}</p>
        <button className="btn" onClick={() => refetch()}>Retry</button>
      </div>
    );

  if (!posts.length) return <p className="info">No data found.</p>;

  return (
    <ul className="list">
      {posts.map((p) => (
        <li key={p.id} className="card">
          <h3 className="cardTitle">{p.title}</h3>
          <p className="cardBody">{p.body}</p>
        </li>
      ))}
    </ul>
  );
}

export default PostsList;
