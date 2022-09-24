import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Footer/Footer.module.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';

const FooterTop = () => {

    return (
        <div className={`${styles.footerTopWrapper} box-container`}>
            <div className={styles.footerTopInner}>
                <div>
                    <Link className={styles.logo} to="/">
                        <span>BOI</span> <span>GHOR</span>
                    </Link>
                    <p>We are a team of designers and developers who creates high quality premium MERN themes.</p>
                    <p><strong>Address:</strong> 3/1, Banasree, Dhaka</p>
                    <p><strong>Call Us:</strong> (012) 800 456 789</p>
                    <p><strong>Mail us:</strong> support@rumanislam48.com</p>
                </div>
                <div>
                    <h6>MAIN MENU</h6>
                    <div>
                        <p>
                            <Link to="/">
                                Home
                            </Link>
                        </p>
                        <p>
                            <Link to="/">
                                Catalog
                            </Link>
                        </p>
                        <p>
                            <Link to="/">
                                Specials
                            </Link>
                        </p>
                        <p>
                            <Link to="/">
                                Pages
                            </Link>
                        </p>
                        <p>
                            <Link to="/">
                                Product Pages
                            </Link>
                        </p>
                    </div>
                </div>
                <div>
                    <h6>MAIN MENU</h6>
                    <div>
                        <p>
                            <Link to="/">
                                Home
                            </Link>
                        </p>
                        <p>
                            <Link to="/">
                                Catalog
                            </Link>
                        </p>
                        <p>
                            <Link to="/">
                                Specials
                            </Link>
                        </p>
                        <p>
                            <Link to="/">
                                Pages
                            </Link>
                        </p>
                        <p>
                            <Link to="/">
                                Product Pages
                            </Link>
                        </p>
                    </div>
                </div>
                <div>
                    <h6>JOIN OUR NEWSLETTER NOW</h6>
                    <div>
                        <input type="text" placeholder='Enter your email address here...' />
                        <button>Subscribe</button>
                    </div>
                    <div>
                        <p>STAY CONNECTED</p>
                        <div className={styles.socialIcons}>
                            <Link to="/">
                                <FacebookIcon className={styles.socialIcon} />
                            </Link>
                            <Link to="/">
                                <TwitterIcon className={styles.socialIcon} />
                            </Link>
                            <Link to="/">
                                <GoogleIcon className={styles.socialIcon} />
                            </Link>
                            <Link to="/">
                                <InstagramIcon className={styles.socialIcon} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterTop;