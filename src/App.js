import React, { useEffect, useState } from "react";
import Tag from "./components/Tag/tag";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);
  return (
    <div className="App">
      <h4>Tag test</h4>
      <div>
        <h4 style={{ marginBottom: 16 }}>Presets:</h4>
        <div>
          <Tag color="success">success</Tag>
          <Tag color="processing">processing</Tag>
          <Tag color="error">error</Tag>
          <Tag color="default">default</Tag>
          <Tag color="warning">warning</Tag>
        </div>
      </div>
    </div>
  );
}

export default App;
