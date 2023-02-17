import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import logo from './logo.svg';
import './App.scss';
import Clients from './components/Dashboard/Window/Clients/Clients';
import Home from './components/Dashboard/Window/Home/Home';
import Promos from './components/Dashboard/Window/Promos/Promos';
import Report from './components/Dashboard/Window/Reports/Reports';
import Services from './components/Dashboard/Window/TouristServices/Services';
import Settings from './components/Dashboard/Window/Settings/Settings';
import TouristGuide from './components/Dashboard/Window/TouristGuide/TouristGuide';
import Tours from './components/Dashboard/Window/Tours/Tours';
import Vehicles from './components/Dashboard/Window/Vehicles/Vehicles';
import SignIn from './pages/authentication/singIn/SingIn';
import Register from './pages/authentication/singUp/Index';
import HomePage from './pages/home/homePage';
import TravelAgentSells from './components/Dashboard/Window/TravelAgentSells/TravelAgentSells';
import DashboardPage from './pages/admin/Dashboard/Dashboard';
import Site from './pages/admin/Site/Index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<Register />} />
        <Route path='/site' element={<Site />} />
        {/* <Route path='/dashboard/' element={<PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
          } 
        /> */}        
        <Route path='/dashboard/' element={<DashboardPage />} >
          <Route path='home' element={<Home />} />
          <Route path='services' element={<Services />} />
          <Route path='tours' element={<Tours />} />
          <Route path='clients' element={<Clients />} />
          <Route path='promos' element={<Promos />} />
          <Route path='settings' element={<Settings />} />
          <Route path='tourist-guide' element={<TouristGuide />} />
          <Route path='reports' element={<Report />} />
          <Route path='vehicles' element={<Vehicles />} />
          <Route path='sells' element={<TravelAgentSells />} />
        </Route>
        <Route path='*' element={<HomePage />} />
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
