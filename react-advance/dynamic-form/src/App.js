import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DynamicForm from "./components/DynamicForm ";
import InfiniteScroll from "./components/InfiniteScroll";
import ReactWindow from "./components/react-window";

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* Navbar */}
        <nav style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
          <Link to="/" style={{ marginRight: "20px" }}>Dynamic Form</Link>
          <Link to="/infinite-scroll"  style={{ marginRight: "20px" }}>Infinite Scroll</Link>
          <Link to="/react-window"  style={{ marginRight: "20px" }}>React Window</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<DynamicForm />} />
          <Route path="/infinite-scroll" element={<InfiniteScroll />} />
          <Route path="/react-window" element={<ReactWindow />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
