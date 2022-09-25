/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import styles from '../../styles/Navbar/NavMiddle.module.css';
// import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { useForm } from "react-hook-form";
// import { Link } from 'react-router-dom';

const LoginDropdown = ({ loginWithGoogle }) => {
    // const { register, handleSubmit, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);

    return (
        <div className={styles.loginDropdown}>
            <p className={styles.loginDropdownHelpText}>Sign up with just one click</p>
            <div className={styles.login_dropdown_btn_group}>
                <button>
                    <FacebookOutlinedIcon />
                    <span>Facebook</span>
                </button>
                <button onClick={async () => await loginWithGoogle()}>
                    <GoogleIcon />
                    <span>Google</span>
                </button>
            </div>
            {/* <p className={styles.loginDropdownTitle}>Sign in with email</p>
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
            </form> */}
            {/* <a className={styles.forgot_pass_link}>Forgot Password?</a> */}
        </div>
    );
};

export default LoginDropdown;