import { TextField } from '@mui/material';
import './SearchLoaction.scss'

const SearchLocation = () => {
    return (
        <div className="search-location-container">
            <h1 className='search-location-container__title'>Mi Ubicación</h1>
            <div className='search-location-container__input-group'>
                <TextField 
                    id="outlined-basic" 
                    label="Provincia" 
                    variant="outlined" 
                    className='input-search-location'
                    size='small' 
                                       
                />
                <TextField 
                    id="outlined-basic" 
                    label="Distrito" 
                    variant="outlined" 
                    className='input-search-location'
                    size='small'
                />
            </div>
        </div>
    )
}

export default SearchLocation;