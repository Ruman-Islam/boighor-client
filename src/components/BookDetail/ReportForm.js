import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import styles from '../../styles/BookDetail/BookDetail.module.css';
import auth from '../../firebase/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import fetcher from '../../api/axios';

const ReportForm = () => {
    const [googleUser, ,] = useAuthState(auth);
    const [isCollapse, setIsCollapse] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState("")


    const onSubmit = async data => {
        const report = {
            user_email: googleUser?.email,
            user_name: googleUser?.displayName,
            message: data?.address
        }

        try {
            const result = await fetcher.put("report/post_a_report", report)
            if (result.status === 200) {
                setMessage(result.data.result);
            }
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <div>
            <div className={styles.exclamationWrapper}>
                <button onClick={() => setIsCollapse(!isCollapse)} className={styles.exclamation}>
                    <ErrorOutlineIcon className={styles.exclamationIcon} />
                    <span> Report incorrect information or book request</span>
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.reportBoxWrapper}>
                <div className={`${styles.formControl} ${isCollapse ? styles.heightFull : undefined}`}>
                    <textarea className={`${styles.reportBox} ${isCollapse ? styles.heightFull : undefined}`}
                        {...register("address", {
                            required: {
                                value: true,
                                message: 'Message is Required'
                            }
                        })}
                        cols="75" rows="5"
                        placeholder='বইয়ের রিকুয়েস্ট করতে চাইলে বইয়ের নামটি লিখুন। 
                        অথবা বইয়ের কোন তথ্য ভুল থাকলে সঠিক তথ্যটি লিখুন বইয়ের নামসহ।'>

                    </textarea>
                    <br />
                    {errors.address && errors.address?.message}
                    {message && message}
                    <input className={styles.ReportSubmitBtn} type="submit" value="Submit" />
                </div>
            </form>
        </div>
    );
};

export default ReportForm;