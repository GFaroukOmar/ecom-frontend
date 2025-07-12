import  { createContext, useContext, useState } from 'react';
import Notification from "../components/in-components-reuseable-components/Notification";

// Create a context for notifications
const NotificationContext = createContext();

// Custom hook to use the notification context
export const useNotification = () =>  useContext(NotificationContext);

// Notification provider component
export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (type, title, message) => {
        const id = Date.now(); // Unique ID based on timestamp
        setNotifications((prevNotifications) => [
            ...prevNotifications,
            { id, type, title, message }
        ]);
    };

    const removeNotification = (id) => {
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== id)
        );
    };

    return (
        <NotificationContext.Provider value={{ addNotification, removeNotification }}>
            {children}
            <div id="notifications">
                {notifications.map(({ id, type, title, message }) => (
                    <Notification
                        key={id}
                        type={type}
                        title={title}
                        message={message}
                        onClose={() => removeNotification(id)}
                    />
                ))}
            </div>
        </NotificationContext.Provider>
    );
};
