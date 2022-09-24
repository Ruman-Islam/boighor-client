import React, { useState } from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import styles from '../../styles/BookDetail/BookDetail.module.css';

const ReportForm = () => {
    const [isCollapse, setIsCollapse] = useState(false);

    return (
        <div>
            <div className={styles.exclamationWrapper}>
                <button onClick={() => setIsCollapse(!isCollapse)} className={styles.exclamation}>
                    <ErrorOutlineIcon className={styles.exclamationIcon} />
                    <span> Report incorrect information</span>
                </button>
            </div>
            <form className={styles.reportBoxWrapper}>
                <div className={`${styles.formControl} ${isCollapse ? styles.heightFull : undefined}`}>
                    <textarea className={`${styles.reportBox} ${isCollapse ? styles.heightFull : undefined}`}
                        name="" id="" cols="75" rows="5"
                        placeholder='How can we make this page or product information more meaningful?'>

                    </textarea> <br />
                    <input className={styles.ReportSubmitBtn} type="submit" value="Submit" />
                </div>
            </form>
        </div>
    );
};

export default ReportForm;