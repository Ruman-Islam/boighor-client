import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { toggleMobileMenu } from '../../redux/navbarSlice';
import styles from '../../styles/Navbar/MobileMenu.module.css';
import { Link } from 'react-router-dom';

const MobileMenu = () => {
    const mobileMenu = useSelector((state) => state?.navbarReducer?.mobileMenu);
    const dispatch = useDispatch();
    return (
        <div className={`${styles.mobileMenuContainer} ${mobileMenu ? styles.drawerShow : styles.drawerHidden}`}>
            <div className={styles.homeBtn}>
                <Link to="/home">
                    <HomeOutlinedIcon />
                    <span>Home</span>
                </Link>
                <CancelOutlinedIcon
                    onClick={() => dispatch(toggleMobileMenu(false))}
                    className={styles.crossBtn} />
            </div>
            <div className={styles.mobileMenuLinksWrapper}>
                <ul className={styles.mobileMenuLinks}>
                    <li><Link to="/home">Writer</Link></li>
                    <li><Link to="/home">Publication</Link></li>
                    <li><Link to="/home">Stock Books</Link></li>
                    <li><Link to="/home">Contact</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default MobileMenu;