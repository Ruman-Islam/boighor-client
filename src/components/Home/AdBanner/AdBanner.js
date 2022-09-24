import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../../assets/images/addbanner.webp';
import styles from '../../../styles/Home/AdBanner/AdBanner.module.css';

const AdBanner = () => {
    return (
        <div>
            <div className={`${styles.adBannerWrapper} box-container`}>
                <Link to="/">
                    <img src={img} alt='' />
                </Link>
                <div className={styles.adText}>
                    <h2>Buy 3. Get Free 1.</h2>
                    <p>50% off for selected products in BOIGHOR</p>
                </div>
            </div>
        </div>
    );
};

export default AdBanner;