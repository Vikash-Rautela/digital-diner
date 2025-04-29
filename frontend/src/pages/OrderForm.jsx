import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../contexts/CartContext';
import { createOrder } from '../utils/api';
import useFormValidation from '../hooks/useFormValidation';

const OrderForm = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    // Form validation function
    const validateOrderForm = (values) => {
        const errors = {};

        if (!values.customerName.trim()) {
            errors.customerName = 'Name is required';
        }

        if (!values.phoneNumber.trim()) {
            errors.phoneNumber = 'Phone number is required';
        } else if (!/^\d{10}$/.test(values.phoneNumber.trim())) {
            errors.phoneNumber = 'Please enter a valid 10-digit phone number';
        }

        return errors;
    };

    // Use our custom form validation hook
    const {
        values: formData,
        errors,
        isSubmitting,
        setIsSubmitting,
        handleChange,
        validateForm,
        resetForm
    } = useFormValidation(
        { customerName: '', phoneNumber: '' },
        validateOrderForm
    );

    // Redirect to menu if cart is empty
    useEffect(() => {
        if (cart.items.length === 0) {
            navigate('/menu');
            toast.info('Your cart is empty. Add items before placing an order.');
        }
    }, [cart.items.length, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setIsSubmitting(true);

            // Prepare order data
            const orderData = {
                ...formData,
                items: cart.items.map(item => ({
                    menuItemId: item.id || item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                }))
            };

            // Submit order to API
            const response = await createOrder(orderData);

            // Store order data in localStorage for confirmation page
            localStorage.setItem('lastOrder', JSON.stringify(response.data));

            // Clear cart
            clearCart();

            // Reset form
            resetForm();

            // Show success message
            toast.success('Order placed successfully!');

            // Redirect to confirmation page
            navigate('/confirmation');

        } catch (error) {
            console.error('Error submitting order:', error);
            toast.error('Failed to place order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page order-form-page">
            <div className="container">
                <h1>Place Your Order</h1>

                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <div className="order-items">
                        {cart.items.map((item, index) => (
                            <div className="order-item" key={index}>
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
                    <h2>Your Information</h2>

                    <div className="form-group">
                        <label htmlFor="customerName">Your Name</label>
                        <input
                            type="text"
                            id="customerName"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className={errors.customerName ? 'error' : ''}
                        />
                        {errors.customerName && <div className="error-message">{errors.customerName}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className={errors.phoneNumber ? 'error' : ''}
                        />
                        {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate('/cart')}
                            disabled={isSubmitting}
                        >
                            Back to Cart
                        </button>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Placing Order...' : 'Place Order'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrderForm;