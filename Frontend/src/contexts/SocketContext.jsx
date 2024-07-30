// SocketContext.js
import React, { createContext, useContext } from 'react';
import { io } from 'socket.io-client';

const baseURL = 'http://localhost:3000';
const socket = io(baseURL);

const SocketContext = createContext();

export const SocketProvider = ({ children }) => (
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
);

export const useSocket = () => useContext(SocketContext);
