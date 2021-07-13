import React, { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import {addToDatabaseCart} from '../../utilities/databaseManager'

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);

    const [cart, setCart] = useState([]);
    const handleAddProduct = (singleProduct) => {
        const newCart = [...cart , singleProduct];
        setCart(newCart);
        const sameProduct = cart.filter(pd => pd.key === singleProduct.key);
        const count  = sameProduct.length;
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
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;