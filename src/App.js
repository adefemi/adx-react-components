import React, { useEffect, useState } from "react";
import "./app.css";
import PopConfirm from "./components/PopConfirm/popConfirm";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);
  return (
    <div className="App">
      <h4>PopConfirm Test</h4>
      <br />
      <br />
      <br />
      <PopConfirm
        title="Are you sure to delete this task?"
        onConfirm={() => null}
        onCancel={() => null}
        placement="R"
        id={1}
      >
        <button>Hello</button>
      </PopConfirm>
      <br />
      <br />
      <PopConfirm
        title="Are you sure to delete this stuff?"
        onConfirm={() => null}
        onCancel={() => null}
        placement="B"
        id={2}
      >
        <button>World</button>
      </PopConfirm>
    </div>
  );
}

export default App;
