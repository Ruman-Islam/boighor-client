/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/pagination";
import bannerImg from '../../../assets/images/statick-banner.webp';
import { Pagination } from "swiper";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import styles from '../../../styles/Home/HomeProduct2/HomeProduct2.module.css';
import { Link } from 'react-router-dom';
import fetcher from '../../../api/axios';
import { addToLocalStorage } from '../../../Utils/shopping_cart';
import Swal from 'sweetalert2';

const RightBoxSlider = () => {
    const [books, setBooks] = useState([]);

    // GET SPECIAL OFFER DISCOUNT BOOKS
    useEffect(() => {
        (async () => {
            try {
                const { data: { result } } = await fetcher.get("book/special-offer")
                const specialOfferBooks = [];
                for (const book of result) {
                    if (book?.current_discount >= 25) {
                        specialOfferBooks.push(book);
                    }
                }
                setBooks(specialOfferBooks);
            } catch (error) {
                console.log(error);
            }
        })()
    }, []);
    // .........................................

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
        <div className={styles.productLeftBox}>
            <div className={styles.specialOffer}>
                <p>Special offer</p>
            </div>
            <div className={styles.leftBoxSlider}>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
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
                            slidesPerView: 1
                        }
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {books?.slice(0, 5).map((book, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className={styles.spacialBook}>
                                    <div className={styles.specialBookTitles}>
                                        <Link to={`/category/${book?.publisher}`}>{book?.publisher}</Link>
                                        <Link to={`/book/${book?._id}`}>{book?.title?.slice(0, 31)}</Link>
                                    </div>
                                    <div className={styles.bookDetail}>
                                        <div className={styles.bookImg}>
                                            <Link to={`/book/${book?._id}`}>
                                                {book?.imgURL && (
                                                    <img
                                                        width={100}
                                                        height={100}
                                                        src={book.imgURL}
                                                        alt=""
                                                    />
                                                )}
                                            </Link>
                                            <div className={styles.priceBox}>
                                                <p>{book?.sell_price}</p>
                                                <p>{book?.original_price}</p>
                                                <span className={styles.discount}>- {book?.current_discount}%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.bookActionButtons}>
                                        <a
                                            onClick={() => addToCart(book)}
                                            title='Add to Cart'
                                            className={styles.bookActionBtn}>
                                            <AddShoppingCartIcon />
                                        </a>
                                        <a
                                            onClick={() => addToCart(book)}
                                            title='Add to Cart'
                                            className={styles.bookActionBtn}>
                                            <FavoriteBorderIcon />
                                        </a>
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
                </Swiper>
            </div>
            <div className={styles.staticBanner}>
                {bannerImg && (
                    <img
                        src={bannerImg}
                        alt=""
                    />
                )}
            </div>
        </div>
    );
};

export default RightBoxSlider;