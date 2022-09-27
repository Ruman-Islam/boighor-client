import React, { useEffect, useState } from 'react';
import fetcher from '../api/axios';
import Calculation from '../components/Cart/Calculation';
import ItemContainer from '../components/Cart/ItemContainer';
import useCart from '../hooks/UseCart';
import styles from '../styles/Cart/Cart.module.css';

const Cart = () => {
    const [items, setItems] = useState([])
    const [cart, setCart] = useCart(items);
    const [totalPrice, setTotalPrice] = useState(0);


    useEffect(() => {
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
    }, [])

    return (
        <section className={`${styles.cart} box-container`}>
            <ItemContainer cart={cart} setCart={setCart} totalPrice={totalPrice} />
            <Calculation cart={cart} setCart={setCart} setTotalPrice={setTotalPrice} />
        </section>
    );
};

export default Cart;