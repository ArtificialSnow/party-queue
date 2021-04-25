import { React, useState, useEffect, useRef} from 'react';
import { WebSocketClient } from '../websocket/websocket-client.js';
import { useLocalStorage } from '../global/LocalStorage';



export function setMessage(message){
  window.localStorage.setItem("message", JSON.stringify(message));
}
const roomId = window.localStorage.getItem("roomId");
const socket = new WebSocketClient(roomId, "sheldon", setMessage);

export default function Room() {

  const [message, setMessage] = useLocalStorage(""); 

  useEffect(() => {
    console.log("message changed")
    var textarea = document.getElementById("message");
    textarea.value = message; 
  }, [message]);

  return (
    <div>
      <div>
        <h1>Hello, welcome to! {roomId}</h1>
        <label>Enter link:</label>
        <input type="text" id="link"></input>
        <button onClick={socket.sendMessage}>Submit</button> */
      </div>
      <div>
        <label>Group Message:</label>
        <textarea id ="message">
          {socket.message}
        </textarea>
      </div>
    </div>
  );
}
