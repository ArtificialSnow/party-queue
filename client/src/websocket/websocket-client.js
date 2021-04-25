import { w3cwebsocket as W3CWebSocket } from 'websocket'; 

export class WebSocketClient {

    

    constructor(roomId, nickname, setMessage){
        var self = this;
        this.setMessage = setMessage; 
        this.message = "A";
        this.socketRef = new W3CWebSocket(`ws://localhost:8080/join?roomId=${roomId}&nickname=${nickname}`);
        
        this.socketRef.onopen = () => {
            console.log('WebSocket open');
        };

        this.socketRef.onmessage = (e) => {
            if (typeof e.data === 'string') {
                console.log("Received: '" + e.data + "'");
                this.message = e.data;
                this.setMessage(this.message);
                console.log(this.message + " fuck")
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
        socket.send("hey");
    }
}

