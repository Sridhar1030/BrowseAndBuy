import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const baseURL = 'https://browseandbuy-1.onrender.com';
const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(baseURL);
        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
