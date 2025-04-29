import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Get order details from localStorage
        const orderData = localStorage.getItem('lastOrder');

        if (!orderData) {
            // If no order data, redirect to menu
            navigate('/menu');
            return;
        }

        try {
            setOrder(JSON.parse(orderData));
        } catch (error) {
            console.error('Error parsing order data:', error);
            navigate('/menu');
        }
    }, [navigate]);

    if (!order) {
        return <div className="loading">Loading order details...</div>;
    }

    return (
        <div className="page confirmation-page">
            <div className="container">
                <div className="confirmation-header">
                    <h1>Order Confirmation</h1>
                    <p className="success-message">
                        Your order has been successfully placed!
                    </p>
                </div>

                <div className="confirmation-details">
                    <div className="confirmation-section">
                        <h2>Order Details</h2>
                        <p><strong>Order ID:</strong> {order.id}</p>
                        <p><strong>Customer:</strong> {order.customerName}</p>
                        <p><strong>Phone:</strong> {order.phoneNumber}</p>
                        <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                        <p><strong>Status:</strong> <span className="status">{order.status}</span></p>
                    </div>

                    <div className="confirmation-section">
                        <h2>Order Summary</h2>
                        <div className="order-items">
                            {order.items.map((item, index) => (
                                <div className="order-item" key={index}>
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="order-total">
                            <span>Total:</span>
                            <span>${order.totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="confirmation-footer">
                    <p>
                        Thank you for your order. Your food will be ready for pickup shortly.
                        Please keep your phone handy as we may contact you regarding your order.
                    </p>

                    <div className="action-buttons">
                        <Link to="/menu" className="btn btn-primary">
                            Order More
                        </Link>
                        <Link to="/order-history" className="btn btn-secondary">
                            View Order History
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;