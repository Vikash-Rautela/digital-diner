import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { createOrder } from '../utils/api';

const OrderForm = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        customerName: '',
        phoneNumber: ''
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear field-specific error when user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.customerName.trim()) {
            newErrors.customerName = 'Name is required';
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
            newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
        }

        if (cart.items.length === 0) {
            newErrors.cart = 'Your cart is empty';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            setSubmitting(true);

            // Format order data for API
            const orderItems = cart.items.map(item => ({
                menuItemId: item._id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            }));

            const orderData = {
                customerName: formData.customerName,
                phoneNumber: formData.phoneNumber,
                items: orderItems
            };

            const response = await createOrder(orderData);

            // Store order details in localStorage for confirmation page
            localStorage.setItem('lastOrder', JSON.stringify(response.data));

            // Clear cart and redirect to confirmation page
            clearCart();
            navigate('/confirmation');

        } catch (error) {
            setErrors({ submit: 'Failed to place order. Please try again.' });
            setSubmitting(false);
        }
    };

    if (cart.items.length === 0) {
        return (
            <div className="page order-form-page empty-cart">
                <div className="container">
                    <h1>Place Order</h1>
                    <p>Your cart is empty. Please add items to your cart before placing an order.</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/menu')}
                    >
                        Browse Menu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="page order-form-page">
            <div className="container">
                <h1>Place Your Order</h1>

                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <div className="order-items">
                        {cart.items.map(item => (
                            <div className="order-item" key={item.id}>
                                <span>{item.name} x {item.quantity}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="order-total">
                        <span>Total:</span>
                        <span>${cart.total.toFixed(2)}</span>
                    </div>
                </div>

                <form className="order-form" onSubmit={handleSubmit}>
                    <h2>Contact Information</h2>

                    {errors.submit && (
                        <div className="error-message form-error">{errors.submit}</div>
                    )}

                    <div className="form-group">
                        <label htmlFor="customerName">Name</label>
                        <input
                            type="text"
                            id="customerName"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            className={errors.customerName ? 'error' : ''}
                        />
                        {errors.customerName && (
                            <div className="error-message">{errors.customerName}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="(123) 456-7890"
                            className={errors.phoneNumber ? 'error' : ''}
                        />
                        {errors.phoneNumber && (
                            <div className="error-message">{errors.phoneNumber}</div>
                        )}
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate('/cart')}
                        >
                            Back to Cart
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={submitting}
                        >
                            {submitting ? 'Placing Order...' : 'Place Order'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrderForm;