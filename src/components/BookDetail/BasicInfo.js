/* eslint-disable jsx-a11y/anchor-is-valid */
import Rating from 'react-rating';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import StarRateIcon from '@mui/icons-material/StarRate';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarRateOutlinedIcon from '@mui/icons-material/StarRateOutlined';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import likeIcon from '../../assets/images/like-svgrepo-com.svg'
import heartIcon from '../../assets/images/heart-outline-svgrepo-com.svg';
import styles from '../../styles/BookDetail/BookDetail.module.css';
import { addToLocalStorage } from '../../Utils/shopping_cart';

const BasicInfo = ({ rating, book }) => {

    const addToCart = (book) => {
        // const order = {
        //     user_name: user?.displayName,
        //     email: user?.email,
        //     products: [
        //         { product_id: book?._id, price: book?.sell_price, status: 'pending' }
        //     ]
        // }
        // console.log(order);
        addToLocalStorage(book?._id)
        Swal.fire('Your book was added to cart')
    }

    return (
        <div className={styles.basicInfoContainer}>
            <div className={styles.basicInfoInner}>
                <h1 className={styles.title}>
                    {book?.title} <span>({book?.copy_version})</span>
                </h1>
                <p className={styles.author}>
                    <span>by </span>
                    <Link to='/'>
                        {book?.author?.length > 135 ?
                            `${book?.author?.slice(0, 132)}...` :
                            book?.author}
                    </Link>
                </p>
                <p className={styles.category}>
                    <span>Category:</span>
                    <Link to='/'>
                        {book?.category > 50 ?
                            `${book?.category?.slice(0, 132)}...` :
                            book?.category}
                    </Link>
                </p>
                <p className={styles.rating}>
                    <Rating
                        className={styles.star}
                        initialRating={rating ? rating : 0}
                        emptySymbol={<StarRateOutlinedIcon />}
                        fullSymbol={<StarRateIcon />}
                        readonly>
                    </Rating>
                    <span className={styles.starText}>
                        {rating ? rating : 0}
                        <Link to='/'>
                            / {book?.reviews?.length} Reviews
                        </Link>
                    </span>
                </p>
                <p className={styles.price}>
                    {!!book?.original_price &&
                        <span className={styles.original_price}>TK. {book?.original_price}</span>
                    }
                    {!!book?.sell_price &&
                        <span className={styles.sell_price}>TK.{book?.sell_price}</span>
                    }
                    {!!book?.original_price &&
                        <span className={styles.savings}>You Save TK. 21 (14%)</span>
                    }
                </p>
                {!!book?.quantity <= 0 ?
                    <p className={styles.outStock}>
                        <RadioButtonUncheckedIcon className={styles.crossSign} />
                        <span> Out of Stock</span> <br />
                        <span className={styles.requestText}> আপনার অনুরোধের বইটা সাপ্লাইয়ারের নিকট থেকে সংগ্রহ করে আনতে আমাদের ৩০ থেকে ৬০ কর্মদিবস সময় লেগে যেতে পারে। আপনার পক্ষে এত সময় অপেক্ষা করা সম্ভব হলে, অর্ডার করার অনুরোধ জানাচ্ছি।</span>
                    </p> :
                    <p className={styles.inStock}>
                        <CheckCircleIcon className={styles.rightSign} />
                        <span> In Stock</span>
                        <span className={styles.availabilityWarning}> (only {book?.quantity}
                            {!book?.quantity <= 1 ? ' copies' : ' copy'} available)
                        </span>
                    </p>}
                {!!book?.quantity &&
                    <p className={styles.stockWarning}>* স্টক আউট হওয়ার আগেই অর্ডার করুন</p>}
                {!!book?.offers === '' &&
                    <div className={styles.offers}>
                        <span>Offers:</span>
                        <select defaultValue={0}>
                            {book?.offers?.map((offer, index) => {
                                return (
                                    <option className={styles.option}
                                        key={index} value={offer}>
                                        {offer}
                                    </option>
                                )
                            })}
                        </select>
                    </div>}
                {!!book?.quantity ?
                    <>
                        <div className={styles.actionBtnContainer}>
                            {/* <Link to="/" className={styles.detailLookBtn}>একটু পড়ে দেখুন</Link> */}
                            <a onClick={() => addToCart(book)} className={styles.addToCartBtn}>
                                <ShoppingCartIcon />
                                <span> Add to Cart</span>
                            </a>
                        </div>
                        <div className={styles.actionBtnContainer2}>
                            {/* <Link to="/" className={styles.detailLookBtn2}>একটু পড়ে দেখুন</Link> */}
                            <a onClick={() => addToCart(book)} className={styles.addToCartBtn2}>
                                <span> Add to Cart</span>
                            </a>
                        </div>
                    </> :
                    <>
                        <div className={styles.actionBtnContainer}>
                            {/* <Link to="/" className={styles.detailLookBtn}>একটু পড়ে দেখুন</Link> */}
                            <a className={styles.addToCartBtn} style={{ backgroundColor: '#0397D3', cursor: 'default' }}>
                                <span>নিচে স্ক্রল করে রিকুয়েস্ট করুন</span>
                            </a>
                        </div>
                    </>}
                {/* <div className={styles.wishListBox}>
                    <div>
                        <Link to="/" className={styles.addToWishBtn}>
                            <img width={15} height={15} src={heartIcon} alt="" />
                            <span> Add to Booklist</span>
                        </Link>
                    </div>
                    <div>
                        <Link to="/" className={styles.addToWishBtn}>
                            <img width={20} height={20} src={likeIcon} alt="" />
                            <span> Recommend This Book</span>
                        </Link>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default BasicInfo;