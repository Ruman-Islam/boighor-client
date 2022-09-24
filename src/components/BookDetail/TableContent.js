import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/BookDetail/BookDetail.module.css';
import { Link } from 'react-router-dom';


const TableContent = ({ activeTab, setActiveTab, book }) => {
    const [author, setAuthor] = useState({});

    useEffect(() => {
        if (book?.author) {
            (async () => {
                const { data: { result } } = await axios.get(`http://localhost:5000/api/v1/author?query=${book?.author}`)
                setAuthor(result);
            })()
        }
    }, [book?.author]);

    return (
        <div className={styles.additionalInfoContent}>

            <ul className={styles.navTabs}>
                <li onClick={() => setActiveTab('summary')} className={styles.navItem}>
                    <span className={`${styles.navLink}
                         ${activeTab.includes('summary') ? styles.navLinkActive : undefined}`}>
                        Summary
                    </span>
                </li>
                <li onClick={() => setActiveTab('specification')} className={styles.navItem}>
                    <span className={`${styles.navLink}
                     ${activeTab.includes('specification') ? styles.navLinkActive : undefined}`}>
                        Specification
                    </span>
                </li>
                <li onClick={() => setActiveTab('author')} className={styles.navItem}>
                    <span className={`${styles.navLink}
                         ${activeTab.includes('author') ? styles.navLinkActive : undefined}`}>
                        Author
                    </span>
                </li>
            </ul>

            <div className={styles.additionalContent}>
                <div className={`${styles.summary}
                     ${activeTab.includes('summary') ? styles.fade : undefined}`}>
                    <div className={styles.summaryInner}>
                        <p>{book?.summary}</p>
                    </div>
                </div>
                <div className={`${styles.specification}
                    ${activeTab.includes('specification') ? styles.fade : undefined}`}>
                    <table className={`${styles.table} ${styles.tableBordered}`}>
                        <tbody className={styles.tbody}>
                            <tr className={styles.tr}>
                                <td className={styles.td}>Title</td>
                                <td className={styles.td}>{book?.title}</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}>Author</td>
                                <td className={styles.td}>
                                    <Link to={`/`}>
                                        {book?.author}
                                    </Link>
                                </td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}>Publisher</td>
                                <td className={styles.td}>
                                    <Link to={`/`}>
                                        {book?.publisher}
                                    </Link>
                                </td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}>ISBN</td>
                                <td className={styles.td}>{book?.ISBN}</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}>Edition</td>
                                <td className={styles.td}>{book?.edition}</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}>Number of Pages</td>
                                <td className={styles.td}>{book?.page_length}</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}>Country</td>
                                <td className={styles.td}>{book?.country}</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}>Language</td>
                                <td className={styles.td}>{book?.language}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={`${styles.authorInfo}
                      ${activeTab.includes('author') ? styles.fade : undefined}`}>
                    <div className={styles.authorDesWrapper}>
                        <div className={styles.authorDesInner}>
                            <div className={styles.authorImage}>
                                {author?.imgURL &&
                                    <img
                                        width={150}
                                        height={150}
                                        src={author?.imgURL}
                                        alt="" />
                                }
                            </div>
                            <div className={styles.authorDes}>
                                <h3>{author?.name}</h3>
                                <p>{author?.author_des}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TableContent;