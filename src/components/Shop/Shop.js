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
    // const first10 = fakeData.slice(0, 10);
    // const [products, setProducts] = useState(first10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() =>{
        fetch("http://localhost:5000/products?search="+search)
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [search]);

    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://evening-forest-20156.herokuapp.com/productsByKeys', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))

        // if(products.length){
        //     const previousKey = productKeys.map( existingKey => {
        //         // const product = fakeData.find(pd => pd.key === existingKey);
        //         const product = products.find(pd => pd.key === existingKey);
        //         product.quantity = savedCart[existingKey];
        //         return product
        //     })
        //     setCart(previousKey)
        // }
    }, [])


    // const [cart, setCart] = useState([]);

    const handleSearch = event => {
        setSearch(event.target.value);
    }

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
            {/* <form className="col-md-6 m-auto py-5">
                <div className="input-group mb-3">
                    <input type="text" name="" onBlur={handleSearch} id="" className="form-control" placeholder="Search your products" />
                    <div className="input-group-append">
                        <button type="button" className="btn btn-success">Search</button>
                    </div>
                </div>
            </form> */}
            <input type="text" onBlur={handleSearch} />
                {
                    products.length === 0 && <p>Loading...</p>
                }
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