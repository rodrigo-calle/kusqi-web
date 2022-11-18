import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import logo from './logo.svg';
import './App.scss';
import Clients from './components/Dashboard/Window/Clients/Clients';
import Home from './components/Dashboard/Window/Home/Home';
import Promos from './components/Dashboard/Window/Promos/Promos';
import Services from './components/Dashboard/Window/Services/Services';
import Tours from './components/Dashboard/Window/Tours/Tours';
import DashboardPage from './pages/admin/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard/' element={<DashboardPage />} >
          <Route path='home' element={<Home />} />
          <Route path='services' element={<Services />} />
          <Route path='tours' element={<Tours />} />
          <Route path='clients' element={<Clients />} />
          <Route path='promos' element={<Promos />} />
        </Route>
      </Routes>    
    </BrowserRouter>
  
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
