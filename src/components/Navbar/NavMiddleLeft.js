import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMobileMenu } from '../../redux/navbarSlice';
import styles from '../../styles/Navbar/NavMiddle.module.css';

const NavMiddleLeft = ({ searchQuery, setSearchQuery }) => {
    const { searchedBooks } = useSelector((state) => state.storeSearchedBooksReducer);
    const { mobileMenu } = useSelector((state) => state.navbarReducer);
    const dispatch = useDispatch();
    const searchBoxRef = useRef(null);

    useEffect(() => {
        const hideMobileMenu = (e) => {
            if (!searchBoxRef?.current?.contains(e.target)) {
                setSearchQuery('');
            }
        };
        document.addEventListener('mousedown', hideMobileMenu);
        return () => document.removeEventListener('mousedown', hideMobileMenu);
    }, []);


    return (
        <div className={styles.navMiddleLeftBox}>
            <div className={styles.navLogoContainer}>

                <MenuIcon
                    onClick={() => dispatch(toggleMobileMenu(!mobileMenu))}
                    className={styles.navHamburgerIcon} />
                <Link to="/">
                    <span className={styles.logo}><span>বই</span>-<span>ঘর</span></span>
                </Link>
            </div>

            <div className={styles.search}>
                <div className={styles.navSearchBox}>
                    <input value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="text" placeholder='Book name...' />
                </div>
                <div className={styles.navSearchIcon}>
                    {searchQuery?.length > 0 ?
                        <ClearOutlinedIcon onClick={() => setSearchQuery('')}
                            style={{ cursor: 'pointer' }}
                            className={styles.navSearchIcon} />
                        :
                        <SearchOutlinedIcon className={styles.navSearchIcon} />}
                </div>
                {
                    searchedBooks ?
                        <ul
                            ref={searchBoxRef}
                            className={`${styles.searchedItemsBox}`}>
                            {searchedBooks?.map((book) => {
                                return (
                                    <Link
                                        key={book?._id}
                                        to={`/book/${book?._id}`} >
                                        <li className={styles.searchedItem}>
                                            <div>
                                                <img
                                                    style={{ width: '60px', height: '80px', objectFit: 'cover' }}
                                                    src={book?.imgURL}
                                                    alt=""
                                                />
                                            </div>
                                            <div>
                                                <p className={styles.bookTitle}>
                                                    {book?.title}
                                                </p>
                                                <p className={styles.bookPrice}>
                                                    Tk. {book?.sell_price}
                                                </p>
                                            </div>
                                        </li>
                                    </Link>
                                )
                            })}
                        </ul>
                        : ''
                }
            </div>
        </div>
    );
};

export default NavMiddleLeft;