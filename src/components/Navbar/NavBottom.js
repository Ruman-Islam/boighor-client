import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import Dropdown from './Dropdown';
import { toggleCategory } from '../../redux/navbarSlice';
import useNav from '../../hooks/UseNav';
import { Link } from 'react-router-dom';
import styles from '../../styles/Navbar/NavBottom.module.css';

const NavBottom = () => {
    const { navbar } = useNav();
    const isToggleOpen = useSelector((state) => state?.navbarReducer?.isCategoryToggleOpen);
    const dispatch = useDispatch();
    const btnRef = useRef();
    const [publishers, setPublishers] = useState([]);
    const [authors, setAuthors] = useState([]);

    // TOGGLE CATEGORY
    useEffect(() => {
        const hideDropdown = (e) => {
            if (e.path[1] !== btnRef.current) {
                dispatch(toggleCategory(false));
            };
        };
        document.addEventListener('mousedown', hideDropdown);
        return () => document.removeEventListener('mousedown', hideDropdown);
    }, [dispatch]);
    // ..............................

    // FETCHING PUBLICATION LIST
    useEffect(() => {
        fetch('http://localhost:5000/api/v1/book/publications')
            .then(res => res.json())
            .then(({ result }) => {
                setPublishers(result);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);
    // ..............................


    // FETCHING WRITER LIST
    useEffect(() => {
        fetch('http://localhost:5000/api/v1/book/writers')
            .then(res => res.json())
            .then(({ result }) => {
                setAuthors(result);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);
    // ..............................

    return (
        <div className={`${styles.navBottomContainer} ${navbar && styles.navBottomContainerHide}`}>
            <div className={`${styles.navBottomWrapper} box-container`}>
                <div className={styles.navBottomLeftBox}>
                    <div className={styles.browseCategoryBtnWrapper}>
                        <button
                            style={{ color: `${isToggleOpen ? '#61AB00' : '#1B1F23'}` }}
                            ref={btnRef} onClick={() => dispatch(toggleCategory(!isToggleOpen))}>
                            {/* <FontAwesomeIcon icon={faBars} /> */}
                            <span>Choose category</span>
                            {
                                isToggleOpen ?
                                    <ExpandLessOutlinedIcon /> :
                                    <ExpandMoreOutlinedIcon />
                            }
                        </button>
                        <ul id={`${isToggleOpen ? 'dropdown-show' : 'dropdown-hidden'}`}
                            className={styles.browseCategoryDropdown}>
                            <li>
                                <button>Arts &amp; Photography</button>
                            </li>
                            <li>
                                <button>Biographies</button>
                            </li>
                            <li>
                                <button>Business</button>
                            </li>
                            <li>
                                <button>Classic</button>
                            </li>
                            <li>
                                <button>Comics</button>
                            </li>
                            <li>
                                <button>Children &apos;s Books</button>
                            </li>
                            <li>
                                <button>Cookbooks</button>
                            </li>
                            <li>
                                <button>Education</button>
                            </li>
                        </ul>
                    </div>
                    {/* <div className='support-center-contact-box'>
                <div className='support-center-icon'>
                    <FontAwesomeIcon icon={faHeadphonesSimple} />
                </div>
                <div>
                    <p>Free Support 24/7</p>
                    <p>+01-202-555-0181</p>
                </div>
            </div> */}
                </div>
                <div className={styles.navBottomRightBox}>
                    <ul>
                        <li className={styles.navLink}>
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                        <li className={`${styles.writer} ${styles.navLink}`}>
                            <Link to="/writer">
                                Writer
                                <ExpandLessOutlinedIcon className={styles.navChevronUpIcon} />
                                <ExpandMoreOutlinedIcon className={styles.navChevronDownIcon} />
                            </Link>
                            <Dropdown props={authors} />
                        </li>
                        <li className={`${styles.publication} ${styles.navLink}`}>
                            <Link to="/publication">
                                Publications
                                <ExpandLessOutlinedIcon className={styles.navChevronUpIcon} />
                                <ExpandMoreOutlinedIcon className={styles.navChevronDownIcon} />
                            </Link>
                            <Dropdown props={publishers} />
                        </li>
                        <li className={styles.navLink}>
                            <Link to="/stock">Stock Books</Link>
                        </li>
                        <li className={styles.navLink}>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavBottom;