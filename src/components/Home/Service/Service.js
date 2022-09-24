import React from 'react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HeadsetIcon from '@mui/icons-material/Headset';
import img1 from '../../../assets/images/img1-top-smartbooks1.webp';
import img2 from '../../../assets/images/img2-top-smartbooks1.webp';
import '../../../styles/Home/Service/Service.css';
import { Link } from 'react-router-dom';

const Service = () => {
    const styles = {
        width: '40px',
        height: '40px',
    }

    return (
        <div className='service-wrapper box-container'>
            <div className="service-upper">
                <div className="service-box">
                    <div>
                        <LocalShippingIcon style={styles} />
                    </div>
                    <div>
                        <p>Free Shipping Item</p>
                        <p>Orders over $500</p>
                    </div>
                </div>
                <div className="service-box">
                    <div>
                        <RotateRightIcon style={styles} />
                    </div>
                    <div>
                        <p>Money Back Guarantee</p>
                        <p>100% money back</p>
                    </div>
                </div>
                <div className="service-box">
                    <div>
                        <CreditCardIcon style={styles} />
                    </div>
                    <div>
                        <p>Cash On Delivery</p>
                        <p>Take product give money</p>
                    </div>
                </div>
                <div className="service-box">
                    <div>
                        <HeadsetIcon style={styles} />
                    </div>
                    <div>
                        <p>Help &amp; Support</p>
                        <p>Call us : + 0123.4567.89</p>
                    </div>
                </div>
            </div>
            <div className="service-lower">
                {/* <div className="advertise-box">
                <Image src={img1} alt="" />
            </div>
            <div className="advertise-box">
                <Link href='/'>
                    <a><Image src={img2} alt="" /></a>
                </Link>
            </div> */}
                <Link to='/'>
                    <img src={img1} alt="" />
                </Link>
                <Link to='/'>
                    <img src={img2} alt="" />
                </Link>
            </div>
        </div>
    );
};

export default Service;