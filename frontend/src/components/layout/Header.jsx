import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const Header = () => {
    const location = useLocation();
    const { cart } = useCart();

    // Check if current path matches
    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <header className="site-header">
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <h1>The Digital Diner</h1>
                    </Link>
                </div>

                <nav className="main-nav">
                    <ul>
                        <li className={isActive('/')}>
                            <Link to="/">Home</Link>
                        </li>
                        <li className={isActive('/menu')}>
                            <Link to="/menu">Menu</Link>
                        </li>
                        <li className={isActive('/order-history')}>
                            <Link to="/order-history">Order History</Link>
                        </li>
                    </ul>
                </nav>

                <div className="cart-link">
                    <Link to="/cart" className={`cart-icon ${isActive('/cart')}`}>
                        <span className="material-icons">shopping_cart</span>
                        {cart.items.length > 0 && (
                            <span className="cart-count">{cart.items.length}</span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;