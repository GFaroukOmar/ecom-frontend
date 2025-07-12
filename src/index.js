import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/style.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {Provider as UserContextProvider} from './hooks/UserContext';
import {Provider as CartContextProvider} from './hooks/CartContext'
import {NotificationProvider} from "./hooks/NotificationContext";
import {ClientContextProvider} from "./hooks/ClientContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <NotificationProvider>
            <ClientContextProvider>
            {/*<UserContextProvider>*/}
                <CartContextProvider>
                    <App />
                </CartContextProvider>
            {/*</UserContextProvider>*/}
            </ClientContextProvider>
        </NotificationProvider>
    </BrowserRouter>
);


