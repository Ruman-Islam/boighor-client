import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase/firebaseConfig';
import styles from '../../styles/MySection/Sidebar.module.css';

const Sidebar = () => {
    const [user, ,] = useAuthState(auth);
    return (
        <aside className={styles.sidebar_box}>
            <div className={styles.profile_view}>
                <div className={styles.profile_info_thumb}>
                    <img src={user?.photoURL} alt="" />
                </div>
                <div className={styles.profile_info_content}>
                    <p>Hello,</p>
                    <h3>{user?.displayName}</h3>
                </div>
            </div>
            <ul className={styles.sidebar_menu}>
                <li>
                    <Link className={styles.active} to="my-account">My Account</Link>
                </li>
                <li>
                    <Link to="my-orders">My Orders</Link>
                </li>
                <li>
                    <Link to="my-list">My List</Link>
                </li>
                <li>
                    <Link to="my-wishlist">My Wishlist</Link>
                </li>
                <li>
                    <Link to="my-ratings">My Rating &amp; Reviews</Link>
                </li>
                <li>
                    <Link to="my-points">My Points</Link>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;