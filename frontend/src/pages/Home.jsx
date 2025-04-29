import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="page home-page">
            <div className="hero-section">
                <div className="container">
                    <h1>Welcome to The Digital Diner</h1>
                    <p className="tagline">Fresh, delicious food just a few clicks away</p>
                    <div className="hero-actions">
                        <Link to="/menu" className="btn btn-primary btn-large">
                            View Our Menu
                        </Link>
                        <Link to="/order-history" className="btn btn-secondary btn-large">
                            Order History
                        </Link>
                    </div>
                </div>
            </div>

            <div className="features-section">
                <div className="container">
                    <h2>Why Choose The Digital Diner?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🍽️</div>
                            <h3>Fresh Quality Food</h3>
                            <p>We use only the finest ingredients for all our dishes.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⏱️</div>
                            <h3>Quick Pickup</h3>
                            <p>Order online and pick up your food when it's ready.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🥗</div>
                            <h3>Diverse Menu</h3>
                            <p>From appetizers to desserts, we have something for everyone.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="how-it-works-section">
                <div className="container">
                    <h2>How It Works</h2>
                    <div className="steps-container">
                        <div className="step">
                            <div className="step-number">1</div>
                            <h3>Browse Our Menu</h3>
                            <p>Explore our wide variety of delicious dishes.</p>
                        </div>
                        <div className="step">
                            <div className="step-number">2</div>
                            <h3>Add to Cart</h3>
                            <p>Select your favorite items and add them to your cart.</p>
                        </div>
                        <div className="step">
                            <div className="step-number">3</div>
                            <h3>Place Order</h3>
                            <p>Provide your contact information and submit your order.</p>
                        </div>
                        <div className="step">
                            <div className="step-number">4</div>
                            <h3>Pick Up</h3>
                            <p>Come to our restaurant and enjoy your delicious meal!</p>
                        </div>
                    </div>
                    <div className="cta-container">
                        <Link to="/menu" className="btn btn-primary">
                            Start Ordering Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;