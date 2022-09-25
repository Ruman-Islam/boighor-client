const handleAddToCart = (cart, setCart, selectedItem) => {
    let newCart = [];
    const existingItem = cart.find(cartItem => cartItem.id === selectedItem.id);
    if (existingItem) {
        const rest = cart.filter(cartItem => cartItem.id !== selectedItem.id);
        existingItem.quantity += 1;
        newCart = [...rest, existingItem];
    } else {
        selectedItem.quantity = 1;
        newCart = [...cart, selectedItem];
    }
    setCart(newCart);
    addToLocalStorage(selectedItem.id);
}

const addToLocalStorage = (id) => {
    const shoppingCart = getStoredCart();

    const quantity = shoppingCart[id];
    if (quantity) {
        const newQuantity = quantity + 1;
        shoppingCart[id] = newQuantity;
    } else {
        shoppingCart[id] = 1;
    }
    localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
}


const getStoredCart = () => {
    let shoppingCart = {};

    const storedCart = localStorage.getItem('shopping-cart');
    if (storedCart) {
        shoppingCart = JSON.parse(storedCart);
    }
    return shoppingCart;
}


const removeFromLocalStorage = id => {
    const storedCart = localStorage.getItem('shopping-cart');
    if (storedCart) {
        const shoppingCart = JSON.parse(storedCart);
        if (id in shoppingCart) {
            delete shoppingCart[id];
            localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
        }
    }
}

const deleteShoppingCart = () => {
    localStorage.removeItem('shopping-cart');
}


export {
    getStoredCart,
    removeFromLocalStorage,
    deleteShoppingCart,
    handleAddToCart,
    addToLocalStorage
}