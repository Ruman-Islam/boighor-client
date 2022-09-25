import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from '../../styles/Cart/Cart.module.css';
import { removeFromLocalStorage } from '../../Utils/shopping_cart';

const ItemContainer = ({ cart, setCart, totalPrice }) => {

    const handleRemoveFromCart = (selectedItem) => {
        const restItems = cart.filter(cartItem => cartItem._id !== selectedItem._id);
        setCart(restItems);
        removeFromLocalStorage(selectedItem._id);
    }

    return (
        <div className={styles.items_container}>
            <div className={styles.cart_header}>
                <div>
                    <span>({cart?.length} Items)</span>
                </div>
                <div>
                    <h2>Total: <span>{totalPrice} TK.</span></h2>
                </div>
            </div>
            {cart?.length > 0 ?
                <div className={styles.cart_item_container}>
                    {cart?.map((item) => {
                        return (
                            <div key={item?._id} className={styles.cart_item}>
                                <div className={styles.cart_item_inner}>
                                    <div className={styles.cart_item_thumb}>
                                        <img src={item?.imgURL} alt="" />
                                    </div>
                                    <div className={styles.cart_item_title}>
                                        <p>{item?.title}</p>
                                        <p>{item?.author?.slice(0, 50)}</p>
                                        <br />
                                        <span onClick={() => handleRemoveFromCart(item)}>
                                            <DeleteIcon />
                                        </span>
                                    </div>
                                    <div className={styles.cart_item_quantity}>
                                        <input type="number" name="" id="" defaultValue={item?.quantity} />
                                    </div>
                                    <div className={styles.cart_item_price}>
                                        <p>Tk. {item?.sell_price}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div> :
                <p>No Items</p>}
        </div>
    );
};

export default ItemContainer;