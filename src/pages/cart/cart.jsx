import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'; // To fetch products from the API
import { ShopContext } from '../../context/shop-context';
import { CartItem } from './cart-item';
import './cart.css';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
    const { cartItems, getTotalCartAmount } = useContext(ShopContext);
    const [products, setProducts] = useState([]);
    const totalAmount = getTotalCartAmount();
    const navigate = useNavigate();

    // Fetch products from the API
    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://e1cbb79e-bd0d-4873-b7cb-9ae4cd76a987-00-lxyzoqooe174.sisko.replit.dev/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="cart">
            <div>
                <h1>Your Cart Items</h1>
            </div>
            <div className="cartItems">
                {products.map((product) => {
                    if (cartItems[product.id] !== 0) {
                        return <CartItem key={product.id} data={product} />;
                    }
                    return null;
                })}
            </div>

            {totalAmount > 0 ? (
                <div className="checkout">
                    <p>Subtotal: ${totalAmount}</p>
                    <button onClick={() => navigate('/')}>Continue Shopping</button>

                    {/* Add button to navigate to Checkout */}
                    <button onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
                </div>
            ) : (
                <h1>Your Cart is Empty</h1>
            )}
        </div>
    );
};











