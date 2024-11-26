import React from "react";

import Main from "./pages/Main";
import CustomHeader from "./layouts/CustomHeader";

function App() {
  return (
    <div style={{ backgroundColor: "#f4f5f6", minHeight: "100vh" }}>
      <CustomHeader />
      <Main />
    </div>
  );
}

export default App;
