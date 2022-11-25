import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import './Services.scss';
import { Button } from '@mui/material';
import ServiceTable from './ServiceTable';
import UseModal from './useModal';
import DialogDashboard from '../Dialog/Dialog';
import ServiceForm from './ServiceForm';

const Services = () => {
    const {isOpen, toggle} = UseModal();
    return (
        <div className='service-dashboard'>
            <DialogDashboard 
                isOpen={isOpen} 
                toggle={toggle} 
                title={'Nuevo Servicio'}
             >
                <ServiceForm />
            </DialogDashboard>
            <div className='service-dashboard__title-container'>
                <h1 className='service-dashboard__title-container--title'>Servicios</h1>
                <Button variant="contained" startIcon={<AddIcon />} onClick={toggle}>
                    Agregar Servicio
                </Button>
            </div>
            <div className='service-dashboard__table'>
                <ServiceTable />
            </div>
        </div>

    )
}

export default Services;