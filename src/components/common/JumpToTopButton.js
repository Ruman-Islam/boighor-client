import React from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import UseJumpToTop from '../../hooks/UseJumpToTop';
import styles from '../../styles/Common/JumpToTopButton.module.css';

const JumpToTopButton = () => {
    const { distance } = UseJumpToTop();

    const goToTop = () => {
        window.scrollTo(0, 0);
    }
    return (
        <div
            onClick={() => goToTop()}
            className={`${styles.scrollUpBtn} ${distance >= 2000 ? styles.scrollUpBtnShow : undefined}`}>
            <ExpandLessIcon
                type='button' />
        </div>
    );
};

export default JumpToTopButton;