import { getSuggestedQuery } from '@testing-library/react';
import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity} = props.product;
    // console.log(props)
    const reviewItemStyles = {
        borderBottom: "1px solid grey",
        marginBottom: "10px",
        marginLeft: "200px",
        padding: "10px"
    }
    return (
        <div style={reviewItemStyles}>
            <h4 className="product-name">Name: {name}</h4>
            <p>Quantity: {quantity}</p>
            <br />
            <button className="main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;