import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpdateRating } from '../../redux/book/updateRatingSlice';
import StarRateOutlinedIcon from '@mui/icons-material/StarRateOutlined';
import StarRateIcon from '@mui/icons-material/StarRate';
import Rating from 'react-rating';
import RatingStars from './RatingStars';
import styles from '../../styles/BookDetail/BookDetail.module.css';
import fetcher from '../../api/axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebaseConfig';
import { fetchAUser } from '../../redux/user/userSlice';

const ReviewRating = () => {
    const [googleUser, ,] = useAuthState(auth);
    const dispatch = useDispatch();
    const [isCollapse, setIsCollapse] = useState(false);
    const [givenRatings, setGivenRatings] = useState(null);
    const [hover, setHover] = useState(null);
    const { book, rating, totalRatings } = useSelector((state) => state?.bookDetailReducer);
    const { user } = useSelector((state) => state.userReducer)


    useEffect(() => {
        dispatch(fetchAUser(googleUser?.email))
    }, [googleUser])

    useEffect(() => {
        if (givenRatings) {
            dispatch(fetchUpdateRating({ id: book._id, rating: givenRatings }));
        }
    }, []);

    const submitReview = async (e) => {
        e.preventDefault();
        const review = {
            id: book._id,
            name: user?.user_name,
            review: e.target.review.value,
            date: new Date().toLocaleDateString(),
            // rating: givenRatings ? givenRatings : 0,
            imgURL: user?.photoURL,
        }
        try {
            const url = 'book/add_review_to_review'
            const result = await fetcher.put(url, review);
            if (result.status === 200) {
                setIsCollapse(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className={styles.ratingStatics}>
                <div>
                    <h3 className={styles.ratingStaticsTitle}>Reviews and Ratings</h3>
                    <div className={styles.ratingCount}>
                        <div>
                            <p>{rating ? rating : 0}</p>
                        </div>
                        <div className={styles.rating}>
                            <p>{totalRatings} Ratings and {book?.reviews?.length} Reviews</p>
                            <Rating
                                className={styles.star2}
                                initialRating={rating}
                                emptySymbol={<StarRateOutlinedIcon />}
                                fullSymbol={<StarRateIcon />}
                                readonly>
                            </Rating>
                        </div>
                    </div>
                </div>
                <div className={`${styles.addReviewBtnBox}
             ${isCollapse ? styles.addReviewBtnDisplayNone : undefined}`}>
                    <button onClick={() => setIsCollapse(!isCollapse)}
                        className={styles.addReviewBtn}>
                        Write a Review
                    </button>
                </div>
            </div>

            <div className={`${styles.formControl} ${isCollapse ? styles.heightFull : undefined}`}>
                <form onSubmit={submitReview} className={styles.reportBoxWrapper}>
                    <div>
                        <textarea className={`${styles.reportBox} ${styles.ratingPlaceholder}
                     ${isCollapse ? styles.heightFull : undefined}`}
                            name="review" id="" cols="100" rows="5"
                            placeholder='Please write your honest opinion and give a rating.'>

                        </textarea> <br />
                        <input className={styles.ReportSubmitBtn} type="submit" value="Submit" />
                    </div>
                </form>

                <div className={styles.ratingStars}>
                    <RatingStars
                        givenRatings={givenRatings}
                        setGivenRatings={setGivenRatings}
                        hover={hover}
                        setHover={setHover}
                    />
                </div>

            </div>
        </div>
    );
};

export default ReviewRating;