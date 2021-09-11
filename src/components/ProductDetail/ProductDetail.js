import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    document.title = "Product Details";
    const {productKey} = useParams();

    const[product, setProduct] = useState({});
    useEffect(() =>{
        fetch(`http://localhost:5000/product/${productKey}`)
        .then(res => res.json())
        .then(data => setProduct(data))
    }, [productKey])

    // const product = fakeData.find(pd => pd.key === productKey);

    // const [loading, setLoading] = useState(true)
    // const [product, setProduct] = useState({});
    // useEffect(()=> {
    //     fetch("/product/" + productKey)
    //     .then(res => res.json())
    //     .then(data => {
    //         setProduct(data);
    //         setLoading(false);
    //     })
    // }, [productKey])
    // console.log(product);
    return (
        <div>
            <h1>{productKey} details coming soon!!!</h1>
            <Product showAddToCart={false} product={product}></Product>
            {/* {
                loading ? <p>Loading...</p> :
                <Product showAddToCart={false} product={product}></Product>
            } */}
        </div>
    );
};

export default ProductDetail;