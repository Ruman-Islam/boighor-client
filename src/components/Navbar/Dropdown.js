import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Navbar/NavBottom.module.css';

const Dropdown = ({ props }) => {
    const [mostSoldBook, setMostSoldBook] = useState({});

    // FETCHING BESTSELLING BOOK
    useEffect(() => {
        fetch('https://boighor-server.vercel.app/api/v1/book/bestselling')
            .then(res => res.json())
            .then(({ result }) => {
                setMostSoldBook(result[0]);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    // .................................

    return (
        <div className={styles.megaBox}>
            <div className={styles.megaBoxContent}>
                <ul className={styles.megaLinks}>
                    {props?.length > 0 && props?.slice(0, 32)?.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link to="/">
                                    {item?._id}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <div className={styles.dropdownBookContainer}>
                    <div className={styles.dropdownBookInner}>
                        <div className={styles.ribbon}>
                            <span>Bestselling</span>
                        </div>
                        <Link to={`/BookDetail/${mostSoldBook?._id}`}>
                            <div className={styles.dropdownImg}>
                                {mostSoldBook?.imgURL && (
                                    <img
                                        src={mostSoldBook?.imgURL}
                                        alt="trending"
                                    />
                                )}
                            </div>
                        </Link>
                        <div className={styles.dropdownBookTextBox}>
                            <Link to="/">
                                {(mostSoldBook?.publisher)}
                            </Link>
                            <Link to={`/BookDetail/${mostSoldBook?._id}`}>
                                {(mostSoldBook?.title)}
                            </Link>
                            {!!mostSoldBook &&
                                <p className={styles.dropdownBookPrice}>
                                    {mostSoldBook?.sell_price}
                                </p>}
                            <div>
                                {!!mostSoldBook?.original_price &&
                                    <small>
                                        {mostSoldBook?.original_price}
                                    </small>}
                                {!!mostSoldBook?.current_discount &&
                                    <div><span>- {mostSoldBook?.current_discount}%</span></div>}
                            </div>
                        </div>
                    </div>
                </div>
                {/* {props?.length > 32 && <Link href="/"><a className={styles.seeMoreBtn}>See More...</a></Link>} */}
            </div>
        </div>
    );
};

export default Dropdown;