/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination } from "swiper";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SectionNav from './SectionNav';
import styles from '../../../styles/Home/HomeProduct1/HomeProduct1.module.css';
import { Link } from 'react-router-dom';
import fetcher from '../../../api/axios';
import { addToLocalStorage } from '../../../Utils/shopping_cart';
import Swal from 'sweetalert2';

const HomeProduct1 = () => {
    const [active, setActive] = useState('featured');
    const [url, setUrl] = useState('/featured');
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);


    // FETCHING FEATURED/NEW/MOST-VIEWED BOOKS
    useEffect(() => {
        setLoading(true);
        (async () => {
            const { data: { result } } = await fetcher.get(`book${url}`)
            setBooks(result);
            setLoading(false);
        })()
    }, [url]);
    // .......................................

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
        <div className={`${styles.homeProductSection1Wrapper} box-container`}>
            <SectionNav active={active} setActive={setActive} setUrl={setUrl} />

            {loading ? <div style={{ height: '400px' }}></div> :
                <Swiper
                    className={styles.sliderWrapper}
                    slidesPerView={1}
                    spaceBetween={60}
                    grid={{
                        rows: 2,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        820: {
                            slidesPerView: 2
                        },
                        768: {
                            slidesPerView: 2
                        },
                        1024: {
                            slidesPerView: 4
                        },
                        1280: {
                            slidesPerView: 5
                        }
                    }}
                    modules={[Grid, Pagination]}
                >
                    {books?.slice(0, 20)?.map((book, index) => {
                        return (

                            <SwiperSlide key={index} className={styles.slider}>
                                <div key={index} className={styles.homeProductSection1Book}>
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
                                                Tk. {book?.sell_price}
                                            </p>
                                            {(!!book?.original_price) &&
                                                <p>
                                                    Tk. {book?.original_price}
                                                </p>}
                                            {
                                                (!!book?.current_discount) &&
                                                <span className={styles.discount}>
                                                    {book?.current_discount}%
                                                </span>
                                            }

                                        </div>
                                    </div>
                                    <div className={styles.bookActionButtons}>
                                        {book?.quantity > 0 &&
                                            <a onClick={() => addToCart(book)}
                                                title='Add to Cart'
                                                className={styles.bookActionBtn}>
                                                <AddShoppingCartIcon />
                                            </a>}

                                        {/* <Link to="/" title='Add to Wish List'
                                            className={styles.bookActionBtn}>
                                            <FavoriteBorderIcon />
                                        </Link> */}
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
                            </SwiperSlide>
                        )
                    })}
                </Swiper>}
        </div>
    );
};

export default HomeProduct1;