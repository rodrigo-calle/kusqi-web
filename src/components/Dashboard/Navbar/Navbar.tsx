import * as React from 'react';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LineAxisIcon from '@mui/icons-material/LineAxis';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

import './Navbar.scss';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate()
    const handlerMenuNavigation = (option: string): void => {
        navigate(option)
        const optionListIds = ['homeOption', 'servicesOption', 'toursOption', 'clientsOption', 'promosOption'];
        const optionId = `${option}Option`
        console.log(optionId)
        const d = document;
        const optionSelected = d.querySelector(`#${optionId}`);
        console.log(optionSelected)
        if(optionSelected) {
            optionListIds.forEach((optionElement) => {
                console.log('option',optionElement)

                if(optionElement === optionId) {
                    console.log(optionElement)
                    optionSelected.classList.add('selected-item')
                } else {
                    const optionNoSelected = d.querySelector(`#${optionElement}`);
                    optionNoSelected?.classList.remove('selected-item')
                }
            })           
        }    
    }

    return (
        <nav className="dashboard_navbar">
            <div className='dashboard_navbar__user-container'>
                <div className='dashboard_narvbar__user-container--icon'>ICON CONTAINER</div>
                <div className='dashboard_narvbar__user-container--username'>
                    <img src="https://icongr.am/clarity/user.svg?size=128&color=94d1ff" alt='user-icon' />
                    <h6>Nombre de Usuario</h6>
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
                {/* </Link> */}
        
                {/* <div className='menu-container__item'></div>
                <div className='menu-container__item'></div> */}
            </ul>
        </nav>
    )
}

export default Navbar;