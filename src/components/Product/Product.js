import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props.product)
    const {img, name, seller, price, stock, key} = props.product;
    return (
        <div className="product-details">
            <div className="product-img">
                <img src={img} alt={name}/>
            </div>
            <div className="product-info">
                <h3 className="product-name"><Link to={"/product/"+key}>{name}</Link></h3>
                <p><small>Product seller: {seller}</small></p>
                <p>Price: ${price}</p>
                <p><small>Only {stock} left in stock - Order Soon</small></p>
                {props.showAddToCart && <button
                    onClick={() => props.handleProduct(props.product)}
                    className="main-button"
                ><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>}
            </div>
        </div>
    );
};

export default Product;