import { Button } from '@mui/material';
import DialogDashboard from '../Dialog/Dialog';
import AddIcon from '@mui/icons-material/Add';
import UseModal from '../TouristServices/useModal';
import VehicleForm from './VehiclesForm';
import VehiclesTable from './VehiclesTable';

const Vehicles = () => {
    const {isOpen, toggle} = UseModal();
    return (
        <div className='client-dashboard'>
            <DialogDashboard 
                isOpen={isOpen}
                toggle={toggle}
                title={'Nuevo Vehículo'}
            >
                <VehicleForm />
            </DialogDashboard>
            <div className='client-dashboard__title-container'>
                <h1 className='client-dashboard__title-container--title'>Vehículos</h1>
                <Button variant="contained" startIcon={<AddIcon />} onClick={toggle}>
                    Agregar Vehículo
                </Button>
            </div>
            <div className='client-dashboard__table'>
                <VehiclesTable />
            </div>
        </div>
    )
}  

export default Vehicles;