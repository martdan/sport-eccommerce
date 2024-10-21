import React, { useEffect, useState } from "react";
import axios from "axios"; // For API requests
import './Sell.css';
import ImageUpload from '../components/ImageUpload'; // Import ImageUpload component

const Sell = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({
        productName: "",
        price: "",
        productImage: "" // Will be set after the image upload
    });

    const [editItem, setEditItem] = useState(null);

    // Fetch items that the user has added
    const fetchItems = async () => {
        try {
            const response = await axios.get("https://e1cbb79e-bd0d-4873-b7cb-9ae4cd76a987-00-lxyzoqooe174.sisko.replit.dev/products");
            setItems(response.data);
        } catch (error) {
            console.error("Error fetching items", error);
        }
    };

    // Add a new item
    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://e1cbb79e-bd0d-4873-b7cb-9ae4cd76a987-00-lxyzoqooe174.sisko.replit.dev/products", newItem);
            fetchItems(); // Fetch updated list
            setNewItem({ productName: "", price: "", productImage: "" }); // Clear form
        } catch (error) {
            console.error("Error adding item", error);
        }
    };

    // Update an existing item
    const handleUpdateItem = async (id) => {
        try {
            await axios.put(`https://e1cbb79e-bd0d-4873-b7cb-9ae4cd76a987-00-lxyzoqooe174.sisko.replit.dev/${id}`, editItem);
            fetchItems(); // Fetch updated list
            setEditItem(null); // Clear edit form
        } catch (error) {
            console.error("Error updating item", error);
        }
    };

    // Delete an item
    const handleDeleteItem = async (id) => {
        try {
            await axios.delete(`https://e1cbb79e-bd0d-4873-b7cb-9ae4cd76a987-00-lxyzoqooe174.sisko.replit.dev/${id}`);
            fetchItems(); // Fetch updated list
        } catch (error) {
            console.error("Error deleting item", error);
        }
    };

    // Handle image upload and set the image URL in the newItem object
    const handleImageUpload = (url) => {
        setNewItem({ ...newItem, productImage: url });
    };

    // Handle image upload for edit mode
    const handleEditImageUpload = (url) => {
        setEditItem({ ...editItem, productImage: url });
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div className="sell">
            <h2>Your Items for Sale</h2>

            <div className="item-form">
                <h3>Add a New Item</h3>
                <form onSubmit={handleAddItem}>
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={newItem.productName}
                        onChange={(e) => setNewItem({ ...newItem, productName: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                        required
                    />

                    {/* Image Upload component */}
                    <ImageUpload onImageUpload={handleImageUpload} />

                    <button type="submit">Add Item</button>
                </form>
            </div>

            <div className="item-list">
                <h3>Your Listed Items</h3>
                {items.map((item) => (
                    <div key={item.id} className="item">
                        {editItem && editItem.id === item.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editItem.productName}
                                    onChange={(e) => setEditItem({ ...editItem, productName: e.target.value })}
                                />
                                <input
                                    type="number"
                                    value={editItem.price}
                                    onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
                                />

                                {/* Image Upload component for editing */}
                                <ImageUpload onImageUpload={handleEditImageUpload} />

                                <button onClick={() => handleUpdateItem(item.id)}>Save</button>
                            </>
                        ) : (
                            <>
                                <p>{item.productName}</p>
                                <p>${item.price}</p>
                                <img src={item.productImage} alt={item.productName} />
                                <button onClick={() => setEditItem(item)}>Edit</button>
                                <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sell;
