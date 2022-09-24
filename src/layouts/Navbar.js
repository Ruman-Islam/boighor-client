import React from 'react';
import NavMiddle from '../components/Navbar/NavMiddle';
import NavBottom from '../components/Navbar/NavBottom';
import MobileMenu from '../components/Navbar/MobileMenu';
import useNav from '../hooks/UseNav';
import styles from '../styles/Navbar/NavMiddle.module.css';

const Navbar = () => {
    const { navbar } = useNav();

    return (
        <header className={`${styles.header} ${navbar && styles.headerBottomShadow}`}>
            <NavMiddle />
            <NavBottom />
            <MobileMenu />
        </header>
    );
};

export default Navbar;