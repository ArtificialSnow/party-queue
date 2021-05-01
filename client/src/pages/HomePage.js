import React from 'react';
import Room from './RoomPage.js';
import '../global/HomePage.css';
import { useHistory } from 'react-router'
import {useLocalStorage} from '../global/LocalStorage';


export default function Home() {

  const history = useHistory();

  function joinRoom() {
    var roomId = document.getElementById("roomId").value;
    window.localStorage.setItem("isCreator", JSON.stringify("f"));
    window.localStorage.setItem("roomId", JSON.stringify(roomId));
    history.push("/RoomPage");
  }

  return (
    <div class="centerBox">
      <h1 class="header">MUSICQ</h1>
        <div class="formDiv">
          <form>
            <input class="roomIdInput" placeholder="RoomID" type="text" id="roomId" disableUnderline='true' autocomplete="off"></input>
            <button class="submitRoomIdButton" onClick={joinRoom}>JOIN</button>
          </form>
        </div>
        <a class="joinRoomLink" href="/CreateRoomPage">DONT HAVE A ROOM !?</a>
    </div>
  );
}
