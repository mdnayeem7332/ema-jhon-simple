import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/gift.gif'
import css from './Review.css'

const Review = () => {
    const [cart, setCart]=useState([]);
    const [orderPlaced, setOrderPlaced]=useState(false);

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true)
        processOrder();
    }

    const removeProduct = (productKey) =>{
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(()=>{
        //carts
        const saveCart = getDatabaseCart();
        const productKey = Object.keys(saveCart);
        const cartProducts =productKey.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product
        });
        setCart(cartProducts)
    },[])

    let thankYou ;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt=""/>
    }

    return (
        <div className='twin-container'>
            <div className='product-container'>
            <h1>Added Items {cart.length}</h1>
            {
                cart.map(pd => <ReviewItem removeProduct ={removeProduct} product ={pd}></ReviewItem>)
            }
            <div className='orderPlacedGift'>
                {thankYou}
            </div>
            </div>
            <div className='cart-container'>
                <Cart cart = {cart}>
                    <button onClick={handlePlaceOrder}>Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review; 