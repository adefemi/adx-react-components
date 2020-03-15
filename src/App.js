import React, { useEffect, useState } from "react";
import Pagination from "./components/Pagination/pagination";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);
  return (
    <div className="App">
      <h4>Pagination test</h4>
      <Pagination defaultCurrent={1} total={500} current={2} />
    </div>
  );
}

export default App;
