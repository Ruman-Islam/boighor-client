import React from 'react';
import LeftBoxSlider from './LeftBoxSlider';
import RightBoxSlider from './RightBoxSlider';
import styles from '../../../styles/Home/HomeProduct2/HomeProduct2.module.css';

const HomeProduct2 = () => {
    return (
        <div className={styles.products}>
            <div className={`${styles.productsWrapper} box-container`}>
                <RightBoxSlider />
                <LeftBoxSlider />
            </div>
        </div>
    );
};

export default HomeProduct2;