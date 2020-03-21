import React, { useEffect, useState } from "react";
import "./app.css";
import DatePicker from "./components/DatePicker/datePicker";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);
  return (
    <div className="App">
      <h4>DatePicker test</h4>
      <DatePicker id={1} />
      <DatePicker rangePicker id={2} />
    </div>
  );
}

export default App;
