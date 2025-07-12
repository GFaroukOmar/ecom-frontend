import React, {useContext, useEffect, useState} from "react";
import { clientRoute } from "../api";
import {useNotification} from "./NotificationContext";

const ClientContext = React.createContext({});

const useClient = () => useContext(ClientContext);

const ClientContextProvider = ({ children }) => {
    const [client, setClient] = useState(null); // Default value is null
    const {addNotification} = useNotification()
    const setToken = async (token) => {
        localStorage.setItem("jwt", token);
        const updatedClient = { ...client, token: `${token}` }; // Correctly format "Bearer" with a space
        setClient(updatedClient);

        try {
            const api = clientRoute(`Bearer ${token}`); // Pass the updated client to clientRoute
            const response = await api.get("/"); // Use `await` for asynchronous calls
            setClient({...client,...response.data})
            console.log("client from the client context",response.data)
        } catch (e) {
            addNotification("error","error updating client",e.response?.data?.detail)
        }
    };
    useEffect(() => {
        const x= async()=>{
            if (!client?.token) return
            try {
                const api = clientRoute(`Bearer ${client.token}`); // Pass the updated client to clientRoute
                const response = await api.get("/"); // Use `await` for asynchronous calls
                setClient({...client,...response.data})
            } catch (e) {
                addNotification("error","error updating client",e.response?.data?.detail)
            }
        }
        x().then(()=> {})
    }, [client]);
    return (
        <ClientContext.Provider value={{ client, setClient, setToken }}>
            {children}
        </ClientContext.Provider>
    );
};

export { useClient, ClientContextProvider };
