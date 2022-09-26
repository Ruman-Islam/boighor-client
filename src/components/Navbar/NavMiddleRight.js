/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Navbar/NavMiddle.module.css';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LoginDropdown from './LoginDropdown';
import auth from '../../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useRef } from 'react';

const NavMiddleRight = ({ loginWithGoogle }) => {
    // const [cartItems, setCartItems] = useState();
    const navigate = useNavigate();
    const [user, ,] = useAuthState(auth);
    const [toggleUserDropdown, setToggleUserDropdown] = useState(false);
    const container = useRef(null);

    const logout = async () => {
        await signOut(auth);
        localStorage.removeItem("accessToken");
        window.location.reload();
    };

    // useEffect(() => {
    //     const savedItems = [];
    //     const cartItems = localStorage.getItem('shopping-cart')
    //     for (const item in JSON.parse(cartItems)) {
    //         savedItems.push(item)
    //     }
    //     setCartItems(savedItems);
    // }, [])

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
                    <span onClick={() => navigate('/cart')}>
                        <ShoppingCartOutlinedIcon />
                    </span>
                </div>
                {!user ?
                    <div className={styles.logBtnContainer}>
                        <a>Sign in</a>
                        <LoginDropdown loginWithGoogle={loginWithGoogle} />
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
                            <button
                                onClick={() => navigate("/my-section/orders")}
                                className={styles.dropdownItem}>
                                My Orders
                            </button>
                            <button
                                onClick={() => navigate("/my-section/report")}
                                className={styles.dropdownItem}>
                                Report
                            </button>
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