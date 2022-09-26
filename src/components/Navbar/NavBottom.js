/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import Dropdown from './Dropdown';
import { toggleCategory } from '../../redux/navbarSlice';
import useNav from '../../hooks/UseNav';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/Navbar/NavBottom.module.css';
import fetcher from '../../api/axios';

const NavBottom = () => {
    const navigate = useNavigate();
    const { navbar } = useNav();
    const isToggleOpen = useSelector((state) => state?.navbarReducer?.isCategoryToggleOpen);
    const dispatch = useDispatch();
    const btnRef = useRef();
    const [publishers, setPublishers] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);

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
        (async () => {
            try {
                const { data: { result } } = await fetcher.get("book/publications")
                setPublishers(result);
            } catch (error) {
                console.log(error);
            }
        })()
    }, []);
    // ..............................


    // FETCHING WRITER LIST
    useEffect(() => {
        (async () => {
            try {
                const { data: { result } } = await fetcher.get("book/writers")
                setAuthors(result);
            } catch (error) {
                console.log(error);
            }
        })()
    }, []);
    // ..............................

    // FETCHING WRITER LIST
    useEffect(() => {
        (async () => {
            try {
                const { data: { result } } = await fetcher.get("book/categories")
                setCategories(result);
            } catch (error) {
                console.log(error);
            }
        })()
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
                            {categories?.length > 0 &&
                                categories?.map((cg, index) => {
                                    return (
                                        <li key={index}>
                                            <button onClick={() => navigate(`/category/${cg?._id}`)}>{cg?._id}</button>
                                        </li>
                                    )
                                })}
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
                            <a>
                                Writer
                                <ExpandLessOutlinedIcon className={styles.navChevronUpIcon} />
                                <ExpandMoreOutlinedIcon className={styles.navChevronDownIcon} />
                            </a>
                            <Dropdown props={authors} />
                        </li>
                        <li className={`${styles.publication} ${styles.navLink}`}>
                            <a style={{ cursor: 'pointer' }}>
                                Publications
                                <ExpandLessOutlinedIcon className={styles.navChevronUpIcon} />
                                <ExpandMoreOutlinedIcon className={styles.navChevronDownIcon} />
                            </a>
                            <Dropdown props={publishers} />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavBottom;