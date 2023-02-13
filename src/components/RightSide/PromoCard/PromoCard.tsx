import LinkIcon from '@mui/icons-material/Link';
import { IconButton } from '@mui/material';
import './PromoCard.scss';

const PromoCard = () => {
    return (
        <div className="promo-container-card">
            <h1 className='promo-container-card__title'>
                Ofertas del día
            </h1>
            <div className="promo-container-card__item">
                <p className='businnes-name'>
                    Nombre de negocio
                </p>
                <p className='promo-title'>
                    2x1 en toda la tienda
                </p>
                <p className="promo-description">
                    Descripción de la promoción..
                </p>
            
            </div>
            <div className="promo-container-card__item">
                <p className='businnes-name'>
                    Nombre de negocio
                </p>
                <p className='promo-title'>
                    2x1 en toda la tienda
                </p>
                <p className="promo-description">
                    Descripción de la promoción..
                </p>
            </div>
            <div className="promo-container-card__item">
                <p className='businnes-name'>
                    Nombre de negocio
                </p>
                <p className='promo-title'>
                    2x1 en toda la tienda
                </p>
                <p className="promo-description">
                    Descripción de la promoción..
                </p>
            </div>
            <button className="load-more-container">
                <p className='load-more-container__text'>Mostrar más</p>
                <IconButton aria-label="Example">
                    < LinkIcon htmlColor='#3DB6FF'/>     
                </IconButton>         
            </button>
        </div>
    )
}

export default PromoCard;