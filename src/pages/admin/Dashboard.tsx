import React from 'react'
import { Outlet } from 'react-router-dom';
import MainNav from '../../components/Dashboard/MainNav/MainNav';
import Navbar from '../../components/Dashboard/Navbar/Navbar';
import './Dashboard.scss';

const DashboardPage = () => {
    return (
        <div className='dashboard-page-container'>
            <section className='dashboard-page-container__menu-section'>
                <Navbar />
            </section>
            <section className='dashboard-page-container__window-section'>
                {/* <Window /> */}
                <MainNav />
                <div className='dashboard-page-container__window-section--window'>
                    <Outlet />
                </div>                
            </section>    
        </div>
    )
}

export default DashboardPage;