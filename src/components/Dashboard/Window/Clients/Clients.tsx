import { Button } from '@mui/material';
import React from 'react'
import DialogDashboard from '../Dialog/Dialog';
import UseModal from '../Services/useModal';
import AddIcon from '@mui/icons-material/Add';
import './Clients.scss'
import ClientTable from './ClientTable';
import ClientForm from './ClientForm';

const Clients = () => {
    console.log('CLIENTSSSS')
    const {isOpen, toggle} = UseModal();
    return (
        <div className='client-dashboard'>
            <DialogDashboard 
                isOpen={isOpen}
                toggle={toggle}
                title={'Nuevo Cliente'}
            >
                <ClientForm />
            </DialogDashboard>
            <div className='client-dashboard__title-container'>
                <h1 className='client-dashboard__title-container--title'>Clientes</h1>
                <Button variant="contained" startIcon={<AddIcon />} onClick={toggle}>
                    Agregar Cliente
                </Button>
            </div>
            <div className='client-dashboard__table'>
                <ClientTable />
            </div>
        </div>
    )
}

export default Clients;