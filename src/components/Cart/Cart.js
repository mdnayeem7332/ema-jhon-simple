import React from 'react';
import './Cart.css'
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart
    // const total = cart.reduce( (total,pdct)=>total+pdct.price ,0 )
    // const finalPrice = total.toFixed(2)
    let total = 0 
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total =total + product.price * product.quantity;
    }

    let shipping = 0
    if(total > 0){

        shipping = 5
    }if(total > 35){
        shipping = 10
    }

    const tax = Math.round((total / 5))

    const finalPrice = (total+shipping+tax)
    return (
        <div className='priceDetail product-detail'>
            <h3>Order summary</h3>
            <b>Items Oeder : {cart.length}</b>
            <p><small>Shipping cost = {shipping}</small></p>
            <p><small>Tax + VAT = {tax}</small></p>
            <p>Total price : {finalPrice.toFixed(2)}$</p>
            <br/>
            {
                props.children
            }
        </div>
    );
};

export default Cart;
