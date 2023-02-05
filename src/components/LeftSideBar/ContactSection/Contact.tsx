import * as React from 'react';
import './Contact.scss';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';

const Contact = () => {
    return (
        <div className="contact-container">
            <h4 className='contact-container__title'>Soporte Kusqi</h4>
            <button className="contact-container__channel">
                <div className="icon-container">
                    <MailOutlineIcon />
                </div>
                <p>soporte@kusqi.com</p>
            </button>
            <button className="contact-container__channel">
                <div className="icon-container">
                    <PhoneIcon />
                </div>
                <p>(01)111111</p>
            </button>
            <button className="contact-container__channel">
                <div className="icon-container">
                    <WhatsAppIcon />
                </div>
                <p>(+51)941658007</p>
            </button>

        </div>
    )
}

export default Contact;