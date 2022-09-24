import React, { useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination } from "swiper";
// ................... //
import styles from '../../../styles/Home/HomeProduct3/HomeProduct3.module.css';
import { Link } from 'react-router-dom';


const HomeProduct3 = () => {
    const [childrenBooks, setChildrenBooks] = useState([]);

    // FETCHING CHILDREN BOOKS
    useEffect(() => {
        fetch('http://localhost:5000/api/v1/book/children')
            .then(res => res.json())
            .then(({ result }) => {
                setChildrenBooks(result);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <div className='box-container'>
            <section className={styles.homeProductSection3Container}>
                <div className={styles.homeProductSection3Title}>
                    <p className={styles.title}>CHILDREN’S BOOKS</p>
                </div>
                <Swiper
                    className={styles.sliderWrapper}
                    slidesPerView={1}
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
                            slidesPerView: 2
                        },
                        1280: {
                            slidesPerView: 3
                        }
                    }}
                    modules={[Grid, Pagination]}
                >
                    {childrenBooks && childrenBooks?.slice(0, 20)?.map((book, index) => {
                        return (

                            <SwiperSlide key={index} className={styles.slider}>
                                <div className={styles.newArrivalBook}>
                                    <Link to={`/book/${book?._id}`}>
                                        <div className={styles.newArrivalBookImg}>
                                            {book?.imgURL && (
                                                <img
                                                    width={100}
                                                    height={100}
                                                    src={book?.imgURL}
                                                    alt=""
                                                />
                                            )}
                                        </div>
                                    </Link>
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
                                                <span className={styles.discount}>-{book?.current_discount}</span>}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </section>
        </div>
    );
};

export default HomeProduct3;