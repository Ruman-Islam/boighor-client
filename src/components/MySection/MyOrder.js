/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line jsx-a11y/anchor-is-valid
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect, useState } from 'react';
import styles from '../../styles/MyOrder/MyOrders.module.css';
import fetcher from '../../api/axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebaseConfig';
import Swal from 'sweetalert2';

const MyOrder = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [user, ,] = useAuthState(auth);
    const [reFetcher, setReFetcher] = useState(false);


    useEffect(() => {
        (async () => {
            try {
                const { data: { result } } = await fetcher.get(`order/get_user_order?email=${user?.email}`)
                setMyOrders(result)
            } catch (error) {
                if (error.status === 404) {
                    setMyOrders([]);
                }
            }
        })()
    }, [user, reFetcher])

    const cancelOrder = async id => {
        try {
            const data = await fetcher.put(`order/cancel_order?email=${user?.email}&order_id=${id}`)
            if (data.status === 200) {
                setReFetcher(!reFetcher)
            }
        } catch (error) {

        }
    }

    const addTransaction = (order_id) => {
        Swal.fire({
            title: 'Submit your TransactionId',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            preConfirm: async (trans_id) => {
                const data = await fetcher.put(`order/update_order_transaction?trans_id=${trans_id}&order_id=${order_id}&email=${user?.email}`)
                return data;
            }
        })
            .then((result) => {
                if (result.value.status === 200) {
                    setReFetcher(!reFetcher)
                    Swal.fire({
                        title: `Thank you for the payment`
                    })
                } else {
                    Swal.fire({
                        title: `Something went wrong`
                    })
                }
            })
    }

    return (
        <section className={styles.main_content}>
            <div className={styles.my_orders}>
                <div className={styles.my_orders_heading}>
                    <div className={styles.my_orders_description}>
                        <h4>My Orders</h4>
                        <p>Your Total Order: {myOrders?.length}</p>
                    </div>
                </div>
            </div>

            {myOrders?.length > 0 ?
                myOrders?.map((order, index) => {

                    return (
                        <div key={index} className={styles.my_orders_card}>
                            <div className={styles.my_orders_card_wrapper}>
                                {order?.confirmation_status.includes("CANCELED") ||
                                    <div className={styles.my_orders_card_meta}>
                                        <p>Your Order ID: <em>{order?.order_id}</em> ({order?.products?.length} items) | {order?.payment_status}
                                            <br />
                                            Amount:
                                            <em>TK. 436</em>
                                        </p>
                                        {(order?.confirmation_status === "PROCESSING" ||
                                            order?.payment_status === "UNPAID") &&
                                            <a onClick={() => addTransaction(order?.order_id)}>Pay by TransactionId</a>}

                                    </div>}

                                <div className={styles.status}>
                                    <div>
                                        <span>{order?.confirmation_status}</span>
                                    </div>

                                    {order?.confirmation_status.includes('CANCELED') ||
                                        <div>
                                            {(order?.confirmation_status.includes('PROCESSING')
                                                && order?.payment_status === "UNPAID") &&
                                                <span onClick={() => cancelOrder(order?.order_id)} className={styles.cancel_btn}>CANCEL</span>}
                                            {order?.confirmation_status.includes('APPROVED') &&
                                                <span>{order?.delivery_status}</span>}
                                        </div>}

                                </div>

                                <div className={styles.order_card_content}>
                                    <div className={styles.row}>
                                        {order?.products?.map((pd, index) => {
                                            return (
                                                <div key={index} className={styles.col}>
                                                    <div className={styles.my_account_book}>
                                                        <figure className={styles.my_account_book_img}>
                                                            <img src={pd?.imgURL} alt="" />
                                                        </figure>
                                                        <p className={styles.my_account_book__title}>
                                                            {pd?.title}
                                                        </p>
                                                        <div className={styles.my_account_book__price}>
                                                            <p> TK. {pd?.sell_price} </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
                :
                <p>No data found</p>}

        </section>
    );
};

export default MyOrder;