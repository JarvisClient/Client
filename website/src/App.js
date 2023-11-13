import { BrowserRouter, Routes, Route } from "react-router-dom";

import IndexView from "./screens/index/IndexView";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexView/>} />
        <Route path="about" element={<h1>About</h1>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
