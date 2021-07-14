import React, { useEffect, useState } from 'react';
import './Review.css';
import {getDatabaseCart, processOrder, removeFromDatabaseCart} from '../../utilities/databaseManager'
import fakeData from '../../fakeData';
import ReviewItem from '../../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);

    const [orderPlaced, setOrderPlaced] = useState(false)

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder()
    }

    const handleProductRemove = (productKey) => {
        // console.log('clicked', productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey)
    }

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        });
        setCart(cartProducts);
    }, []);
    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt="" />
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                <h1>This is review area</h1>
                <h1>cart items: {cart.length}</h1>
                {
                    cart.map(pd => <ReviewItem product={pd} handleProductRemove={handleProductRemove} key={pd.key}></ReviewItem>)
                }
                { thankYou }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="main-button">Place order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;