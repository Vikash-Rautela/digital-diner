import React, { useState, useEffect } from 'react';
import MenuItem from './MenuItem';
import { getMenuItems } from '../../utils/api';

const MenuList = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');

    // Categories defined in the model
    const categories = ['All', 'Appetizers', 'Mains', 'Desserts', 'Drinks'];

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                setLoading(true);
                const response = await getMenuItems();
                setMenuItems(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch menu items. Please try again later.');
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    const filteredItems = activeCategory === 'All'
        ? menuItems
        : menuItems.filter(item => item.category === activeCategory);

    if (loading) return <div className="loading">Loading menu items...</div>;

    if (error) return <div className="error">{error}</div>;

    return (
        <div className="menu-container">
            <div className="category-filter">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="menu-items-grid">
                {filteredItems.length > 0 ? (
                    filteredItems.map(item => (
                        <MenuItem key={item._id} item={item} />
                    ))
                ) : (
                    <p className="no-items">No items available in this category.</p>
                )}
            </div>
        </div>
    );
};

export default MenuList;