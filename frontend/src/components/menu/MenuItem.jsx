import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { useNotification } from '../../contexts/NotificationContext';

const MenuItem = ({ item }) => {
    const { addToCart } = useCart();
    const notify = useNotification();

    const handleAddToCart = () => {
        addToCart(item);
    };

    return (
        <div className="menu-item">
            <div className="menu-item-image">
                <img src={item.image} alt={item.name} />
            </div>
            <div className="menu-item-content">
                <h3>{item.name}</h3>
                <p className="menu-item-description">{item.description}</p>
                <div className="menu-item-footer">
                    <div className="menu-item-price">${item.price.toFixed(2)}</div>
                    <button
                        className="add-to-cart-btn"
                        onClick={handleAddToCart}
                        aria-label={`Add ${item.name} to cart`}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuItem;