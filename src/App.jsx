import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./Landing";
import Heart from "./Heart";
import Lungs from "./Lungs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/heart" element={<Heart />} />
        <Route path="/lungs" element={<Lungs />} />
      </Routes>
    </Router>
  );
}

export default App;
