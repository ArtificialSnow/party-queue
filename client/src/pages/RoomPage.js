import  React , { useState, useEffect, useRef} from 'react';
import { WebSocketClient } from '../websocket/websocket-client.js';
import { useLocalStorage } from '../global/LocalStorage';
import { YouTubeComponent } from  '../components/YouTubeComponent';
import { QueueComponent } from  '../components/QueueComponent.js';


export const RoomContext = React.createContext([]);

export default function Room() {

  const [roomId, setRoomId] = useLocalStorage('roomId', "noId");
  const [creator] = useLocalStorage("isCreator", false);
  const [queue] = useState([]);

  console.log(roomId);
  //someone enqued a song
  function addLastLocal(link){
    queue.push(link); 
  }

  //Song on top has finished
  function removeFirstLocal(link){
    queue.shift();
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
    console.log("bang")
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
        <RoomContext.Provider value={queue}>
          <QueueComponent> </QueueComponent>
        </RoomContext.Provider>
      </div>
      <div>
        {creator? <YouTubeComponent id="UOgBFL6bJTY" removeFirstExternal={removeFirstExternal}></YouTubeComponent> : null}
      </div>
    </div>
  );
}
