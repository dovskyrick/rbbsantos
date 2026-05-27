import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Exterior from "./pages/Exterior";
import Office from "./pages/Office";
import Studio from "./pages/Studio";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/visual-experiments" element={<Exterior />} />
      <Route path="/engineering-portfolio" element={<Office />} />
      <Route path="/art-portfolio" element={<Studio />} />
    </Routes>
  );
}
