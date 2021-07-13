import React, { useEffect, useState } from 'react';
import './Review.css';
import {getDatabaseCart} from '../../utilities/databaseManager'
import fakeData from '../../fakeData';
import ReviewItem from '../../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart] = useState([]);
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
    return (
        <div>
            <h1>This is review area</h1>
            <h1>cart items: {cart.length}</h1>
            {
                cart.map(pd => <ReviewItem product={pd} key={pd.key}></ReviewItem>)
            }
        </div>
    );
};

export default Review;