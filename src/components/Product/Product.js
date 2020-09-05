import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props.handleAddproduct)
    const { img, name, key, seller, price, stock} = props.product
    // console.log(props)
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className='product-detail'>
                <h4> <Link to={"/product/"+key}>{name}</Link> </h4>
                <h5>{key}</h5>
                <b>by : {seller}</b>
                <h2>$ {price}</h2>
                <h3>Stock : Only {stock} piches</h3>
                {props.showAddToCart && <button onClick={() => {
                    props.handleAddproduct(props.product)
                }}><FontAwesomeIcon icon={faShoppingCart}/> Buy Now
                </button>}
            </div>
        </div>
    );
};

export default Product;