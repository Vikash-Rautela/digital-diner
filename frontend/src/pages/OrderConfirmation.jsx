import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const orderData = localStorage.getItem('lastOrder');

        if (!orderData) {
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

    const formatPickupTime = (dateString) => {
        if (!dateString) return 'Calculating...';

        const pickupTime = new Date(dateString);
        return pickupTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatPrice = (price) => {
        const numPrice = parseFloat(price);
        return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
    };

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
                        <p><strong>Order Date:</strong> {formatDate(order.createdAt)}</p>
                        <p><strong>Status:</strong> <span className="status">{order.status}</span></p>
                        <p className="pickup-time">
                            <strong>Estimated Pickup Time:</strong> {formatPickupTime(order.pickupTime)}
                        </p>
                    </div>

                    <div className="confirmation-section">
                        <h2>Order Summary</h2>
                        <div className="order-items">
                            {order.items.map((item, index) => (
                                <div className="order-item" key={index}>
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>${formatPrice(item.price * item.quantity)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="order-total">
                            <span>Total:</span>
                            <span>${formatPrice(order.totalAmount)}</span>
                        </div>
                    </div>
                </div>

                <div className="confirmation-footer">
                    <p>
                        Thank you for your order. Your food will be ready for pickup at <strong>{formatPickupTime(order.pickupTime)}</strong>.
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