import React, { useState } from "react";
import "./App.css";
import { Attempt } from "./Attempt";
import Words from "./words";

function App() {
  const [word] = useState(Words[Math.floor(Math.random() * Words.length)]);

  return (
    <div>
      {[...Array(5)].map((_, i) => (
        <Attempt key={i} word={word} />
      ))}
    </div>
  );
}

export default App;
