import React, { createContext, useContext, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create notification context
const NotificationContext = createContext();

// NotificationProvider component
export const NotificationProvider = ({ children }) => {
    // Set notification options
    const defaultOptions = {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    };

    // Notification functions
    const notify = {
        success: (message, options = {}) => {
            toast.success(message, { ...defaultOptions, ...options });
        },
        error: (message, options = {}) => {
            toast.error(message, { ...defaultOptions, ...options });
        },
        info: (message, options = {}) => {
            toast.info(message, { ...defaultOptions, ...options });
        },
        warning: (message, options = {}) => {
            toast.warning(message, { ...defaultOptions, ...options });
        }
    };

    return (
        <NotificationContext.Provider value={notify}>
            {children}
            <ToastContainer />
        </NotificationContext.Provider>
    );
};

// Custom hook for using notification context
export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

export default NotificationContext;