/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/Navbar/NavMiddle.module.css';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LoginDropdown from './LoginDropdown';
import auth from '../../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useRef } from 'react';
import UseToken from '../../hooks/UseToken';

const NavMiddleRight = () => {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    const [toggleUserDropdown, setToggleUserDropdown] = useState(false);
    const container = useRef(null);
    const btnRef = useRef(null);
    const { token } = UseToken(user);

    const logout = async () => {
        await signOut(auth);
        localStorage.removeItem("accessToken");
        window.location.reload();
    };

    // useEffect(() => {
    //     if (token) navigate(from, { replace: true });
    //     if (error) message.error(error?.message.split('/')[1].split(')')[0]);
    // }, [user, error, navigate, from]);

    useEffect(() => {
        const hideMobileMenu = (e) => {
            if (container.current && !container.current.contains(e.target)) {
                setToggleUserDropdown(false);
            }
        };
        document.addEventListener('mousedown', hideMobileMenu);
        return () => document.removeEventListener('mousedown', hideMobileMenu);
    }, []);

    return (
        <div className={styles.navMiddleRightBox}>
            {/* SHOPPING CART AND LOGIN/REGISTRATION */}
            <div>
                <div className={styles.navCartContainer}>
                    <ShoppingCartOutlinedIcon />
                    <div>0</div>
                </div>
                {!user ?
                    <div className={styles.logBtnContainer}>
                        <a>Sign in</a>
                        <LoginDropdown />
                    </div>
                    :
                    <div
                        ref={container}
                        className={styles.loggedInUserMenu}>
                        <button
                            onClick={() => setToggleUserDropdown(!toggleUserDropdown)}
                            className={styles.logged_in_user_menu_button}>
                            <img src={user?.photoURL} alt='' />
                            <span>{user?.displayName}</span>
                            {toggleUserDropdown ?
                                <ArrowDropUpIcon /> :
                                <ArrowDropDownIcon />}
                        </button>
                        <div
                            className={`${styles.loggedInUserDropdownMenu}
                      ${toggleUserDropdown && styles.show}`}>
                            <button
                                onClick={() => navigate("/my-section/profile")}
                                className={styles.dropdownItem}>
                                My Account
                            </button>
                            <button className={styles.dropdownItem}>My Orders</button>
                            <button className={styles.dropdownItem}>My List</button>
                            <button className={styles.dropdownItem}>My Wishlist</button>
                            <button className={styles.dropdownItem}>My Rating Reviews</button>
                            <div className={styles.divider}></div>
                            <button onClick={logout} className={styles.dropdownItem}>Sign Out</button>
                        </div>
                    </div>
                }
            </div>
        </div >
    );
};

export default NavMiddleRight;