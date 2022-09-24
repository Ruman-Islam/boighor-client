import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { Link } from 'react-router-dom';
import blogPic1 from '../../../assets/images/blogpic1.jpg';
import blogPic2 from '../../../assets/images/blogpic2.jpg';
import styles from '../../../styles/Home/HomeBlog/HomeBlog.module.css';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';

const HomeBlog = () => {
    return (
        <div>
            <div className={`${styles.homeBlogWrapper} box-container`}>
                <p className={styles.moduleTitle}>LATEST BLOGS</p>
                <Swiper className={styles.blogSlider}
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
                            slidesPerView: 2
                        }
                    }}
                    modules={[Pagination]}
                >
                    <SwiperSlide>
                        <div className={styles.homeBlog}>
                            <div className={styles.homeBlogImg}>
                                <Link to="/">
                                    <img src={blogPic1} alt="" />
                                </Link>
                            </div>
                            <div className={styles.homeBlogDetail}>
                                <div className={styles.blogDateTitle}>
                                    <div>
                                        <span>11</span>
                                        <span>MAR</span>
                                    </div>
                                    <div>
                                        <Link to="/">How To Grow Epiphytic Tropical Plants</Link>
                                    </div>
                                </div>
                                <div className={styles.blogDescription}>
                                    <p>
                                        <PeopleOutlineOutlinedIcon />
                                        <span>Posted by Admin</span>
                                    </p>
                                    <p>Maria Denardo is the Fashion...</p>
                                    <p>
                                        <span>Read More</span>
                                        <ArrowCircleRightOutlinedIcon />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={styles.homeBlog}>
                            <div className={styles.homeBlogImg}>
                                <Link to="/">
                                    <img src={blogPic2} alt="" />
                                </Link>
                            </div>
                            <div className={styles.homeBlogDetail}>
                                <div className={styles.blogDateTitle}>
                                    <div>
                                        <span>11</span>
                                        <span>MAR</span>
                                    </div>
                                    <div>
                                        <Link to="/">How To Grow Epiphytic Tropical Plants</Link>
                                    </div>
                                </div>
                                <div className={styles.blogDescription}>
                                    <p>
                                        <PeopleOutlineOutlinedIcon />
                                        <span>Posted by Admin</span>
                                    </p>
                                    <p>Maria Denardo is the Fashion...</p>
                                    <p>
                                        <span>Read More</span>
                                        <ArrowCircleRightOutlinedIcon />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={styles.homeBlog}>
                            <div className={styles.homeBlogImg}>
                                <Link to="/">
                                    <img src={blogPic1} alt="" />
                                </Link>
                            </div>
                            <div className={styles.homeBlogDetail}>
                                <div className={styles.blogDateTitle}>
                                    <div>
                                        <span>11</span>
                                        <span>MAR</span>
                                    </div>
                                    <div>
                                        <Link to="/">How To Grow Epiphytic Tropical Plants</Link>
                                    </div>
                                </div>
                                <div className={styles.blogDescription}>
                                    <p>
                                        <PeopleOutlineOutlinedIcon />
                                        <span>Posted by Admin</span>
                                    </p>
                                    <p>Maria Denardo is the Fashion...</p>
                                    <p>
                                        <span>Read More</span>
                                        <ArrowCircleRightOutlinedIcon />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={styles.homeBlog}>
                            <div className={styles.homeBlogImg}>
                                <Link to="/">
                                    <img src={blogPic2} alt="" />
                                </Link>
                            </div>
                            <div className={styles.homeBlogDetail}>
                                <div className={styles.blogDateTitle}>
                                    <div>
                                        <span>11</span>
                                        <span>MAR</span>
                                    </div>
                                    <div>
                                        <Link to="/">How To Grow Epiphytic Tropical Plants</Link>
                                    </div>
                                </div>
                                <div className={styles.blogDescription}>
                                    <p>
                                        <PeopleOutlineOutlinedIcon />
                                        <span>Posted by Admin</span>
                                    </p>
                                    <p>Maria Denardo is the Fashion...</p>
                                    <p>
                                        <span>Read More</span>
                                        <ArrowCircleRightOutlinedIcon />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default HomeBlog;