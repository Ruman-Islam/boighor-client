import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NavMiddleLeft from './NavMiddleLeft';
import NavMiddleRight from './NavMiddleRight';
import { Link, useLocation } from 'react-router-dom';
import styles from '../../styles/Navbar/NavMiddle.module.css';
import { storeSearchedBooks, clearSearchedBooks } from '../../redux/book/storeBooksSlice';


const NavMiddle = () => {
    const dispatch = useDispatch();
    const { searchedBooks } = useSelector((state) => state.storeSearchedBooksReducer);
    const [searchQuery, setSearchQuery] = useState('');
    const { route } = useLocation();


    // SEARCH BOOKS
    useEffect(() => {
        if (searchQuery === '') {
            dispatch(clearSearchedBooks());
        } else if (/^\s/.test(searchQuery)) {
            setSearchQuery('');
        } else {
            fetch(`http://localhost:5000/api/v1/book/search?char=${searchQuery}`)
                .then(res => res.json())
                .then(({ result }) => dispatch(storeSearchedBooks(result)))
        }
    }, [searchQuery]);
    // ........................

    useEffect(() => {
        setSearchQuery('');
        dispatch(clearSearchedBooks());
    }, [route]);


    return (
        <>
            <div className={styles.navMiddleContainer}>
                <div className={`${styles.navMiddleWrapper} box-container`}>
                    <NavMiddleLeft
                        setSearchQuery={setSearchQuery}
                        searchQuery={searchQuery}
                        searchedBooks={searchedBooks}
                    />
                    <NavMiddleRight />
                </div>
            </div>

            {/* MOBILE VERSION BOOK SEARCH */}
            <div className={styles.search2}>
                <div className={styles.navSearchBox2}>
                    <input value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="text" placeholder='Book name...' />
                    {searchQuery?.length >= 0 ?
                        <ClearOutlinedIcon onClick={() => setSearchQuery('')}
                            style={{ cursor: 'pointer' }}
                            className={styles.navSearchIcon2} />
                        :
                        <SearchOutlinedIcon className={styles.navSearchIcon2} />}
                </div>
                {
                    searchedBooks ?
                        <ul className={styles.searchedItemsBox2}>
                            {searchedBooks?.map((book) => {
                                return (
                                    <Link to='/home' key={book?._id}>
                                        <li className={styles.searchedItem2}>
                                            <div>
                                                <img
                                                    style={{ width: '50px', height: '50px' }}
                                                    src={book?.imgURL}
                                                    alt=""
                                                />
                                            </div>
                                            <div>
                                                <p className={styles.bookTitle}>
                                                    <Link to='/'>
                                                        {book?.title}
                                                    </Link>
                                                </p>
                                                <p className={styles.bookPrice}>
                                                    {book?.price}
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
        </>
    );
};

export default NavMiddle;