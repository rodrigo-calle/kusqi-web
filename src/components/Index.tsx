import * as React from 'react';
import Navbar from './Dashboard/Navbar/Navbar';
import Window from './Dashboard/Window/Window';

const DashboardComponent = () => {
    return (
        <div>
            <section>
                <Navbar />
            </section>
            <section>
                <Window />
            </section>    
        </div>

    )
}

export default DashboardComponent;
