import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import './App.css';
import "./bootstrap.min.css"
import { Home } from './screen/home';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home/>}></Route>
      </Routes>
      {/*  */}
      </BrowserRouter>
    </div>
  );
}

export default App;
