import SearchBar from '../SearchBar/SearchBar';
import MenuButton from './MenuButton/MenuButton';
import StoreIcon from '@mui/icons-material/Store';import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import HomeIcon from '@mui/icons-material/Home';
import AndroidIcon from '@mui/icons-material/Android';
import './Navbar.scss';

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

            </div>

        </div>
    )
}

export default Navbar;