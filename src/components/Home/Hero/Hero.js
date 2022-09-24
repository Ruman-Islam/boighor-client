import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../styles/Home/Hero/Hero.module.css';
import '../../../styles/Home/Hero/Hero.css';

const sliderDiv = [
    `
    <p id='hero-slider1-text1'>Book Mockup</p>
    <p id='hero-slider1-text2'>HARDCOVER.</p>
    <p id='hero-slider1-text3'>Cover up front of book <br/> and leave summary</p>
    <button id='slider-shopping-btn'>Shopping Now</button>
    <Image src='https://i.ibb.co/Lpfb5Q0/slider1-smartbooks2-770x494-770x494.webp' alt="slider" />
    `,
    `
    <p id='hero-slider2-text1'>Beautiful Design</p>
    <p id='hero-slider2-text2'>INSTA.</p>
    <p id='hero-slider2-text3'>Explore the truth <br/> of book</p>
    <button id='slider-shopping-btn'>Shopping Now</button>
    <Image src='https://i.ibb.co/YBvSYHQ/slider2-smartbooks2-770x494-770x494.webp' alt="slider2"/>
    `,
];

const indicatorDiv = [
    `
    <div class='slider-indicator-btn-wrapper-border'>
        <span class='slider-indicator-btn-red-fill'></span>
    </div>
    <div class=''>
        <span class='slider-indicator-btn-accent-fill'></span>
    </div>
    `,
    `
    <div class=''>
        <span class='slider-indicator-btn-accent-fill'></span>
    </div>
    <div class='slider-indicator-btn-wrapper-border'>
        <span class='slider-indicator-btn-red-fill'></span>
    </div>
    `,
];

const Hero = () => {
    // const currency = useSelector((state) => state?.navbarReducer?.currency);
    const [featuredBooks, setFeaturedBooks] = useState();
    const sliderDivRef = useRef('');
    const indicatorDivRef = useRef();
    const length = sliderDiv.length;
    console.log(featuredBooks);

    // FETCHING FEATURED BOOKS
    useEffect(() => {
        fetch('https://boighor-server.vercel.app/api/v1/book/featured')
            .then(res => res.json())
            .then(({ result }) => {
                setFeaturedBooks(result);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    // CAROUSEL ANIMATION MECHANISM
    useEffect(() => {
        var i = 0;
        const slider = () => {
            if (i > length - 1) {
                i = 0
            }
            if (sliderDivRef.current && indicatorDivRef.current) {
                sliderDivRef.current.innerHTML = sliderDiv[i];
                indicatorDivRef.current.innerHTML = indicatorDiv[i];
            } else {
                sliderDivRef.current = '';
                indicatorDivRef.current = '';
            }
            i++;
            setTimeout(slider, 10000);
        }
        slider();
        return () => clearTimeout(slider);
    }, [length]);
    // .....................................

    return (
        <div id='hero' className={styles.hero_section}>
            <div className={`${styles.hero_wrapper} box-container`}>
                <div className="hero_left_box">
                    <div ref={sliderDivRef} className="hero_slider_wrapper">
                        {/* <p id='hero-slider1-text1'>Book Mockup</p>
                    <p id='hero-slider1-text2'>HARDCOVER.</p>
                    <p id='hero-slider1-text3'>Cover up front of book <br /> and leave summary</p>
                    <button id='slider-shopping-btn'>Shopping Now</button>
                    <Image src={img1} alt="" /> */}
                    </div>
                    <div ref={indicatorDivRef} className="slider-indicator-btn-wrapper">

                    </div>
                </div>
                <div className={styles.hero_right_box}>
                    <div className={styles.most_searched_wrapper}>
                        {featuredBooks?.slice(0, 3)?.map((book) => {
                            return (
                                <div key={book?._id} className={styles.most_searched_book}>
                                    <div className={styles.most_searched_book_inner}>
                                        <Link to={`/book/${book?._id}`}>
                                            <div className={styles.most_searched_book_img}>
                                                {book?.imgURL && (
                                                    <img
                                                        width={100}
                                                        height={140}
                                                        src={book?.imgURL}
                                                        alt={book?.title}
                                                    />
                                                )}
                                            </div>
                                        </Link>
                                        <div className={styles.most_searched_book_detail}>
                                            <Link to={`/book/${book?._id}`}>
                                                <span>{book?.publisher}</span>
                                            </Link>
                                            <Link to={`/book/${book?._id}`}>
                                                <span>{book?.title}</span>
                                            </Link><br />
                                            <span>Tk. {book?.sell_price}</span>
                                            {(!!book?.original_price) &&
                                                <span>
                                                    Tk. {book?.original_price}
                                                </span>}
                                            <br />
                                            {!!book?.current_discount && <div><span> {book?.current_discount}%</span></div>}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Hero;