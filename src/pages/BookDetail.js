import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/BookDetail/BookDetail.module.css';
import BasicDetail from '../components/BookDetail/BasicDetail';
import { fetchABook } from '../redux/book/bookDetailSlice';
import AdditionalInfo from '../components/BookDetail/AdditionalInfo';
import FloatingCart from '../components/BookDetail/FloatingCart';
import { clearSearchedBooks } from '../redux/book/storeBooksSlice';

const BookDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { isLoading, book, error, rating } = useSelector((state) => state?.bookDetailReducer);

    // FETCHING DATA
    useEffect(() => {
        if (id) {
            dispatch(fetchABook(id));
        }
        dispatch(clearSearchedBooks());
    }, [id]);

    return (
        <section>
            <div className={styles.bookDetailWrapper}>
                <div className='box-container'>
                    <div className={styles.bookDetail}>
                        <BasicDetail
                            rating={rating}
                            book={book} />
                        <AdditionalInfo book={book} />
                    </div>
                    <FloatingCart />
                </div>
            </div>
        </section>
    );
};

export default BookDetail;