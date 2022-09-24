import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination } from "swiper";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SectionNav from './SectionNav';
import styles from '../../../styles/Home/HomeProduct1/HomeProduct1.module.css';
import { Link } from 'react-router-dom';

const HomeProduct1 = () => {
    const [active, setActive] = useState('featured');
    const [url, setUrl] = useState('/featured');
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);

    // FETCHING FEATURED/NEW/MOST-VIEWED BOOKS
    useEffect(() => {
        setLoading(true);
        fetch(`https://boighor-server.vercel.app/api/v1/book${url}`)
            .then(res => res.json())
            .then(({ result }) => {
                setLoading(false);
                setBooks(result);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [url]);
    // .......................................

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
                                        <Link to="/"
                                            title='Add to Cart'
                                            className={styles.bookActionBtn}>
                                            <AddShoppingCartIcon />
                                        </Link>
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
                            </SwiperSlide>
                        )
                    })}
                </Swiper>}
        </div>
    );
};

export default HomeProduct1;