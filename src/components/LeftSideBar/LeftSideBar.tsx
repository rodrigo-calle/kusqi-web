import CategoriesNav from './Categories/CategoriesNav';
import './LeftSideBar.scss';
import SearchLocation from './SearchLocation/SearchLoaction';
import Contact from './ContactSection/Contact';
const LeftSideBar = () => {
    return (
        <div className="left-side-bar-container">
            {/* <div className='header-left-side-bar-container'>
                <div className="logo-container">
                </div>
                <SearchBar />
            </div> */}
            <div className="search-location-section">
                <SearchLocation />
            </div>
            <div className='categories-list-section'>
                <CategoriesNav />
            </div>
            <div className="contact-section">
                <Contact />
            </div>
        </div>
    )
}

export default LeftSideBar;