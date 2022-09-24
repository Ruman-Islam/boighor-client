import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';
import auth from '../../firebase/firebaseConfig';
import { fetchAUser } from '../../redux/user/userSlice';
import styles from '../../styles/MySection/Profile.module.css';

const Profile = () => {
    const [nameDisabled, setNameDisabled] = useState(true);
    const [emailDisabled, setEmailDisabled] = useState(true);
    const [photoDisabled, setPhotoDisabled] = useState(true);
    const [passwordDisabled, setPasswordDisabled] = useState(true);
    const [googleUser, ,] = useAuthState(auth);
    const dispatch = useDispatch();
    const { user, isLoading } = useSelector((state) => state.userReducer);

    useEffect(() => {
        if (user) {
            dispatch(fetchAUser(googleUser?.email))
        }
    }, [googleUser?.email, dispatch]);

    return (
        <section className={styles.profile}>
            <div className={styles.heading}>
                <span className={styles.span1}>Personal Information</span>
                {!!nameDisabled &&
                    <span className={styles.span2}
                        onClick={() => setNameDisabled(!nameDisabled)}>
                        Change Information
                    </span>}
            </div>
            <form className={styles.first_form}>
                <div className={styles.form_group}>
                    <div className={styles.form_row}>
                        <div className={styles.form_col}>
                            <label htmlFor="">Name</label>
                            <input type="text" name="name" id=""
                                defaultValue={user?.user_name} disabled={nameDisabled} />
                        </div>
                    </div>
                </div>
                <div className={styles.form_group}>
                    <div className={styles.label}>
                        <label htmlFor="">Gender</label>
                    </div>
                    <div className={styles.custom_radio}>
                        <input type="radio" value="Male" name="gender"
                            id="male" defaultChecked={true} disabled={nameDisabled} />
                        <label htmlFor="male">Male</label>
                    </div>
                    <div className={styles.custom_radio}>
                        <input type="radio" value="Female" name="gender"
                            id="female" defaultChecked={user?.gender === "female"} disabled={nameDisabled} />
                        <label htmlFor="female">Female</label>
                    </div>
                    {!nameDisabled && <input className={styles.name_submit} type="submit" value="Save" />}
                </div>
            </form>

            <div className={styles.heading}>
                <span className={styles.span1}>Email Address</span>
                {!!emailDisabled &&
                    <span className={styles.span2}
                        onClick={() => setEmailDisabled(!emailDisabled)}>
                        Change Email Address
                    </span>}
            </div>
            <form className={styles.second_form}>
                <div className={styles.form_row}>
                    <div className={styles.form_col}>
                        <input type="email" name="email" id="" defaultValue={user?.email} disabled={emailDisabled} />
                    </div>
                </div>
                {!emailDisabled && <input className={styles.name_submit} type="submit" value="Save" />}
            </form>

            <div className={styles.heading}>
                <span className={styles.span1}>Profile Picture</span>
                {!!photoDisabled &&
                    <span className={styles.span2}
                        onClick={() => setPhotoDisabled(!photoDisabled)}>
                        Change Profile Picture
                    </span>}
            </div>
            <form className={styles.second_form}>
                <p>Your Profile Photo</p>
                <img src={user?.photoURL} alt="" />
                <br />
                {!photoDisabled && <input type="file" disabled={photoDisabled} />}
                {!photoDisabled && <input className={styles.name_submit} type="submit" value="Submit" />}
            </form>

            <div className={styles.heading}>
                <span className={styles.span1}>Password</span>
                {!!passwordDisabled &&
                    <span className={styles.span2}
                        onClick={() => setPasswordDisabled(!passwordDisabled)}>
                        Add Password
                    </span>}
            </div>
            <form className={styles.second_form}>
                {!passwordDisabled &&
                    <div className={styles.password_box}>
                        <div>
                            <label>Password</label>
                            <input type="password" name='password' disabled={passwordDisabled} />
                        </div>
                        <div>
                            <label>Confirm</label>
                            <input type="password" name='confirm' disabled={passwordDisabled} />
                        </div>
                    </div>}
                {!passwordDisabled && <input className={styles.name_submit} type="submit" value="Submit" />}
            </form>
        </section>
    );
};

export default Profile;