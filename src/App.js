import React, { useEffect, useState } from "react";
import Tag from "./components/Tag/tag";
import Divider from "./components/Divider/divider";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);
  return (
    <div className="App">
      <h4>Divider test</h4>
      <Divider />
      <Divider dashed />
      <Divider />
      <Divider dashed />
    </div>
  );
}

export default App;
