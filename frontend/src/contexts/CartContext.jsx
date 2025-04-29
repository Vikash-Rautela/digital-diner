import { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state for cart
const initialState = {
    items: [],
    total: 0
};

// Create cart context
const CartContext = createContext();

// Cart reducer to handle state updates
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItemIndex = state.items.findIndex(
                item => item.id === action.payload.id
            );

            if (existingItemIndex > -1) {
                // Item exists, update quantity
                const updatedItems = [...state.items];
                updatedItems[existingItemIndex].quantity += 1;

                return {
                    ...state,
                    items: updatedItems,
                    total: calculateTotal(updatedItems)
                };
            } else {
                // New item, add to cart
                const newItem = { ...action.payload, quantity: 1 };
                const updatedItems = [...state.items, newItem];

                return {
                    ...state,
                    items: updatedItems,
                    total: calculateTotal(updatedItems)
                };
            }
        }

        case 'REMOVE_ITEM': {
            const updatedItems = state.items.filter(
                item => item.id !== action.payload
            );

            return {
                ...state,
                items: updatedItems,
                total: calculateTotal(updatedItems)
            };
        }

        case 'UPDATE_QUANTITY': {
            const updatedItems = state.items.map(item =>
                item.id === action.payload.id
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );

            return {
                ...state,
                items: updatedItems,
                total: calculateTotal(updatedItems)
            };
        }

        case 'CLEAR_CART':
            return initialState;

        default:
            return state;
    }
};

// Helper function to calculate total
const calculateTotal = (items) => {
    return parseFloat(
        items.reduce((total, item) => total + (item.price * item.quantity), 0)
            .toFixed(2)
    );
};

// CartProvider component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state));
    }, [state]);

    // Load cart from localStorage on initial render
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            try {
                const parsedCart = JSON.parse(storedCart);
                if (parsedCart && parsedCart.items) {
                    Object.keys(cartReducer(initialState, { type: '' })).forEach(key => {
                        if (!(key in parsedCart)) {
                            throw new Error(`Invalid cart format: missing ${key}`);
                        }
                    });

                    dispatch({ type: 'REPLACE_CART', payload: parsedCart });
                }
            } catch (err) {
                console.error('Failed to parse cart from localStorage', err);
                localStorage.removeItem('cart');
            }
        }
    }, []);

    // Add an item to cart
    const addToCart = (item) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
    };

    // Remove an item from cart
    const removeFromCart = (id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    };

    // Update item quantity in cart
    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return;
        dispatch({
            type: 'UPDATE_QUANTITY',
            payload: { id, quantity }
        });
    };

    // Clear the cart
    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    return (
        <CartContext.Provider value={{
            cart: state,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook for using cart context
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export default CartContext;