import { w3cwebsocket as W3CWebSocket } from 'websocket'; 

export class WebSocketClient {

    static instance = null;

    static getInstance(roomId, nickname, addLastLocal, removeFirstLocal){
        if(!WebSocketClient.instance){
            WebSocketClient.instance = new WebSocketClient(roomId, nickname, addLastLocal, removeFirstLocal);
        } else if (WebSocketClient.instance.roomId != roomId){
            WebSocketClient.instance.socketRef.close();
            WebSocketClient.instance = new WebSocketClient(roomId, nickname, addLastLocal, removeFirstLocal);
        }
        return WebSocketClient.instance; 
    }

    constructor(roomId, nickname, addLastLocal, removeFirstLocal){
        var self = this;
        var roomId = roomId;
        this.addLastLocal = addLastLocal; 
        this.removeFirstLocal = removeFirstLocal;
        this.socketRef = new W3CWebSocket(`ws://localhost:8080/join?roomId=${roomId}&nickname=${nickname}`);
        
        this.socketRef.onopen = () => {
            console.log('WebSocket open');
        };

        this.socketRef.onmessage = (e) => {
            if (typeof e.data === 'string') {
                console.log("Received: '" + e.data + "'");
                var query = e.data.split(" ");
                if(query[0] == "addLast"){
                    this.addLastLocal(query[1]);
                    return; 
                }
                if(query[0] == "removeFirst"){
                    this.removeFirstLocal();
                }
                
            }
        };

        this.onerror = function () {
            console.log('Connection Error');
        };

        this.socketRef.onclose = function () {
            console.log('echo-protocol Client Closed');
        };
    }

    addLastExternal = (link) => {
        const socket = this.socketRef;
        socket.send("addLast "+ link);
    }

    removeFirstExternal = () => {
        const socket = this.socketRef;
        socket.send("removeFirst");
    }
}

