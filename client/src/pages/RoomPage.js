import { React, useState, useEffect, useRef} from 'react';
import { WebSocketClient } from '../websocket/websocket-client.js';
import { useLocalStorage } from '../global/LocalStorage';


export default function Room() {

  function enqueueLocalQ(link){
    var textarea = document.getElementById("queue");
    textarea.value = link; 
  }

  function dequeueLocalQ(link){
    
  }

  const [roomId, setRoomId] = useLocalStorage('roomId', "noId");
  const [socket] = useState(WebSocketClient.getInstance(roomId, "sheldon", enqueueLocalQ));

  function enqueueExternalQ(){
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
        <textarea id ="queue">
          
        </textarea>
      </div>
    </div>
  );
}
