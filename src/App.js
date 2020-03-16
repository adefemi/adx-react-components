import React, { useEffect, useState } from "react";
import Input from "./components/input/Input";
import Divider from "./components/Divider/divider";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);
  return (
    <div className="App">
      <h4>Input test</h4>
      <Input placeholder="Basic usage" />
      <Divider />
      <Input addonBefore="http://" addonAfter=".com" defaultValue="mysite" />
    </div>
  );
}

export default App;
