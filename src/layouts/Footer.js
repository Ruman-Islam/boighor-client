import React from 'react';
import FooterTop from '../components/Footer/FooterTop';
import FooterBottom from '../components/Footer/FooterBottom';

const Footer = () => {
    const styles = {
        background: '#fff',
        borderRadius: '5px',
        boxShadow: '0px 4px 6px -3px #9c9c9c',
    }

    return (
        <footer style={styles}>
            <FooterTop />
            <FooterBottom />
        </footer>
    );
};

export default Footer;