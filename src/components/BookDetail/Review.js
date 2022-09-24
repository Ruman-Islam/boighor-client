/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Rating from 'react-rating';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarRateOutlinedIcon from '@mui/icons-material/StarRateOutlined';
import styles from '../../styles/BookDetail/BookDetail.module.css';

const Review = ({ rv }) => {
    const [expanded, setExpanded] = useState((rv.review.length > 500 ? true : false));
    const dataForDisplay = expanded ? rv.review.slice(0, 500) : rv.review;

    return (
        <div className={styles.reviewBox}>
            <div className={styles.reviewHeader}>
                {rv.imgURL &&
                    <img
                        src={rv.imgURL}
                        alt='' />
                }
                <div style={{ marginLeft: '1rem' }}>
                    <p>{rv?.name}, <span style={{ color: 'gray' }}>{rv.date}</span></p>
                    <Rating
                        className={styles.star3}
                        initialRating={rv.rating}
                        emptySymbol={<StarRateOutlinedIcon />}
                        fullSymbol={<StarRateIcon />}
                        readonly>
                    </Rating>
                </div>
            </div>
            <div className={styles.reviewBody}>
                {expanded ? <p>{dataForDisplay}...</p> : <p>{dataForDisplay}</p>}
                {rv.review.length > 500 && <a onClick={() => setExpanded(!expanded)}>
                    {expanded ? 'Show More' : 'Show Less'}
                </a>}

            </div>
        </div>
    );
};

export default Review;