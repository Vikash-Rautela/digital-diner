import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
    const { cart, clearCart } = useCart();

    const formatPrice = (price) => {
        const numPrice = parseFloat(price);
        return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
    };

    if (cart.items.length === 0) {
        return (
            <div className="page cart-page empty-cart">
                <div className="container">
                    <h1>Your Cart</h1>
                    <p>Your cart is empty.</p>
                    <Link to="/menu" className="btn btn-primary">
                        Browse Menu
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page cart-page">
            <div className="container">
                <h1>Your Cart</h1>

                <div className="cart-items">
                    {cart.items.map(item => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>

                <div className="cart-summary">
                    <div className="cart-total">
                        <span>Total:</span>
                        <span className="total-amount">${formatPrice(cart.total)}</span>
                    </div>

                    <div className="cart-actions">
                        <button className="btn btn-secondary" onClick={clearCart}>
                            Clear Cart
                        </button>
                        <Link to="/order" className="btn btn-primary">
                            Place Order
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;