/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import fetcher from '../api/axios';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import styles2 from '../styles/Category/Category.module.css';
import styles from '../styles/Home/HomeProduct1/HomeProduct1.module.css';
import { addToLocalStorage } from '../Utils/shopping_cart';
import Swal from 'sweetalert2';

const Category = () => {
    const { query } = useParams();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const { data: { result } } = await fetcher.get(`book/search?char=${query}`);
                setBooks(result);
            } catch (error) {

            }
        })()
    }, [query])

    const addToCart = (book) => {
        // const order = {
        //     user_name: user?.displayName,
        //     email: user?.email,
        //     products: [
        //         { product_id: book?._id, price: book?.sell_price, status: 'pending' }
        //     ]
        // }
        // console.log(order);
        addToLocalStorage(book?._id)
        Swal.fire('Your book was added to cart')
    }

    return (
        <section className={`${styles2.category} box-container`}>
            <div className={styles2.books_container}>
                {books?.length > 0 &&
                    books?.map((book) => {
                        return (
                            <div key={book?._id} className={styles.slider}>
                                <div className={styles.homeProductSection1Book}>
                                    <div>
                                        <Link to="/">
                                            {book?.publisher}
                                        </Link>
                                        <Link to={`/book/${book?._id}`}>
                                            {book?.title?.slice(0, 25)}
                                        </Link>
                                    </div>
                                    <div className={styles.productImage}>
                                        <Link to={`/book/${book?._id}`}>
                                            {book?.imgURL && (
                                                <img
                                                    height={400}
                                                    width={100}
                                                    src={book?.imgURL}
                                                    alt={book?.title}
                                                />
                                            )}
                                        </Link>
                                        <div className={styles.priceBox}>
                                            <p>
                                                {book?.sell_price}
                                            </p>
                                            {(!!book?.original_price) &&
                                                <p>
                                                    {book?.original_price}
                                                </p>}
                                            {
                                                (!!book?.current_discount) &&
                                                <span className={styles.discount}>
                                                    - {book?.current_discount}%
                                                </span>
                                            }

                                        </div>
                                    </div>
                                    <div className={styles.bookActionButtons}>
                                        <a onClick={() => addToCart(book?._id)}
                                            title='Add to Cart'
                                            className={styles.bookActionBtn}>
                                            <AddShoppingCartIcon />
                                        </a>
                                        <Link to="/" title='Add to Wish List'
                                            className={styles.bookActionBtn}>
                                            <FavoriteBorderIcon />
                                        </Link>
                                        <Link to={`/book/${book?._id}`}
                                            title='View Details'
                                            className={styles.bookActionBtn}>
                                            <VisibilityIcon />
                                        </Link>
                                        <Link to={`/book/${book?._id}`}
                                            title='Quick View'
                                            className={styles.bookActionBtn}>
                                            <ShuffleIcon />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </section>
    );
};

export default Category;