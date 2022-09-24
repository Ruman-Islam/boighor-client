import React from 'react';
import styles from '../../../styles/Home/HomeProduct1/HomeProduct1.module.css';

const SectionNav = ({ active, setActive, setUrl }) => {
    return (
        <div className={styles.navBtnWrapper}>
            <ul className={styles.btnContainer}>
                <li onClick={() => setActive('featured') + setUrl('/featured')}
                    className={`${styles.homeProductSection1BtnWrapper}
             ${active.includes('featured') ? styles.activeBox : styles.normalBox}`}>
                    <button>
                        Featured Products
                    </button>
                    {active.includes('featured') &&
                        <div className={styles.downArrow}>
                            <div></div>
                        </div>}
                </li>

                <li onClick={() => setActive('new') + setUrl('/new')}
                    className={`${styles.homeProductSection1BtnWrapper}
             ${active.includes('new') ? styles.activeBox : styles.normalBox}`}>
                    <button>
                        New Arrivals
                    </button>
                    {active.includes('new') &&
                        <div className={styles.downArrow}>
                            <div></div>
                        </div>}
                </li>

                <li onClick={() => setActive('most') + setUrl('/featured')}
                    className={`${styles.homeProductSection1BtnWrapper}
             ${active.includes('most') ? styles.activeBox : styles.normalBox}`}>
                    <button>
                        Most Viewed
                    </button>
                    {active.includes('most') &&
                        <div className={styles.downArrow}>
                            <div></div>
                        </div>}
                </li>

            </ul>
        </div>
    );
};

export default SectionNav;