import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce( (total, prd) => total + prd.price, 0)
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const prd = cart[i];
        total = total + prd.price;
    }
    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 2.99;
    }
    else if(total > 0){
        shipping = 4.99;
    }

    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formatNumber = (num) => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <div>
            <h2>Order Summary</h2>
            <p>Items ordered: {cart.length}</p>
            <p>Product price: {formatNumber(total)}</p>
            <p><small>Shipping charge: {formatNumber(shipping)}</small></p>
            <p><small>Tax + VAT: {tax}</small></p>
            <p>Total price: {grandTotal}</p>
            <br />
            <Link to="/review">
                <button className="main-button"><FontAwesomeIcon icon={faShoppingCart} /> Review Order</button>
            </Link>
        </div>
    );
};

export default Cart;