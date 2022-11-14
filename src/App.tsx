import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import logo from './logo.svg';
import './App.scss';
import DashboardPage from './pages/admin/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<DashboardPage />} />
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
