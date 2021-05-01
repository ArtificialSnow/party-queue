import  React , { useState, useEffect, useRef} from 'react';
import { WebSocketClient } from '../websocket/websocket-client.js';
import { useLocalStorage } from '../global/LocalStorage';
import { YouTubeComponent } from  '../components/YouTubeComponent';
import { QueueComponent } from  '../components/QueueComponent.js';
import '../global/RoomPage.css';
import { setInterval } from 'timers';


export default function Room() {

  const [roomId, setRoomId] = useLocalStorage('roomId', "noId");
  const [creator] = window.localStorage.getItem("isCreator");
  const queue = React.createRef();
  const youtube = React.createRef();

  console.log(roomId)


  //someone enqued a song
  function addLastLocal(videoId, songName){
    queue.current.addLast(videoId, songName);
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

  function setQueueState(videoIds, videoNames){
     queue.current.setQueueState(videoIds, videoNames);
  }

  console.log(roomId)
  const [socket] = useState(WebSocketClient.getInstance(roomId, "sheldon", addLastLocal, removeFirstLocal, setQueueState));  



  //This enqued a song
  function addLastExternal(){
    var link = document.getElementById("link").value;
    socket.addLastExternal(link);
  }

  function getQueueState(){
    socket.getQueueState();
  }

  //This removed a song, only will be called by the YouTubeComponent
  function removeFirstExternal(){
    socket.removeFirstExternal();
  }

  return (
    <div>
      <div>
        <h1>Hello, welcome to {roomId}!</h1>
        <label>Enter link:</label>
        <input class="linkIdInput" type="text" id="link"></input>
        <button class="submitLinkButton" onClick={addLastExternal}>Submit</button>
      </div>
      <div class="container">
        <div class="container-child">
          <label>Queue:</label>
            <QueueComponent getQueueState={getQueueState} ref={queue}> </QueueComponent>
        </div>
        <div class="container-child">
          {creator == "t"? <YouTubeComponent removeFirstExternal={removeFirstExternal} ref={youtube}>></YouTubeComponent> : null}
        </div>
      </div>
    </div>
  );
} 

