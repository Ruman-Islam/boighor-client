/* eslint-disable jsx-a11y/anchor-is-valid */
// import { useForm } from "react-hook-form";
// import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useEffect } from 'react';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import auth from '../firebase/firebaseConfig';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import styles from '../styles/Login/Login.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import UseToken from '../hooks/UseToken';

const Login = () => {
    // const { register, handleSubmit, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);
    const [signInWithGoogle, , ,] = useSignInWithGoogle(auth);
    const [googleUser, ,] = useAuthState(auth);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const { token } = UseToken(googleUser);


    useEffect(() => {
        if (token) navigate(from, { replace: true });
    }, [from, token, navigate]);


    return (
        <section className={styles.login}>
            <div className={styles.loginInner}>
                <h1 style={{ textAlign: 'center' }}>SIGN IN</h1>
                <div className={styles.loginDropdown}>
                    <p className={styles.loginDropdownHelpText}>Login easily with your facebook or google account</p>
                    <div className={styles.login_dropdown_btn_group}>
                        <button>
                            <FacebookOutlinedIcon />
                            <span>Facebook</span>
                        </button>
                        <button onClick={async () => await signInWithGoogle()}>
                            <GoogleIcon />
                            <span>Google</span>
                        </button>
                    </div>
                    {/* <p className={styles.loginDropdownHelpText}>OR</p>
                    <p className={styles.loginDropdownHelpText}>Sign in with email</p>
                    <form onSubmit={handleSubmit(onSubmit)}
                        className={styles.loginForm}>

                        <div className={styles.input_group}>
                            <div className={styles.input_group_prepend}>
                                <span>
                                    <EmailOutlinedIcon />
                                </span>
                            </div>
                            <input
                                placeholder='Email or phone'
                                {...register("exampleRequired", { required: true })} />
                            {errors.exampleRequired && <span>This field is required</span>}
                        </div>

                        <div className={styles.input_group}>
                            <div className={styles.input_group_prepend}>
                                <span>
                                    <LockOutlinedIcon />
                                </span>
                            </div>
                            <input
                                placeholder='Password'
                                {...register("exampleRequired", { required: true })} />
                            {errors.exampleRequired && <span>This field is required</span>}
                        </div>


                        <input className={styles.login_btn} type="submit" value={'Sign in'} />
                    </form>
                    <a className={styles.forgot_pass_link}>Forgot Password?</a>

                    <div className={styles.formFooter}>
                        <p><span>Don’t have an account?</span><span onClick={() => navigate('/register')}>Sign Up Now!</span></p>
                    </div> */}
                </div>
            </div>
        </section>
    );
};

export default Login;