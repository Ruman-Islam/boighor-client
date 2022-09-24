/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from "react-hook-form";
import auth from '../firebase/firebaseConfig';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import styles from '../styles/Login/Login.module.css';

const Login = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

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
                        <p><span>Don’t have an account?</span><span>Sign Up Now!</span></p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;