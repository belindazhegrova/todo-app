import React from "react";
import CustomHeader from "./layouts/Header/CustomHeader";
import Main from "./pages/Main";

function App() {
  return (
    <div style={{ backgroundColor: "#f4f5f6", minHeight: "100vh" }}>
      <CustomHeader />
      <Main />
    </div>
  );
}

export default App;
