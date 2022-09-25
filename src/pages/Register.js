/* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useEffect, useState } from 'react';
// import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
// import GoogleIcon from '@mui/icons-material/Google';
// import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { useForm } from "react-hook-form";
// import auth from '../firebase/firebaseConfig';
// import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import styles from '../styles/Login/Login.module.css';
// import { useLocation, useNavigate } from 'react-router-dom';
// import UseToken from '../hooks/UseToken';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import fetcher from '../api/axios';

const Register = () => {
    // const [signInWithGoogle, , ,] = useSignInWithGoogle(auth);
    // const { register, handleSubmit, watch, formState: { errors } } = useForm();
    // const [googleUser, ,] = useAuthState(auth);
    // const navigate = useNavigate();
    // const location = useLocation();
    // const from = location.state?.from?.pathname || "/";
    // const { token } = UseToken(googleUser);
    // const [registeredToken, setRegisteredToken] = useState("");
    // const [error, setError] = useState("");

    // useEffect(() => {
    //     if (token) navigate(from, { replace: true });
    // }, [from, token, navigate]);

    // useEffect(() => {
    //     if (registeredToken) {
    //         localStorage.setItem("accessToken", registeredToken);
    //         navigate(from, { replace: true })
    //     };
    // }, [registeredToken, from, navigate]);

    // // check password event 
    // const password = watch('password');

    // // handle password eye
    // const [passwordEye, setPasswordEye] = useState(false);
    // const handlePasswordClick = () => {
    //     setPasswordEye(!passwordEye);
    // };

    // // handle confirm password eye
    // const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
    // const handleConfirmPasswordClick = () => {
    //     setConfirmPasswordEye(!confirmPasswordEye);
    // };

    // const onSubmit = async data => {
    //     localStorage.setItem("email", data?.email);
    //     try {
    //         const { data: { accessToken } } = await fetcher.put('user/register_new_user', data)
    //         setRegisteredToken(accessToken);
    //     } catch (error) {
    //         if (error?.response?.status === 409) {
    //             setError(error?.response?.data?.result);
    //         }
    //     }
    // };

    return (
        <section className={styles.login}>
            {/* <div className={styles.loginInner}>
                <h1 style={{ textAlign: 'center' }}>SIGN UP</h1>
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
                    <p className={styles.loginDropdownHelpText}>OR</p>
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
                                type="text" autoComplete="false"
                                placeholder='Username'
                                {...register("user_name", {
                                    required: {
                                        value: true,
                                        message: 'Username is Required'
                                    }
                                })} />
                            <p className={styles.form_error}>{errors.username && errors.username?.message}</p>
                        </div>

                        <div className={styles.input_group}>
                            <div className={styles.input_group_prepend}>
                                <span>
                                    <EmailOutlinedIcon />
                                </span>
                            </div>
                            <input
                                type="email" autoComplete="false"
                                placeholder='Email'
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is Required'
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Provide valid email'
                                    }
                                })} />
                            <p className={styles.form_error}>{errors.email && errors.email?.message}</p>
                        </div>

                        <div className={styles.input_group}>
                            <div className={styles.input_group_prepend}>
                                <span>
                                    <LockOutlinedIcon />
                                </span>
                            </div>
                            <input
                                type={passwordEye === false ? "password" : "text"}
                                placeholder='Password' autoComplete="false"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Password is Required'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Must be characters or longer'
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                                        message: 'At least one letter, one number and one special character'
                                    }
                                })} />
                          
                            <div className={styles.eye_icon}>
                                {passwordEye === false ? (
                                    <VisibilityOffIcon onClick={handlePasswordClick} />
                                ) : (
                                    <VisibilityIcon onClick={handlePasswordClick} />
                                )}
                            </div>
                            <p className={styles.form_error}>{errors.password && errors.password?.message}</p>
                        </div>

                        <div className={styles.input_group}>
                            <div className={styles.input_group_prepend}>
                                <span>
                                    <LockOutlinedIcon />
                                </span>
                            </div>
                            <input
                                type={confirmPasswordEye === false ? "password" : "text"}
                                placeholder='Confirm password' autoComplete="false"
                                {...register("confirmPassword", {
                                    required: {
                                        value: true,
                                        message: 'Confirm password is Required'
                                    },
                                    validate: (value) =>
                                        value === password || "Passwords do not match",
                                })} />
                      
                            <div className={styles.eye_icon}>
                                {confirmPasswordEye === false ? (
                                    <VisibilityOffIcon onClick={handleConfirmPasswordClick} />
                                ) : (
                                    <VisibilityIcon onClick={handleConfirmPasswordClick} />
                                )}
                            </div>
                            <p className={styles.form_error}>{errors.confirmPassword && errors.confirmPassword?.message}</p>
                        </div>


                        <input className={styles.login_btn} type="submit" value={'Sign in'} />
                    </form>
                    <a className={styles.forgot_pass_link}>Forgot Password?</a>

                    <div className={styles.formFooter}>
                        <p><span>Already have an account?</span><span onClick={() => navigate('/login')}>Sign In</span></p>
                    </div>
                </div>
                <p className={styles.form_error}>{error}</p>
            </div> */}
        </section>
    );
};

export default Register;