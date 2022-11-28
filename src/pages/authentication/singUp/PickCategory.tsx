import { Button } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import './PickCategory.scss';
import { BusinessCategories } from '../../../types';
import { useDispatch } from 'react-redux';
import { loadUserRegisterData, updateUserRegisterData } from '../../../features/actions';
import userServices from '../../../services/user';

interface PickCategoryProps {
    handleNext: () => void
}
const PickCategory = (props: PickCategoryProps) => {
    const dispatch = useDispatch<any>();
    const { handleNext } = props;
    const handleCategorySelected = async (category: BusinessCategories): Promise<void> => {
        const user = await dispatch(loadUserRegisterData)
        console.log(category)
        const dataToPass = {
            ...user.register,
            category, 
        }
        await dispatch(updateUserRegisterData(dataToPass))
        const userDate = await dispatch(loadUserRegisterData);
        const response = await userServices.createUser({
            email: userDate.register.email,
            name: userDate.register.name,
            password: userDate.register.password,
            category: userDate.register.category
        });

        if(response.ok) {
            handleNext()
        } else {
            console.log('Ocurrió un error en el logeo')
        }
        
    } 
    return (
        <div className='pick-category-container'>
            <Button variant='contained' endIcon={<DirectionsBusIcon />} onClick={()=>handleCategorySelected(BusinessCategories.TOURIST_AGENT)}>
                Agencia Turística
            </Button>
            <Button variant='contained' endIcon={<ApartmentIcon />} onClick={()=>handleCategorySelected(BusinessCategories.HOTEL)}>
                Hotel
            </Button>
            <Button variant='contained' endIcon={<RestaurantIcon />} onClick={()=>handleCategorySelected(BusinessCategories.RESTAURANT)}>
                Restaurante
            </Button>
        </div>

    );
}
 
export default PickCategory;