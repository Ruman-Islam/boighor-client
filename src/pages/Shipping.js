import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import fetcher from '../api/axios';
import Calculation from '../components/Cart/Calculation';
import auth from '../firebase/firebaseConfig';
import useCart from '../hooks/UseCart';
import styles from '../styles/Shipping/Shipping.module.css';
import { fetchAUser } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { deleteShoppingCart } from '../Utils/shopping_cart';

const Shipping = () => {

    const navigate = useNavigate();
    const [googleUser, ,] = useAuthState(auth);
    const { user } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [items, setItems] = useState([]);
    const [cart, setCart] = useCart(items);

    useEffect(() => {
        dispatch(fetchAUser(googleUser?.email))
        const savedItems = [];
        const cartItems = localStorage.getItem('shopping-cart')
        for (const item in JSON.parse(cartItems)) {
            savedItems.push(item)
        }
        (async () => {
            try {
                const { data: { result } } = await fetcher.post("book/get_cart_item", { "ids": savedItems });
                setItems(result);
            } catch (error) {
                console.log(error);
            }
        })()
    }, []);


    const onSubmit = async data => {

        // Calculation
        let totalPrice = 0;
        for (const product of cart) {
            totalPrice += product.sell_price * product.quantity;
        }
        const tax = parseFloat((totalPrice * 0.05).toFixed(2))
        const grandTotal = totalPrice + tax;

        const order = {
            user_name: data?.username,
            email: user?.email,
            phone: data?.phone,
            order: {
                order_id: Math.floor(Math.random() * 5236987456454546),
                products: cart,
                delivery_status: "PENDING",
                confirmation_status: "PROCESSING",
                payment_status: "UNPAID",
                payment_method: data?.payment,
                amount: grandTotal,
            },
        }

        try {
            const result = await fetcher.put("order/put_order", order)
            if (result.status === 200) {
                deleteShoppingCart();
                navigate('/my-section/orders');
            }
        } catch (error) {
            console.log(error)
        }

    };


    return (
        <div className={`${styles.shipping} box-container`}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.content_wrapper_shipping}>
                    <div className={styles.shipping_content}>
                        <div className={styles.shipping_header}>
                            <h3>Shipping Address</h3><span>(Please Fill Out Your Information)</span>
                        </div>
                        <div className={styles.shipping_body}>
                            <div className={styles.shipping_form}>
                                <fieldset>
                                    <input
                                        {...register("username", {
                                            required: {
                                                value: true,
                                                message: 'Username is Required'
                                            }
                                        })} />
                                    {errors.username && errors.username?.message}
                                    <label>Name</label>
                                </fieldset>
                                <div className={styles.phone_box}>
                                    <fieldset>
                                        <input
                                            {...register("phone", {
                                                required: {
                                                    value: true,
                                                    message: 'Phone no is Required'
                                                }
                                            })} />
                                        <label>Phone No</label>
                                        {errors.phone && errors.phone?.message}
                                    </fieldset>
                                    <fieldset>
                                        <input
                                            placeholder='Alternative Phone No'
                                            {...register("alternative_phone")} />
                                    </fieldset>
                                </div>
                                <div className={styles.address_box}>
                                    <fieldset>
                                        <textarea
                                            {...register("address", {
                                                required: {
                                                    value: true,
                                                    message: 'Address no is Required'
                                                }
                                            })}
                                            cols="10" rows="0">
                                        </textarea>
                                        {errors.address && errors.address?.message}
                                        <label>Address</label>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.content_wrapper_payment}>
                    <div className={styles.shipping_content}>
                        <div className={styles.shipping_header}>
                            <h3>Payment Method</h3><span> (Please select only one! payment method)</span>
                        </div>
                        <div className={styles.shipping_body}>
                            <div className={styles.shipping_form}>
                                <div className={styles.cash_on_delivery}>
                                    <input className={styles.form_check_input}
                                        {...register("payment",
                                            {
                                                required: {
                                                    value: true,
                                                    message: 'Payment method  is Required'
                                                }
                                            })}
                                        type="radio"
                                        value="cod"
                                        id="cod" />
                                    <label htmlFor="cod">
                                        <span>Cash on Delivery</span>
                                    </label>
                                    {errors.payment && errors.payment?.message}
                                </div>
                                <div className={styles.cash_on_delivery}>
                                    <input className={styles.form_check_input}
                                        {...register("payment",
                                            {
                                                required: {
                                                    value: true,
                                                    message: 'Payment method  is Required'
                                                }
                                            })}
                                        type="radio"
                                        value="bkash"
                                        id="bkash" />
                                    <label htmlFor="bkash">
                                        <span>Bkash</span>
                                    </label>
                                    {errors.payment && errors.payment?.message}
                                </div>
                            </div>
                        </div>
                        <div className={styles.confirm_btn}>
                            <div>
                                <input type="submit" value="Submit" />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <Calculation cart={cart} />
        </div>
    );
};

export default Shipping;