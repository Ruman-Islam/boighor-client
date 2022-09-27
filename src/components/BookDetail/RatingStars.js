/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import StarRateIcon from '@mui/icons-material/StarRate';
import styles from '../../styles/BookDetail/BookDetail.module.css';

const RatingStars = ({ givenRatings, setGivenRatings, hover, setHover }) => {

    return (
        <>
            {[...Array(5)].map((star, index) => {

                const ratingValue = index + 1;

                return <label key={index} >
                    <input
                        className={styles.starInput}
                        type="radio"
                        name='rating'
                        value={ratingValue}
                        onClick={() => setGivenRatings(ratingValue)}
                    />
                    <a style={{ cursor: 'pointer' }}>
                        <StarRateIcon
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                            className={` ${ratingValue <= (hover || givenRatings) ? styles.starYellow : styles.starGray}`}
                        />
                    </a>
                </label>
            })}
        </>
    );
};

export default RatingStars;