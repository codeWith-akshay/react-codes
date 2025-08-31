import React from "react";
import "./App.css";
import Counter from "./Counter";

export default function App() {
  return (
    <div className="app">
      <h1>Counter App</h1>

      {/* initialValue ko change karke test kar sakte ho */}
      <Counter initialValue={5} />

      {/* Extra: multiple counters bhi independent chalenge */}
      {/* <Counter initialValue={0} />
      <Counter initialValue={10} /> */}
    </div>
  );
}
