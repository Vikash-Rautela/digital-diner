import React from 'react';
import { useCart } from '../../contexts/CartContext';

const CartItem = ({ item }) => {
    const { removeFromCart, updateQuantity } = useCart();

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        if (newQuantity > 0) {
            updateQuantity(item.id, newQuantity);
        }
    };

    return (
        <div className="cart-item">
            <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
            </div>

            <div className="cart-item-actions">
                <div className="quantity-control">
                    <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                    >
                        -
                    </button>

                    <input
                        type="number"
                        value={item.quantity}
                        onChange={handleQuantityChange}
                        min="1"
                        className="quantity-input"
                    />

                    <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                        +
                    </button>
                </div>

                <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                >
                    Remove
                </button>
            </div>

            <div className="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    );
};

export default CartItem;