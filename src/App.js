import React, { useEffect, useState } from "react";
import Badge from "./components/Badge/badge";
import "./app.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);
  return (
    <div className="App">
      <h4>Badge test</h4>
      <Badge dot>
        <a href="#">Link something</a>
      </Badge>
    </div>
  );
}

export default App;
