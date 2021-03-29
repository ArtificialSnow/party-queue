import React from 'react';
import UseWebSocket from '../websocket/websocket-client.js';

async function buttonClick() {
  UseWebSocket();
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