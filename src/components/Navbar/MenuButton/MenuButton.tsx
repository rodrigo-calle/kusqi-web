import { IconProps } from '@mui/material';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuButton.scss';

type Props = {
    url: string;
    icon: ReactElement<IconProps>;
}
const MenuButton = (props: Props) => {
    const {url, icon} = props;
    const navigate = useNavigate();
    return (
           
        <button 
            className='menu-btn-container'
            onClick={() => navigate(url)
            }
        >
            {icon}
        </button>
    
    
    )
}


export default MenuButton;