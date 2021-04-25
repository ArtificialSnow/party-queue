import { w3cwebsocket as W3CWebSocket } from 'websocket'; 

export class WebSocketClient {

    static instance = null;

    static getInstance(roomId, nickname, addToQueue){
        if(!WebSocketClient.instance){
            WebSocketClient.instance = new WebSocketClient(roomId, nickname, addToQueue);
        } else if (WebSocketClient.instance.roomId != roomId){
            WebSocketClient.instance.socketRef.close();
            WebSocketClient.instance = new WebSocketClient(roomId, nickname, addToQueue);
        }
        return WebSocketClient.instance; 
    }

    constructor(roomId, nickname, addToQueue){
        var self = this;
        var roomId = roomId;
        this.addToQueue = addToQueue; 
        this.socketRef = new W3CWebSocket(`ws://localhost:8080/join?roomId=${roomId}&nickname=${nickname}`);
        
        this.socketRef.onopen = () => {
            console.log('WebSocket open');
        };

        this.socketRef.onmessage = (e) => {
            if (typeof e.data === 'string') {
                console.log("Received: '" + e.data + "'");
                this.addToQueue(e.data);
                console.log(e.data + " fuck")
            }
        };

        this.onerror = function () {
            console.log('Connection Error');
        };

        this.socketRef.onclose = function () {
            console.log('echo-protocol Client Closed');
        };
    }

    sendMessage = (message) => {
        const socket = this.socketRef;
        socket.send(message);
    }
}

