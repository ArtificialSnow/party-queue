import React from 'react';
import Room from './RoomPage.js';
import { useHistory } from 'react-router'
import {useLocalStorage} from '../global/LocalStorage';


export default function Home() {

  const history = useHistory();

  async function joinRoom() {
    var roomId = document.getElementById("roomId").value;
    window.localStorage.setItem("isCreator", JSON.stringify(false));
    window.localStorage.setItem("roomId", JSON.stringify(roomId));
    history.push("/RoomPage");
  }

  return (
    <div>
      <h1>Home Page</h1>
        <form>
          <label for="roomId">Room id:</label>
          <input type="text" id="roomId"></input>
          <button onClick={joinRoom}>Submit</button>
        </form>
        <a href="/CreateRoomPage">Dont have a room?</a>
    </div>
  );
}
