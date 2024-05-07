import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import First from "./pages/1";
import Second from "./pages/2";
import Third from "./pages/3";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/video" element={<Third />} />
          <Route path="/about" element={<Second />} />
          <Route path="/" element={<First />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;