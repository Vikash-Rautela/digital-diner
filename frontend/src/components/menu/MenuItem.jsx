import React from 'react';
import { useCart } from '../../contexts/CartContext';

const MenuItem = ({ item }) => {
    const { addToCart } = useCart();

    return (
        <div className="menu-item">
            <div className="menu-item-image">
                <img
                    src={item.image || 'https://via.placeholder.com/150?text=Food+Item'}
                    alt={item.name}
                />
            </div>
            <div className="menu-item-content">
                <h3>{item.name}</h3>
                <p className="menu-item-description">{item.description}</p>
                <div className="menu-item-footer">
                    <span className="menu-item-price">${item.price.toFixed(2)}</span>
                    <button
                        className="add-to-cart-btn"
                        onClick={() => addToCart(item)}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuItem;