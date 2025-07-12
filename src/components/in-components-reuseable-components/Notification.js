import React, { useEffect, useState } from 'react';
// import './Notification.css'; // Make sure this file exists and contains your styles

const Notification = ({ type, title, message, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        // Start the timer for auto-closing
        const autoCloseTimer = setTimeout(() => {
            setIsClosing(true);
            setTimeout(() => onClose(), 500); // Wait for fade-out transition before closing
        }, 2000);

        // Store the timer to clear it later if needed
        setTimer(autoCloseTimer);

        // Clean up the timer when component unmounts or re-renders
        return () => clearTimeout(autoCloseTimer);
    }, [onClose]);

    // Function to handle mouse hover
    const handleMouseEnter = () => {
        // Freeze the notification (stop the timeout)
        clearTimeout(timer);
    };

    const handleMouseLeave = () => {
        // Restart the timeout when hover ends
        const restartTimer = setTimeout(() => {
            setIsClosing(true);
            setTimeout(() => onClose(), 500); // Wait for fade-out transition before closing
        }, 2000); // Restart the 2-second countdown
        setTimer(restartTimer);
    };

    return (
        <div
            className={`notification ${type} ${isClosing ? 'fade-out' : ''}`}
            onMouseEnter={handleMouseEnter} // Freeze when hovered
            onMouseLeave={handleMouseLeave} // Resume when unhovered
        >
            <strong>{title}</strong>
            <span> - {message}</span>
            <button
                className="close-btn"
                onClick={() => {
                    setIsClosing(true);
                    setTimeout(() => onClose(), 500); // Wait for fade-out before calling onClose
                }}
            >
                ×
            </button>
        </div>
    );
};

export default Notification;
