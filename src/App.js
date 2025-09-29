import React, { useEffect } from "react";
import app from "./firebase";

function App() {
  useEffect(() => {
    console.log("Firebase initialized:", app);
  }, []);

  return <h1>Hello Thriftly 🚀</h1>;
}

export default App;