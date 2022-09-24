import React from 'react';
import styles from '../../styles//BookDetail/BookDetail.module.css';
import TurnSlightLeftIcon from '@mui/icons-material/TurnSlightLeft';

const BookThumb = ({ title, img }) => {
    return (
        <div className={styles.imageContainer}>
            <div className={styles.imageInner}>
                <p>
                    <span>একটু পড়ে দেখুন</span> <TurnSlightLeftIcon />
                </p>
                {img && (
                    <img
                        className={styles.image}
                        width={240}
                        height={330}
                        src={img}
                        alt={title}
                    />
                )}
            </div>
        </div>
    );
};

export default BookThumb;