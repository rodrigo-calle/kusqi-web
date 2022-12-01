import { Button } from '@mui/material';
import DialogDashboard from '../Dialog/Dialog';
import AddIcon from '@mui/icons-material/Add';
import UseModal from '../TouristServices/useModal';
import TouristGuideForm from './TouristGuideForm';
import TouristGuideTable from './TouristGuideTable';

const TouristGuide = () => {
    const {isOpen, toggle} = UseModal();
    return (
        <div className='client-dashboard'>
            <DialogDashboard 
                isOpen={isOpen}
                toggle={toggle}
                title={'Nuevo Guía Turístico'}
            >
                <TouristGuideForm />
            </DialogDashboard>
            <div className='client-dashboard__title-container'>
                <h1 className='client-dashboard__title-container--title'>Guías Turísticos</h1>
                <Button variant="contained" startIcon={<AddIcon />} onClick={toggle}>
                    Agregar Guía Turístico
                </Button>
            </div>
            <div className='client-dashboard__table'>
                <TouristGuideTable />
            </div>
        </div>
    )
}  

export default TouristGuide;