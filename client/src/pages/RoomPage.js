import  React , { useState, useEffect, useRef} from 'react';
import { WebSocketClient } from '../websocket/websocket-client.js';
import { useLocalStorage } from '../global/LocalStorage';
import { YouTubeComponent } from  '../components/YouTubeComponent';
import { QueueComponent } from  '../components/QueueComponent.js';


export default function Room() {
  console.log("re-rendering bitch")
  const [roomId, setRoomId] = useLocalStorage('roomId', "noId");
  const [creator] = window.localStorage.getItem("isCreator");
  const queue = React.createRef();
  const youtube = React.createRef();


  //someone enqued a song
  function addLastLocal(link){
    queue.current.addLast(link);
    console.log(creator);
    if(queue.current.getSize() == 1 && creator == "t"){
      youtube.current.changeSong(queue.current.getFirst());
    }
  }

  //Song on top has finished
  function removeFirstLocal(){
    queue.current.removeFirst();
    if(queue.current.getSize() == 1 && creator == "t"){
      youtube.current.changeSong(queue.current.getFirst());
    }
  }

  console.log(roomId)
  const [socket] = useState(WebSocketClient.getInstance(roomId, "sheldon", addLastLocal, removeFirstLocal));

  //This enqued a song
  function addLastExternal(){
    var link = document.getElementById("link").value;
    socket.addLastExternal(link);
  }

  //This removed a song, only will be called by the YouTubeComponent
  function removeFirstExternal(){
    socket.removeFirstExternal();
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
        <label>Queue:</label>
          <QueueComponent ref={queue}> </QueueComponent>
      </div>
      <div>
        {creator == "t"? <YouTubeComponent removeFirstExternal={removeFirstExternal} ref={youtube}>></YouTubeComponent> : null}
      </div>
    </div>
  );
} 

