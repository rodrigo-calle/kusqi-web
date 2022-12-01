import * as React from 'react';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LineAxisIcon from '@mui/icons-material/LineAxis';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SummarizeIcon from '@mui/icons-material/Summarize';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import './Navbar.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerState } from '../../../features/reducers';
import { getUserFromLocalStorage } from '../../../features/actions';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { AppDispatch } from '../../../features/hooks';

const Navbar = () => {
    const shop = useSelector((state: ReducerState) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    React.useEffect(()=> {
        dispatch(getUserFromLocalStorage)
    }, [dispatch])

    const handlerMenuNavigation = (option: string): void => {
        navigate(option)
        const optionListIds = ['homeOption', 'servicesOption', 'toursOption', 'clientsOption', 'promosOption', 'settings'];
        const optionId = `${option}Option`
        const d = document;
        const optionSelected = d.querySelector(`#${optionId}`);
        if(optionSelected) {
            optionListIds.forEach((optionElement) => {
                if(optionElement === optionId) {
                    optionSelected.classList.add('selected-item')
                } else {
                    const optionNoSelected = d.querySelector(`#${optionElement}`);
                    optionNoSelected?.classList.remove('selected-item')
                }
            })           
        }    
    }

    if(!shop){
        return (
            <div>Ocurrió un error, comunicarse con el administrador de K</div>
        )
    }

    return shop&&(
        <nav className="dashboard_navbar">
            <div className='dashboard_navbar__user-container'>
                <div className='dashboard_narvbar__user-container--icon'>{shop.name}</div>
                <div className='dashboard_narvbar__user-container--username'>
                    <AdminPanelSettingsIcon />
                    <h6>Administrador</h6>
                </div>
            </div>
            <ul className='dashboard_navbar__menu-container'>
                {/* <Link to='/home' className='dashboard_navbar__menu-container--link selected-item'> */}
                    <li id="homeOption" className='menu-container__item' onClick={() => handlerMenuNavigation('home')}>
                        <div className='menu-container__item--icon'>
                            <LineAxisIcon />
                        </div>
                        <div className='menu-container__item--text'>
                            Dashboard    
                        </div>
                    </li>
                {/* </Link> */}
                {/* <Link to='/home' className='dashboard_navbar__menu-container--link'> */}
                    <li id="servicesOption" className='menu-container__item' onClick={() => handlerMenuNavigation('services') }>
                        <div className='menu-container__item--icon'>
                            <EmojiPeopleIcon />
                        </div>
                        <div className='menu-container__item--text'>
                            Servicios    
                        </div>
                    </li>
                {/* </Link> */}
                {/* <Link to='/home' className='dashboard_navbar__menu-container--link'> */}
                    <li id="toursOption" className='menu-container__item' onClick={() => handlerMenuNavigation('tours') }>
                        <div className='menu-container__item--icon'>
                            <DirectionsBusIcon />
                        </div>
                        <div className='menu-container__item--text'>
                            Tours    
                        </div>
                    </li>
                {/* </Link> */}
                {/* <Link to='/home' className='dashboard_navbar__menu-container--link'> */}
                    <li id="clientsOption "className='menu-container__item' onClick={() => handlerMenuNavigation('clients') }>
                        <div className='menu-container__item--icon'>
                            <SupervisedUserCircleIcon />
                        </div>
                        <div className='menu-container__item--text'>
                            Clientes    
                        </div>
                    </li>
                {/* </Link> */}
                {/* <Link to='/home' className='dashboard_navbar__menu-container--link'> */}
                    <li id="promosOption" className='menu-container__item' onClick={() => handlerMenuNavigation('promos') }>
                        <div className='menu-container__item--icon'>
                            <LoyaltyIcon />
                        </div>
                        <div className='menu-container__item--text'>
                            Promociones    
                        </div>
                    </li>
                    <li id="guidesOption" className='menu-container__item' onClick={() => handlerMenuNavigation('tourist-guide') }>
                        <div className='menu-container__item--icon'>
                            <AssignmentIndIcon />
                        </div>
                        <div className='menu-container__item--text'>
                            Guía Turístico    
                        </div>
                    </li>
                    <li id="vehiclesOption" className='menu-container__item' onClick={() => handlerMenuNavigation('vehicles') }>
                        <div className='menu-container__item--icon'>
                            <DirectionsCarIcon />
                        </div>
                        <div className='menu-container__item--text'>
                            Vehiculos   
                        </div>
                    </li>
                    <li id="reportsOption" className='menu-container__item' onClick={() => handlerMenuNavigation('reports') }>
                        <div className='menu-container__item--icon'>
                            <SummarizeIcon />
                        </div>
                        <div className='menu-container__item--text'>
                            Reportes    
                        </div>
                    </li>
                    <li id="settingsOption" className='menu-container__item' onClick={() => handlerMenuNavigation('settings') }>
                        <div className='menu-container__item--icon'>
                            <SettingsIcon />
                        </div>
                        <div className='menu-container__item--text'>
                            Configuración    
                        </div>
                    </li>
                {/* </Link> */}
        
                {/* <div className='menu-container__item'></div>
                <div className='menu-container__item'></div> */}
            </ul>
        </nav>
    )


}

export default Navbar;