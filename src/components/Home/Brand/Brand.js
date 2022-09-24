import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import brand1 from '../../../assets/images/br1-170x58.jpg';
import brand2 from '../../../assets/images/br2-170x58.jpg';
import brand3 from '../../../assets/images/br3-170x58.jpg';
import brand4 from '../../../assets/images/br4-170x58.jpg';
import brand5 from '../../../assets/images/br5-170x58.webp';
import brand6 from '../../../assets/images/br6-170x58.jpg';

const Brand = () => {
    const styles = {
        marginBottom: '50px',
        background: '#fff',
        borderRadius: '5px',
        boxShadow: '0px 4px 6px -3px #9c9c9c',
        padding: '1rem',
    }

    return (
        <div className='box-container'>
            <br />
            <Swiper
                style={styles}
                slidesPerView={2}
                spaceBetween={10}
                breakpoints={{
                    820: {
                        slidesPerView: 4
                    },
                    768: {
                        slidesPerView: 4
                    },
                    1024: {
                        slidesPerView: 4
                    },
                    1280: {
                        slidesPerView: 6
                    },
                }}
            >
                <SwiperSlide>
                    <img src={brand1} alt='' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={brand2} alt='' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={brand3} alt='' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={brand4} alt='' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={brand5} alt='' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={brand6} alt='' />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Brand;