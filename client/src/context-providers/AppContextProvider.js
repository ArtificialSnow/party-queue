import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { createContext, useEffect, useState } from 'react';
import { MessageTypes } from '../shared/constants.js';

export const AppContext = createContext();

export function AppContextProvider({ children }) {
    const [roomId, setRoomId] = useState(null);
    const [queuedMedia, setQueuedMedia] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [user, setUser] = useState(null);

    const [webSocket, setWebSocket] = useState(null);
    useEffect(() => {   

        // Reset old state
        setQueuedMedia([]);
        setAllUsers([]);
        setUser(null);
        if (webSocket) {
            webSocket.close();
        }

        if (!roomId) {
            return;
        }

        let roomWebSocket = new W3CWebSocket(`ws://localhost:3001/join?roomId=${roomId}`);
        setWebSocket(roomWebSocket);
        roomWebSocket.onopen = () => {
            roomWebSocket.send(JSON.stringify({ messageType: MessageTypes.CLIENT_REQUEST_QUEUE }));
            roomWebSocket.send(JSON.stringify({ messageType: MessageTypes.CLIENT_REQUEST_USERS }));
        }

        roomWebSocket.onclose = () => {
            //redirect to home page
            //you have been disconnected message
        }

        roomWebSocket.onerror = () => {
            //redirect to home page
            //an error occurred
        }

        roomWebSocket.onmessage = (e) => {
            if (typeof e.data !== 'string') {
                return;
            }

            var parsedMessage = JSON.parse(e.data);
            var messageType = parsedMessage.messageType;
            var payload = parsedMessage.payload;

            switch (messageType) {
                case (MessageTypes.SERVER_SEND_USER_IDENTIFICATION):
                    setUser(payload);
                    break;
                case (MessageTypes.SERVER_SEND_QUEUE_UPDATE):
                    setQueuedMedia(payload);
                    break;
                case (MessageTypes.SERVER_SEND_USERS_UPDATE):
                    setAllUsers(payload);
                    break;
                default:
                    break;
            }
        }
    }, [roomId]);

    function sendMessage(messageType, payload) {
        if (!webSocket) {
            return;
        }

        webSocket.send(JSON.stringify({
            messageType: messageType,
            payload: payload
        }));
    }

    const context = {
        roomId,
        setRoomId,
        queuedMedia,
        setQueuedMedia,
        allUsers,
        setAllUsers,
        user,
        setUser,
        sendMessage
    }

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
}