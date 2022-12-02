import * as React from 'react';
import './Home.scss';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Paper } from '@mui/material';
import RingVolumeIcon from '@mui/icons-material/RingVolume';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Home = () => {
    return (
        <div className='home-dashboard'>
            <h1 className='home-dashboard__title'>Hola {'ADMINISTRADOR'}, bienvenido </h1>
            <div className='home-dahboard__resume-boxes'>
                <div className='resume-boxes__item'>
                    <Paper className='resume-boxes__item-image' elevation={6}>
                        <WhatsAppIcon />
                    </Paper>
                    <p className='resume-boxes__quantity'>60</p>
                    <p className='resume-boxes__label'>Contacto por Chat</p>
                </div>
                <div className='resume-boxes__item'>
                     <Paper className='resume-boxes__item-image' elevation={6}>
                        <RingVolumeIcon />
                    </Paper>
                    <p className='resume-boxes__quantity'>20</p>
                    <p className='resume-boxes__label'>Contacto por Telefónicos</p>
                </div>
                <div className='resume-boxes__item'>
                    <Paper className='resume-boxes__item-image' elevation={6}>
                        <ThumbUpAltIcon />
                    </Paper>
                    <p className='resume-boxes__quantity'>150</p>
                    <p className='resume-boxes__label'>Interacción con Publicaciones</p>
                </div>
                <div className='resume-boxes__item'>
                    <Paper className='resume-boxes__item-image' elevation={6}>
                        <VisibilityIcon />
                    </Paper>
                    <p className='resume-boxes__quantity'>200</p>
                    <p className='resume-boxes__label'>Visitas a tu perfil</p>
                </div>
            </div>
        </div>
    
    )
}

export default Home;