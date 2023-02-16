import SearchBar from '../SearchBar/SearchBar';
import MenuButton from './MenuButton/MenuButton';
import StoreIcon from '@mui/icons-material/Store';import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import HomeIcon from '@mui/icons-material/Home';
import AndroidIcon from '@mui/icons-material/Android';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';

import './Navbar.scss';
import AuthButton from './AuthButton/AuthButton';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <div className='navbar-container'>
            <div className="search-section">
                <div className="logo-container">
                    logito
                </div>
                <SearchBar />
            </div>
            <div className="buttons-sections">
                <MenuButton url='/' icon={<HomeIcon fontSize='large' />}/>
                <MenuButton url='/' icon={<StoreIcon fontSize='large' />}/>
                <MenuButton url='/' icon={<LocalOfferIcon fontSize='large' />}/>
                <MenuButton url='/' icon={<AndroidIcon fontSize='large' />}/>
            </div>
            <div className="authentication-section">
                <button className='shopping-cart-button'>
                    <IconButton size='large'>
                        <ShoppingCartIcon fontSize='inherit' color='action'/>
                    </IconButton>    
                </button>
                <Link to={'/sign-in'} className="link-style">
                    <AuthButton title='Registro' icon={< AddBusinessIcon/>}/>
                </Link>
                <Link to={'/sign-up'} className="link-style">
                    <AuthButton title='Ingresar' icon={< StoreMallDirectoryIcon/>}/>
                </Link>
            </div>

        </div>
    )
}

export default Navbar;