import React from 'react';
import axios from 'axios';
import UseWebSocket from '../websocket/websocket-client.js';

async function buttonClick() {
  const reponse = await axios.post('/api/room/create');
  const roomId = reponse.data.roomId

  UseWebSocket(roomId, 'Peter');
}


function Room() {
  return (
    <div>
      <button onClick={buttonClick}>Click Me</button>
      <p id='asdf'>asdfgf</p>
    </div>
  );
}

export default Room;