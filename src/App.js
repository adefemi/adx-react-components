import React, { useEffect, useState } from "react";
import Result from "./components/Result/result";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);
  return (
    <div className="App">
      <h4>Result test</h4>
      <Result
        // status="error"
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <button key="console">Go Console</button>,
          <button key="buy">Buy Again</button>
        ]}
      />
    </div>
  );
}

export default App;
