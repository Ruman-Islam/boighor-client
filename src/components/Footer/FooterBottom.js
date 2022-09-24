import React from 'react';
import { Link } from 'react-router-dom';
import paymentImg from '../../assets/images/payment.webp';
import styles from '../../styles/Footer/Footer.module.css';

const FooterBottom = () => {
    const year = new Date().getFullYear();
    return (
        <div className={styles.footerBottom}>
            <div className={styles.footerBottomInner}>
                <p>Suspendisse in auctor augue. Cras fermentum est ac fermentum tempor. Etiam vel magna volutpat, posuere eros</p>
                <div>
                    <Link to="/">
                        <img src={paymentImg} alt="" />
                    </Link>
                </div>
                <p>Copyright &copy; {year} <Link to="/">Ruman Islam.</Link> All Rights Reserved.</p>
            </div>
        </div>
    );
};

export default FooterBottom;