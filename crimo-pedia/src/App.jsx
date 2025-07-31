import React from 'react'
import Home from './components/Home'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailsPage from './components/DetailsPage';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/details/:state/:name" element={<DetailsPage/>} />
        </Routes>
      </BrowserRouter>



    </div>
  )
}

export default App