import React, { useState } from 'react';
import { getOrdersByPhone } from '../utils/api';
import Loading from '../components/common/Loading';

const OrderHistory = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!phoneNumber.trim()) {
            setError('Please enter a phone number');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const response = await getOrdersByPhone(phoneNumber);
            setOrders(response.data);
            setSearched(true);

        } catch (error) {
            if (error.response && error.response.status === 404) {
                setOrders([]);
                setError('No orders found for this phone number');
            } else {
                setError('Failed to fetch order history. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="page order-history-page">
            <div className="container">
                <h1>Order History</h1>
                <p className="subheading">View your previous orders by entering your phone number</p>

                <form className="order-history-form" onSubmit={handleSearch}>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter your phone number"
                            className={error ? 'error' : ''}
                        />
                        {error && <div className="error-message">{error}</div>}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Searching...' : 'Search Orders'}
                    </button>
                </form>

                {loading && <Loading text="Searching for your orders..." />}

                {searched && !loading && orders.length === 0 && !error && (
                    <div className="no-orders">
                        <p>No orders found for this phone number.</p>
                    </div>
                )}

                {orders.length > 0 && (
                    <div className="order-history-list">
                        <h2>Your Orders</h2>

                        {orders.map(order => (
                            <div className="order-card" key={order.id}>
                                <div className="order-card-header">
                                    <div>
                                        <h3>Order #{order.id.substring(0, 8)}</h3>
                                        <p className="order-date">{formatDate(order.createdAt)}</p>
                                    </div>
                                    <div className="order-status">{order.status}</div>
                                </div>

                                <div className="order-card-items">
                                    {order.OrderItems.map(item => (
                                        <div className="order-item" key={item.id}>
                                            <span>{item.name} x {item.quantity}</span>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="order-card-footer">
                                    <span>Total:</span>
                                    <span className="order-total">${order.totalAmount.toFixed(2)}</span>
                                </div>

                                {order.pickupTime && (
                                    <div className="pickup-time-info">
                                        <strong>Pickup Time:</strong> {new Date(order.pickupTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;