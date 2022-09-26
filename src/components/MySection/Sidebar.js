import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useLocation } from 'react-router-dom';
import auth from '../../firebase/firebaseConfig';
import styles from '../../styles/MySection/Sidebar.module.css';

const Sidebar = () => {
    const [user, ,] = useAuthState(auth);
    const { pathname } = useLocation();

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
                    <Link
                        className={pathname.includes('profile') ? styles.active : undefined}
                        to="profile">
                        My Account
                    </Link>
                </li>
                <li>
                    <Link
                        className={pathname.includes('orders') ? styles.active : undefined}
                        to="orders">
                        My Orders
                    </Link>
                </li>
                <li>
                    <Link
                        className={pathname.includes('report') ? styles.active : undefined}
                        to="report">
                        Report
                    </Link>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;