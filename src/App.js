
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MoreDetails from './pages/MoreDetails';
import MainPage from './pages/MainPage';
import TrendsPage from './pages/TrendsPage';
import DrawerAppBar from './components/DrawerAppBar';
import AboutUs from './pages/AboutUs';


function App() {

  return (
    <div className="App">
      <Router>
      <DrawerAppBar/>
        <Routes>
          <Route exact path='/' element={<MainPage />} />
          <Route path='/about/' element={<AboutUs/>} />
          <Route  path='/trends/*' element={< TrendsPage />} />
          <Route  path='/details/*' element={< MoreDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

