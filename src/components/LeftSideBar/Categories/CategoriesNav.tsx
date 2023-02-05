import * as React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LinkIcon from '@mui/icons-material/Link';
import { IconButton } from '@mui/material';
import './CategoriesNav.scss';


const CategoriesNav = () => {
    return (
        <div className='categories-nav'>
            <h1 className='categories-nav__title'>Categorias de Negocios</h1>
            <button className='categories-nav__categories-list-group'>
                <h4>Alojamiento</h4>
                <div className="icon-container">
                <IconButton aria-label="Example">
                    <ArrowForwardIosIcon fontSize='small'/>
                </IconButton>
                </div>
            </button>
            <button className='categories-nav__categories-list-group'>
                <h4>Entretenimiento</h4>
                <div className="icon-container">
                <IconButton aria-label="Example">
                    <ArrowForwardIosIcon fontSize='small'/>
                </IconButton>
                </div>
            </button>
            <button className='categories-nav__categories-list-group'>
                <h4>Comida</h4>
                <div className="icon-container">
                <IconButton aria-label="Example">
                    <ArrowForwardIosIcon fontSize='small'/>
                </IconButton>
                </div>
            </button>
            
            <button className="load-more-container">
                <p className='load-more-container__text'>Mostrar más</p>
                <IconButton aria-label="Example">
                    < LinkIcon htmlColor='#3DB6FF'/>     
                </IconButton>         
            </button>
        </div>
    )
}

export default CategoriesNav;