import React from 'react';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { useHistory } from 'react-router';
import { DisplayModalErrorMessage } from '../App.js';
import '../global/HomePage.css';

export default function Home() {
  const history = useHistory();

  async function joinRoom() {
    var roomId = document.getElementById("roomIdInput").value;
    if (!roomId || roomId.length !== 6) {
      DisplayModalErrorMessage('Please enter a valid roomId');
      return;
    }

    const res = await axios.get(`/api/room/peek?roomId=${roomId}`);
    if (res.status !== StatusCodes.OK) {
      //Display error msg
      return;
    }

    const roomExists = res.data?.exists;
    if (!roomExists) {
      //Display error message 'The room doesnt exist'
      return;
    }

    const isFull = res.data?.isFull;
    if (isFull) {
      //Display error message 'The room is full'
      return;
    }

    history.push(`/room/${roomId}`);
  }

  async function createRoom() {
    const res = await axios.post(`/api/room/create`);
    if (res.status !== StatusCodes.CREATED) {
      //Display error msg
      return;
    }

    const roomId = res.data?.roomId;
    history.push(`/room/${roomId}`);
  }

  return (
    <div className="centerBox">
      <h1 className="header">MUSICQ</h1>
      <div className="formDiv">
        <form>
          <input className="roomIdInput" id="roomIdInput" placeholder="Room ID" type="text" disableunderline='true' autoComplete="off"></input>
          <button className="roomButton" type="button" onClick={joinRoom}>JOIN</button>
        </form>
      </div>
      <button className="roomButton" type="button" onClick={createRoom}>CREATE ROOM</button>
    </div>
  );
}
