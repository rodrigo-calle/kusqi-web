import IconButton from '@mui/material/IconButton';
import StoreIcon from '@mui/icons-material/Store';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import './Post.scss';

const Post = () => {
    return(
        <div className="post-card">
            <div className="post-card__header">
                <div className="business-logo-container">
                    <img src="" alt="" />
                </div>
                <div className="business-name-container">
                    <h1 className='businnes-name'>Nombre de Negocio</h1>
                    <p className='post-time'>hace 1 hora</p>
                </div>

            </div>
            <div className="post-card__body">
                <div className="content-container">
                    <img src="" alt="" />
                </div>
            </div>
            <div className="post-card__buttons">
                <IconButton aria-label="Me Encanta" component="label" size='large'>
                    <FavoriteBorderIcon fontSize='inherit'/>
                </IconButton>
                <IconButton aria-label="Ir al Negocio" component="label" size='large'>
                    <StoreIcon fontSize='inherit'/>
                </IconButton>
                <IconButton aria-label="Compartir Publicación" component="label" size='large'>
                    <ShareIcon fontSize='inherit' />
                </IconButton>
            </div>
        </div>
    )
}

export default Post;