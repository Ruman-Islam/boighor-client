import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NavMiddleLeft from './NavMiddleLeft';
import NavMiddleRight from './NavMiddleRight';
import { Link, useLocation } from 'react-router-dom';
import styles from '../../styles/Navbar/NavMiddle.module.css';
import { storeSearchedBooks, clearSearchedBooks } from '../../redux/book/storeBooksSlice';
import fetcher from '../../api/axios';


const NavMiddle = ({ loginWithGoogle }) => {
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
            (async () => {
                try {
                    const { data: { result } } = await fetcher.get(`book/search?char=${searchQuery}`);
                    dispatch(storeSearchedBooks(result))
                } catch (error) {
                    console.log(error);
                }
            })()
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
                    <NavMiddleRight
                        loginWithGoogle={loginWithGoogle} />
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