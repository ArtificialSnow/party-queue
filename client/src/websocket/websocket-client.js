import { w3cwebsocket as W3CWebSocket } from 'websocket'; 

export class WebSocketClient {

    static instance = null;

    static getInstance(roomId, nickname, addLastLocal, removeFirstLocal, setQueueState){
        if (!WebSocketClient.instance) {
            WebSocketClient.instance = new WebSocketClient(roomId, nickname, addLastLocal, removeFirstLocal, setQueueState);
        } else if (WebSocketClient.instance.roomId != roomId) {
            WebSocketClient.instance.socketRef.close();
            WebSocketClient.instance = new WebSocketClient(roomId, nickname, addLastLocal, removeFirstLocal, setQueueState);
        }

        return WebSocketClient.instance; 
    }

    constructor(roomId, nickname, addLastLocal, removeFirstLocal, setQueueState){
        var self = this;
        var roomId = roomId;
        this.addLastLocal = addLastLocal; 
        this.removeFirstLocal = removeFirstLocal;
        this.setQueueState = setQueueState; 
        this.socketRef = new W3CWebSocket(`ws://localhost:3001/join?roomId=${roomId}`);
        
        this.socketRef.onopen = () => {
            console.log('WebSocket open');
        };

        this.socketRef.onmessage = (e) => {
            if (typeof e.data === 'string') {
                console.log("Received: '" + e.data + "'");
                var instruction = JSON.parse(e.data).instruction;
                if(instruction == "A"){
                    var videoId = JSON.parse(e.data).videoId;
                    var videoName = JSON.parse(e.data).videoName;
                    console.log(videoId + " "+videoName + " "+instruction);
                    this.addLastLocal(videoId, videoName);
                    return; 
                }
                if(instruction == "R"){
                    this.removeFirstLocal();
                    return;
                }
            
                if(instruction == "Q"){
                    var videoIds = JSON.parse(JSON.parse(e.data).videoIds);
                    var videoNames = JSON.parse(JSON.parse(e.data).videoNames);
                    console.log(videoNames);
                    this.setQueueState(videoIds, videoNames);
                    return; 
                }
            }

        };

        this.onerror = function () {
            console.log('Connection Error');
        };

        this.socketRef.onclose = function () {
            console.log('Client Closed');
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

    getQueueState = async () => {
        const socket = this.socketRef; 
        if (socket.readyState !== socket.OPEN) {
            try {
                await this.waitForOpenConnection(socket)
                socket.send("getQueueState");
            } catch (err) { console.error(err) }
        } else {
            socket.send("getQueueState");
        }
    }

    waitForOpenConnection = (socket) => {
        return new Promise((resolve, reject) => {
            const maxNumberOfAttempts = 10;
            const intervalTime = 200 //ms
    
            let currentAttempt = 0;
            const interval = setInterval(() => {
                if (currentAttempt > maxNumberOfAttempts - 1) {
                    clearInterval(interval)
                    reject(new Error('Maximum number of attempts exceeded'))
                } else if (socket.readyState === socket.OPEN) {
                    console.log("opened");
                    clearInterval(interval)
                    resolve()
                }
                currentAttempt++
            }, intervalTime)
        })
    }

}

