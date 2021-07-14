import React, { useEffect, useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);

    const [cart, setCart] = useState([]);
    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousKey = productKeys.map( existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product
        })
        setCart(previousKey)
    }, [])


    // const [cart, setCart] = useState([]);

    const handleAddProduct = (singleProduct) => {
        const toBeAddedKey = singleProduct.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else{
            singleProduct.quantity = 1;
            newCart = [...cart, singleProduct];
        }
        // const count  = sameProduct.length;
        // const newCart = [...cart , singleProduct];
        setCart(newCart);
        // const sameProduct = newCart.filter(pd => pd.key === singleProduct.key);
        // const count  = sameProduct.length;
        addToDatabaseCart(singleProduct.key, count);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(pd => <Product showAddToCart={true} handleProduct={handleAddProduct} product={pd} key={pd.key}></Product>)
                }
            </div>
            <div className="cart-container">
                {/* <h3>this is cart</h3> */}
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button"><FontAwesomeIcon icon={faShoppingCart} /> Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;