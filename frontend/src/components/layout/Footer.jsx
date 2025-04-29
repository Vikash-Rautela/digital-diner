import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>The Digital Diner</h3>
                        <p>Fresh, delicious food just a few clicks away. Order online for quick pickup.</p>
                    </div>

                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/menu">Menu</Link></li>
                            <li><Link to="/cart">Cart</Link></li>
                            <li><Link to="/order-history">Order History</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3>Contact Us</h3>
                        <p>123 Food Street<br />Cuisine City, FD 12345</p>
                        <p>Phone: (555) 123-4567</p>
                        <p>Email: info@digitaldiner.com</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} The Digital Diner. All rights reserved.</p>
                    <p>This is a fictional restaurant created for demonstration purposes.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;