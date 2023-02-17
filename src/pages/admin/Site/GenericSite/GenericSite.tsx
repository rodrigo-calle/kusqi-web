import Banner from './Components/Banner/Banner';
import Logo, { Shape, Side } from './Components/Logo/Logo';
import './GenericSite.scss';

const GenericSite = () => {
    return(
        <div className='site-container'>
            <Banner img='https://www.ilen.edu.pe/wp-content/uploads/2022/01/BANNER-WEB-LICITACIONES-scaled.jpg'/>
            <Logo 
                img='https://cdn.vectorstock.com/i/preview-1x/61/97/3d-gold-hexagon-luxury-company-modern-logos-vector-32606197.jpg' 
                shape={Shape.Circle}
                side={Side.Middle}
            />
        </div>
    )
}

export default GenericSite;