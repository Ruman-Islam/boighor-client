import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/MySection/Sidebar';
import styles from '../styles/MySection/MySection.module.css';

const MySection = () => {
    return (
        <section className={`${styles.mySection} box-container`}>
            <Sidebar />
            <div className={styles.outlet}>
                <Outlet />
            </div>
        </section>
    );
};

export default MySection;