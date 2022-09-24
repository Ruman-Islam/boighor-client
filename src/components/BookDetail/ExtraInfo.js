import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import cod from '../../assets/images/cod-small.svg';
import hr from '../../assets/images/happy-return.svg';
import dc from '../../assets/images/deliver-icon.png';
import pe from '../../assets/images/wallet-two.svg';
import { useEffect } from 'react';
import { fetchRelatedBooks } from '../../redux/book/relatedBooksSlice';
import styles from '../../styles/BookDetail/BookDetail.module.css';

const ExtraInfo = ({ book }) => {
    const dispatch = useDispatch();
    const { isLoading, relatedBooks, error } = useSelector((state) => state?.relatedBooksReducer);

    useEffect(() => {
        if (book?.category) {
            dispatch(fetchRelatedBooks(book?.category))
        }
    }, [book?.category, dispatch])


    return (
        <section className={styles.extraInfo}>
            <div className={styles.extraInfoText}>
                <div className={styles.cod}>
                    <img width={20} height={20} src={cod} alt="" />
                    <span> Cash On Delivery</span>
                </div>
                <div className={styles.cod}>
                    <img width={20} height={20} src={hr} alt="" />
                    <span> 7 Days Happy Return</span>
                </div>
                <div className={styles.cod}>
                    <img width={20} height={20} src={dc} alt="" />
                    <span> Delivery Charge Tk.</span>
                </div>
                <div className={styles.cod}>
                    <img width={20} height={20} src={pe} alt="" />
                    <span> Purchase &amp; Earn</span>
                </div>
            </div>
            <div className={styles.relatedProduct}>
                <h4>Related Products</h4>
                <div className={styles.sliderWrapper}>

                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        modules={[Autoplay]}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: true,
                        }}
                    >
                        {relatedBooks?.filter(bk => bk?._id !== book?._id).map(book => {
                            return (
                                <SwiperSlide key={book?._id} className={styles.slider}>
                                    <Link to={`/book/${book?._id}`}>
                                        <div className={styles.relatedBook}>
                                            <img
                                                className={styles.relatedBookImg}
                                                src={book?.imgURL}
                                                width={100} height={150}
                                                alt="" />
                                            <div className={styles.relatedBookDetail}>
                                                <p className={styles.relatedBookTitle}>
                                                    {book?.title.slice(0, 30)}
                                                </p>
                                                <p className={styles.relatedBookAuthor}>
                                                    by {book?.author.slice(0, 30)}
                                                </p>
                                                <p className={styles.relatedBookPrice}>Tk. {book?.sell_price}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>

            </div>
        </section>
    );
};

export default ExtraInfo;