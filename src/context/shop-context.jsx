import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'; // For API requests

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);

    // Fetch products from the API
    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://e1cbb79e-bd0d-4873-b7cb-9ae4cd76a987-00-lxyzoqooe174.sisko.replit.dev/products');
            setProducts(response.data);
            initializeCart(response.data); // Initialize the cart based on fetched products
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts(); // Fetch products on component mount
    }, []);

    // Initialize the cart based on the products fetched
    const initializeCart = (products) => {
        const initialCart = {};
        products.forEach((product) => {
            initialCart[product.id] = 0;
        });
        setCartItems(initialCart);
    };

    // Get total amount in the cart
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        products.forEach((product) => {
            if (cartItems[product.id] > 0) {
                totalAmount += cartItems[product.id] * product.price;
            }
        });
        return totalAmount;
    };

    // Add item to cart
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    };

    // Remove item from cart
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) }));
    };

    // Update cart item count
    const updateCartItemCount = (newAmount, itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
    };

    const contextValue = {
        products, // Pass products to the context
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemCount,
        getTotalCartAmount,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};
