import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss";
import Header from "./components/Header";
import Main from "./components/Main";
// import GetStarted from "./components/GetStarted";
import NewGetStarted from "./components/GetStartedV2";
import CalculationTable from "./components/CalculationTable";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/get-started" element={<NewGetStarted />} />
          <Route path="/calculation" element={<CalculationTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
