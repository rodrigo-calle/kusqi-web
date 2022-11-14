import * as React from 'react';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LineAxisIcon from '@mui/icons-material/LineAxis';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

import './Navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
                <Link to='/home' className='dashboard_navbar__menu-container--link selected-item'>
                    <li className='menu-container__item'>
                        <div className='menu-container__item--icon'>
                            <LineAxisIcon />
                        </div>
                        <div className='menu-container__item--text'>
                            Dashboard    
                        </div>
                    </li>
                </Link>
                <Link to='/home' className='dashboard_navbar__menu-container--link'>
                    <li className='menu-container__item'>
                        <div className='menu-container__item--icon'>
                            <EmojiPeopleIcon />
                        </div>
                        <div className='menu-container__item--text'>
                            Servicios    
                        </div>
                    </li>
                </Link>
                <Link to='/home' className='dashboard_navbar__menu-container--link'>
                    <li className='menu-container__item'>
                        <div className='menu-container__item--icon'>
                            <DirectionsBusIcon />
                        </div>
                        <div className='menu-container__item--text'>
                            Tours    
                        </div>
                    </li>
                </Link>
                <Link to='/home' className='dashboard_navbar__menu-container--link'>
                    <li className='menu-container__item'>
                        <div className='menu-container__item--icon'>
                            <SupervisedUserCircleIcon />
                        </div>
                        <div className='menu-container__item--text'>
                            Clientes    
                        </div>
                    </li>
                </Link>
                <Link to='/home' className='dashboard_navbar__menu-container--link'>
                    <li className='menu-container__item'>
                        <div className='menu-container__item--icon'>
                            <LoyaltyIcon />
                        </div>
                        <div className='menu-container__item--text'>
                            Promociones    
                        </div>
                    </li>
                </Link>
        
                {/* <div className='menu-container__item'></div>
                <div className='menu-container__item'></div> */}
            </ul>
        </nav>
    )
}

export default Navbar;