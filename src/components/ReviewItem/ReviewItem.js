import React from 'react';
import { Link } from 'react-router-dom';

const ReviewItem = (props) => {
    console.log(props)
    const ReviewItemStyle = {
        borderBottom:'1px solid lightGray',
        margin: '100px 30px',
        padding:'10px 30px',
    }

    const {name, quantity, key, img, price}=props.product
    return (
        <div style={ReviewItemStyle} className='product-detail product-review'>
            <img src={img} alt="img" srcset=""/>
            <h4>Product Name : <Link> {name}</Link></h4>
            <h4>Price : {price}$</h4>
            <h5>Product Quantity : {quantity}</h5>
            <button onClick={()=>props.removeProduct(key)}>Remove</button><br/><br/>
        </div>
    );
};

export default ReviewItem;