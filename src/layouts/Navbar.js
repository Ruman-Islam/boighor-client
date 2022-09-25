import React, { useEffect } from 'react';
import NavMiddle from '../components/Navbar/NavMiddle';
import NavBottom from '../components/Navbar/NavBottom';
import MobileMenu from '../components/Navbar/MobileMenu';
import useNav from '../hooks/UseNav';
import styles from '../styles/Navbar/NavMiddle.module.css';
import auth from '../firebase/firebaseConfig';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import UseToken from '../hooks/UseToken';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { navbar } = useNav();
    const [signInWithGoogle, user, ,] = useSignInWithGoogle(auth);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const { token } = UseToken(user?.user);


    useEffect(() => {
        if (token) navigate(from, { replace: true });
    }, [from, token, navigate]);


    const loginWithGoogle = () => {
        signInWithGoogle();
    };


    return (
        <header className={`${styles.header} ${navbar && styles.headerBottomShadow}`}>
            <NavMiddle loginWithGoogle={loginWithGoogle} />
            <NavBottom />
            <MobileMenu />
        </header>
    );
};

export default Navbar;