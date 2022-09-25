import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../styles/Cart/Cart.module.css';
import { deleteShoppingCart } from '../../Utils/shopping_cart';

const Calculation = ({ cart, setCart, setTotalPrice }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // Calculation
    let totalPrice = 0;

    for (const product of cart) {
        totalPrice += product.sell_price * product.quantity;
    }

    const tax = parseFloat((totalPrice * 0.05).toFixed(2))
    const grandTotal = totalPrice + tax;

    useEffect(() => {
        if (setTotalPrice) setTotalPrice(grandTotal)
    }, [setTotalPrice, grandTotal])


    const handlerClearCart = (setCart) => {
        setCart([]);
    }

    return (
        <div className={styles.calculation}>
            <div className={styles.calculation_fixed}>
                <div className={styles.calculation_header}>
                    <h3>Checkout Summary</h3>
                </div>
                <div className={styles.calculation_breakdown}>
                    <div className={styles.calculation_breakdown_content}>
                        <div>
                            <p>Subtotal</p>
                            <p>{totalPrice} TK.</p>
                        </div>
                        <div>
                            <p>Tax: 5%</p>
                            <p>{tax} TK.</p>
                        </div>
                        <div>
                            <p>Total</p>
                            <p>{grandTotal} TK.</p>
                        </div>
                    </div>
                </div>
            </div>
            {!pathname?.includes('/shipping') &&
                <>
                    {cart?.length > 0 &&
                        <div className={styles.checkout_footer}>
                            <button onClick={() => handlerClearCart(setCart) + deleteShoppingCart()} className={styles.clear_order_btn}>
                                Clear all
                            </button>
                            <button onClick={() => navigate('/shipping')} className={styles.place_order_btn}>
                                Place Order
                            </button>
                        </div>}
                </>}

        </div>
    );
};

export default Calculation;