import { Button } from '@mui/material';
import DialogDashboard from '../Dialog/Dialog';
import AddIcon from '@mui/icons-material/Add';
import UseModal from '../TouristServices/useModal';
import TouristGuideForm from './ToursForm';
import TourTable from './ToursTable';

const Tours = () => {
    const {isOpen, toggle} = UseModal();
    return (
        <div className='client-dashboard'>
            <DialogDashboard 
                isOpen={isOpen}
                toggle={toggle}
                title={'Nuevo Tour'}
            >
                <TouristGuideForm />
            </DialogDashboard>
            <div className='client-dashboard__title-container'>
                <h1 className='client-dashboard__title-container--title'>Tours</h1>
                <Button variant="contained" startIcon={<AddIcon />} onClick={toggle}>
                    Agregar Tour
                </Button>
            </div>
            <div className='client-dashboard__table'>
                {/* <TouristGuideTable /> */}
                <TourTable />
            </div>
        </div>
    )
}  

export default Tours;