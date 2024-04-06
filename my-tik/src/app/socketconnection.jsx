
import { io } from 'socket.io-client';

const socket = io('http://localhost:8081');

export const subscribeToLike = (callback) => {
    socket.emit('setUniqueId', '_m60l', "");
    socket.on('like', (data) => callback(data));
};

export const subscribeToChat = (callback) => {
    socket.on('chat', (data) => callback(data));
};

export const subscribeToGift = (callback) => {
    socket.on('gift', (data) => callback(data));
};