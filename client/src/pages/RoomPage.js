import { React, useState, useEffect, useRef} from 'react';
import { WebSocketClient } from '../websocket/websocket-client.js';
import { useLocalStorage } from '../global/LocalStorage';
import { YouTubeComponent } from  '../components/YouTubeComponent.js';
import { create } from 'domain';


export default function Room() {

  const [roomId, setRoomId] = useLocalStorage('roomId', "noId");
  const [creator] = useLocalStorage("isCreator", false);
  console.log(creator)

  //someone enqued a song
  function addLastLocal(link){
    var textarea = document.getElementById("queue");
    textarea.value = link; 
  }

  //Song on top has finished
  function removeFirstLocal(link){
    
  }

  const [socket] = useState(WebSocketClient.getInstance(roomId, "sheldon", addLastLocal));

  //This enqued a song
  function addLastExternal(){
    var link = document.getElementById("link").value;
    socket.addLastExternal(link);
  }

  return (
    <div>
      <div>
        <h1>Hello, welcome to! {roomId}</h1>
        <label>Enter link:</label>
        <input type="text" id="link"></input>
        <button onClick={addLastExternal}>Submit</button> */
      </div>
      <div>
        <label>Group Message:</label>
        <textarea id ="queue">
        </textarea>
      </div>
      <div>
        {creator? <YouTubeComponent videoId="UOgBFL6bJTY"></YouTubeComponent> : null}
      </div>
    </div>
  );
}
