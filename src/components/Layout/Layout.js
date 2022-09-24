import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMobileMenu } from '../../redux/navbarSlice';
import styles from '../../styles/Navbar/MobileMenu.module.css';

const Layout = ({ children }) => {
    const mobileMenu = useSelector((state) => state?.navbarReducer?.mobileMenu);
    const overlay = useRef(null);
    const dispatch = useDispatch();

    // toggle mobile menu visibility by clicking /
    //  on overlay(outside of mobile menu)
    useEffect(() => {
        const hideMobileMenu = (e) => {
            if (e.path[0] === overlay.current) {
                dispatch(toggleMobileMenu(false));
            }
        };
        document.addEventListener('mousedown', hideMobileMenu);
        return () => document.removeEventListener('mousedown', hideMobileMenu);
    }, [dispatch]);
    // ................................ //

    // useEffect(() => {
    //     document.addEventListener('contextmenu', (e) => {
    //         e.preventDefault();
    //     });
    // }, [])

    return (
        <main
            ref={overlay}
            className={`${styles.mainBody} 
        ${mobileMenu && styles.mobileMenuOverlay} page-container`}>
            {children}
        </main>
    );
};

export default Layout;