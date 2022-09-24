/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import styles from '../../styles/BookDetail/BookDetail.module.css';

const FloatingCart = () => {
    return (
        <div className={styles.floating_cart_box}>
            <div className={styles.btn_cart}>
                <a>
                    <div className={styles.count_wrapper}>
                        <ShoppingCartOutlinedIcon className={styles.cartIcon} />
                        <div className={styles.cart_count}>0</div>
                    </div>
                    <p>TK. 1050</p>
                </a>
            </div>
            <div className={styles.btn_wishlist}>
                <a>
                    <div className={styles.count_wrapper}>
                        <FavoriteBorderOutlinedIcon className={styles.cartIcon} />
                        <div className={styles.cart_count}>0</div>
                    </div>
                    <p>Wishlist</p>
                </a>
            </div>
        </div>
    );
};

export default FloatingCart;