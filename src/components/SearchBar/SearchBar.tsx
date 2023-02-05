import './SearchBar.scss';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    return (
        <Paper
            className='search-bar-input'
            component="div"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderRadius: '14px'}}
        >
            <IconButton sx={{ p: '10px' }} aria-label="menu">
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Busca lo que desees"
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
            </IconButton>
        </Paper>
  
        // <input 
        //     type="text" 
        //     className="search-bar-input"
        // />
    )
}

export default SearchBar;