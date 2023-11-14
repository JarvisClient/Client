import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {NextUIProvider} from "@nextui-org/react";

// Views
import IndexRoute from './Routes/IndexRoute/IndexRoute';

function App() {
  return (
    
    <BrowserRouter>
    <div>
    <NextUIProvider>
      <Routes>
        <Route path="/" element={<IndexRoute/>} />
      </Routes>
    </NextUIProvider>
    </div>
    </BrowserRouter>
  );
}

export default App;
