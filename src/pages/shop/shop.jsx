import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Axios for API requests
import { Product } from './Product';
import './shop.css';

export const Shop = () => {
    const [products, setProducts] = useState([]);

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
        <div className="shop">
            <div className="shopTitle">
                <h1>Sport Mart</h1>
            </div>
            <div className="products">
                {products.map((product) => (
                    <Product key={product.id} data={product} />
                ))}
            </div>
        </div>
    );
};
