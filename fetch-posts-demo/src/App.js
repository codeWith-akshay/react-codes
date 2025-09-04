import React from "react";
import PostsList from "./components/PostsList";
import "./App.css";

function App() {
  return (
    <main className="container">
      <h1 className="title">Posts</h1>
      <PostsList />
    </main>
  );
}

export default App;
