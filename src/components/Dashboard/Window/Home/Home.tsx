import * as React from 'react';
import './Home.scss';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Paper } from '@mui/material';

const Home = () => {
    return (
        <div className='home-dashboard'>
            <h1 className='home-dashboard__title'>Hola {'ADMINISTRADOR'}, bienvenido </h1>
            <div className='home-dahboard__resume-boxes'>
                <div className='resume-boxes__item'>
                    <Paper className='resume-boxes__item-image' elevation={6}>
                        <WhatsAppIcon />
                    </Paper>
                    <p className='resume-boxes__quantity'>100</p>
                    <p className='resume-boxes__label'>Contacto por Chat</p>
                </div>
                <div className='resume-boxes__item'>
                     <Paper className='resume-boxes__item-image' elevation={6}>
                        <WhatsAppIcon />
                    </Paper>
                    <p className='resume-boxes__quantity'>100</p>
                    <p className='resume-boxes__label'>Contacto por Chat</p>
                </div>
                <div className='resume-boxes__item'>
                    <Paper className='resume-boxes__item-image' elevation={6}>
                        <WhatsAppIcon />
                    </Paper>
                    <p className='resume-boxes__quantity'>100</p>
                    <p className='resume-boxes__label'>Contacto por Chat</p>
                </div>
                <div className='resume-boxes__item'>
                    <Paper className='resume-boxes__item-image' elevation={6}>
                        <WhatsAppIcon />
                    </Paper>
                    <p className='resume-boxes__quantity'>100</p>
                    <p className='resume-boxes__label'>Contacto por Chat</p>
                </div>
            </div>
        </div>
    
    )
}

export default Home;