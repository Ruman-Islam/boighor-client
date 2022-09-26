import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import fetcher from '../../api/axios';
import auth from '../../firebase/firebaseConfig';
import styles from '../../styles/MyOrder/MyOrders.module.css';
import styles2 from '../../styles/BookDetail/BookDetail.module.css';

const Report = () => {
    const [googleUser, ,] = useAuthState(auth);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState("")


    const onSubmit = async data => {

        const report = {
            user_email: googleUser?.email,
            user_name: googleUser?.displayName,
            message: data?.message
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
        <div className={styles.my_orders_card}>
            <div className={styles.my_orders_card_wrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <textarea
                        {...register("message", {
                            required: {
                                value: true,
                                message: 'Message is Required'
                            }
                        })}
                        style={{ resize: 'none' }}
                        cols="120" rows="10"
                        placeholder='আপনার মূল্যবান মতামত আথবা কোন ধরনের অসংগত কারন থাকলে আমাদেরকে বিস্তারিত লিখে জানাবেন।'
                    >

                    </textarea>
                    {errors.message && errors.message?.message}
                    {message && message}
                    <input className={styles2.ReportSubmitBtn} type="submit" value="Submit" />
                </form>
            </div>

            <br />
            <br />
            <br />
        </div>
    );
};

export default Report;