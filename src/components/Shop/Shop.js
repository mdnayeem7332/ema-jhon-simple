import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0, 50);
    const [products, setProducts] = useState(first10);
    const [cart , setCart] = useState([])

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKey = Object.keys(savedCart)
        const previousCart = productKey.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey )
            product.quantity = savedCart[existingKey]
            return product
        });
        setCart(previousCart);
    }, [])

    const handleAddproduct = (product) => {
        const toBeAdded = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAdded);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const Others = cart.filter(pd => pd.key !== toBeAdded)
            newCart = [...Others, product]
        
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart);
        addToDatabaseCart(product.key,count);
    }

    return (
        <div className='twin-container'>
            <div className="product-container">
                {
                    products.map(product =>
                    <Product
                    key ={product.key}
                    showAddToCart ={true}
                    product={product}
                    handleAddproduct ={handleAddproduct}
                    >
                    </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart = {cart}>
                    <Link to={"/review/"}><button>Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;