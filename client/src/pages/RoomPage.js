import { React, useState, useEffect, useRef} from 'react';
import { WebSocketClient } from '../websocket/websocket-client.js';
import { useLocalStorage } from '../global/LocalStorage';


export default function Room() {

  function addToQueue(message){
    var textarea = document.getElementById("message");
    textarea.value = message; 
  }

  const [roomId, setRoomId] = useLocalStorage('roomId', "noId");
  const [socket] = useState(WebSocketClient.getInstance(roomId, "sheldon", addToQueue));

  function sendMessage(){
    var link = document.getElementById("link").value;
    socket.sendMessage(link);
  }


  return (
    <div>
      <div>
        <h1>Hello, welcome to! {roomId}</h1>
        <label>Enter link:</label>
        <input type="text" id="link"></input>
        <button onClick={sendMessage}>Submit</button> */
      </div>
      <div>
        <label>Group Message:</label>
        <textarea id ="message">
          
        </textarea>
      </div>
    </div>
  );
}
