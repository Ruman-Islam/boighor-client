import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/pagination";
import { Pagination } from "swiper";
import styles from '../../../styles/Home/HomeProduct2/HomeProduct2.module.css';
import { Link } from 'react-router-dom';

const LeftBoxSlider = () => {
    const [FeaturedBooks, setFeaturedBooks] = useState([]);
    const [newArrivalBooks, setNewArrivalBooks] = useState([]);

    // FETCHING NEW ARRIVAL BOOKS
    useEffect(() => {
        fetch(`https://boighor-server.vercel.app/api/v1/book/new`)
            .then(res => res.json())
            .then(({ result }) => {
                setNewArrivalBooks(result);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    // FETCHING FEATURED BOOKS
    useEffect(() => {
        fetch(`https://boighor-server.vercel.app/api/v1/book/featured`)
            .then(res => res.json())
            .then(({ result }) => {
                setFeaturedBooks(result);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <div className={styles.productRightBox}>
            <div className={styles.newArrivals}>
                <p>NEW ARRIVALS</p>

                <Swiper className={styles.newArrivalsSlider}
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
                        },
                        1280: {
                            slidesPerView: 2
                        },
                    }}
                    modules={[Pagination]}
                >
                    {newArrivalBooks?.slice(0, 6).map((book, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className={styles.newArrivalBook}>
                                    <div className={styles.newArrivalBookImg}>
                                        <Link to={`/book/${book?._id}`}>
                                            {book?.imgURL && (
                                                <img
                                                    width={100}
                                                    height={140}
                                                    src={book?.imgURL}
                                                    alt=""
                                                />
                                            )}
                                        </Link>
                                    </div>
                                    <div className={styles.specialBookDetails}>
                                        <Link to="/">{book?.publisher}</Link>
                                        <Link to={`/book/${book?._id}`}>
                                            {book?.title?.slice(0, 31)}
                                        </Link>
                                        <div className={styles.specialBookPriceBox}>
                                            <p>
                                                {book?.sell_price}
                                                {!!book?.original_price &&
                                                    <span>
                                                        {book?.original_price}
                                                    </span>}
                                            </p>
                                            {!!book?.current_discount &&
                                                <span className={styles.discount}>- {book?.current_discount}%</span>}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>


            <div className={styles.newArrivals}>
                <p>FEATURED PRODUCTS</p>

                <Swiper className={styles.newArrivalsSlider}
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
                        },
                        1280: {
                            slidesPerView: 2
                        },
                    }}
                    modules={[Pagination]}
                >
                    {FeaturedBooks?.slice(0, 6).map((book, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className={styles.newArrivalBook}>
                                    <div className={styles.newArrivalBookImg}>
                                        <Link to={`/book/${book?._id}`}>
                                            {book?.imgURL && (
                                                <img
                                                    width={100}
                                                    height={140}
                                                    src={book?.imgURL}
                                                    alt=""
                                                />
                                            )}
                                        </Link>
                                    </div>
                                    <div className={styles.specialBookDetails}>
                                        <Link to="/">
                                            {book?.publisher}
                                        </Link>
                                        <Link to={`/book/${book?._id}`}>
                                            {book?.title?.slice(0, 31)}
                                        </Link>
                                        <div className={styles.specialBookPriceBox}>
                                            <p>{book?.sell_price}
                                                {!!book?.original_price &&
                                                    <span>
                                                        {book?.original_price}
                                                    </span>}
                                            </p>
                                            {!!book?.current_discount &&
                                                <span className={styles.discount}>- {book?.current_discount}%</span>}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    );
};

export default LeftBoxSlider;

