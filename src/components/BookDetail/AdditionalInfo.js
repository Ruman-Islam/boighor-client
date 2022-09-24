import React, { useState } from 'react';
import Review from './Review';
import ReportForm from './ReportForm';
import ReviewRating from './ReviewRating';
import TableContent from './TableContent';
import styles from '../../styles/BookDetail/BookDetail.module.css';


const AdditionalInfo = ({ book }) => {
    const [activeTab, setActiveTab] = useState('summary');

    return (
        <div className={styles.additionalInfo}>
            <div className={styles.additionalInfoInner}>
                <div className={styles.additionalInfoHeader}>
                    <h3>Product Specification &amp; Summary</h3>
                </div>
                <TableContent
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    book={book}
                />
                <ReportForm />
            </div>
            <ReviewRating book={book} />
            <div className={styles.reviewsContainer}>
                {book?.reviews?.map((rv, index) => {
                    return <Review key={index} rv={rv} />
                })}
            </div>
        </div>
    );
};

export default AdditionalInfo;