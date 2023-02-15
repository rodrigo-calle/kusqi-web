import { IconProps } from '@mui/material';
import { ReactElement } from 'react';
import './AuthButton.scss';

type Props = {
    title: string;
    icon: ReactElement<IconProps>;
}

const AuthButton = (props: Props) => {
    const {icon, title} = props;
    return (
        <div className='button-container'>
            <p>
                {title}
            </p>
        
            <div className='icon-button'>
                {icon}
            </div>
        </div>
    );
}

export default AuthButton;