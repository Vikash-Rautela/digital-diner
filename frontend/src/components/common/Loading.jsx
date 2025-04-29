import React from 'react';

const Loading = ({ size = 'medium', text = 'Loading...' }) => {
    const spinnerSize = {
        small: { width: '20px', height: '20px' },
        medium: { width: '40px', height: '40px' },
        large: { width: '60px', height: '60px' }
    };

    return (
        <div className="loading-container">
            <div
                className="spinner"
                style={spinnerSize[size]}
            ></div>
            {text && <p className="loading-text">{text}</p>}
        </div>
    );
};

export default Loading;