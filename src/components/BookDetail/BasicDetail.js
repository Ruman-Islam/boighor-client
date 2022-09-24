import styles from '../../styles/BookDetail/BookDetail.module.css';
import BookThumb from './BookThumb';
import BasicInfo from './BasicInfo';
import ExtraInfo from './ExtraInfo';

const BasicDetail = ({ book, rating }) => {
    return (
        <section className={styles.basicDetail}>
            <div className={styles.basicInfo}>
                <BookThumb img={book?.imgURL} title={book?.title} />
                <BasicInfo book={book} rating={rating} />
            </div>
            <ExtraInfo book={book} />
        </section>
    );
};

export default BasicDetail;