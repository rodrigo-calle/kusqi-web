import React from 'react'
import Navbar from '../../components/Dashboard/Navbar/Navbar';
import Window from '../../components/Dashboard/Window/Window';
import './Dashboard.scss';

const DashboardPage = () => {
    return (
        <div className='dashboard-page-container'>
            <section className='dashboard-page-container__menu-section'>
                <Navbar />
            </section>
            <section>
                <Window />
            </section>    
        </div>
    )
}

export default DashboardPage;