import React from 'react';
import JumpToTopButton from '../components/common/JumpToTopButton';
import AdBanner from '../components/Home/AdBanner/AdBanner';
import Brand from '../components/Home/Brand/Brand';
import Hero from '../components/Home/Hero/Hero';
import HomeBlog from '../components/Home/HomeBlog/HomeBlog';
import HomeProduct1 from '../components/Home/HomeProduct1/HomeProduct1';
import HomeProduct2 from '../components/Home/HomeProduct2/HomeProduct2';
import HomeProduct3 from '../components/Home/HomeProduct3/HomeProduct3';
import Service from '../components/Home/Service/Service';
// import { useLocation } from 'react-router-dom';

const Home = () => {
    return (
        <section>
            <Hero />
            <Service />
            <HomeProduct1 />
            <HomeProduct2 />
            <HomeProduct3 />
            <AdBanner />
            <HomeBlog />
            <Brand />
            <JumpToTopButton />
        </section>
    );
};

export default Home;