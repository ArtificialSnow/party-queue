import React from 'react';
import axios from 'axios';


async function buttonClick() {
  const response = await axios.post('/api/room/create');
  if (response.headers) {
    document.getElementById('asdf').innerHTML = `${response.headers['location']}`;
    console.log(response.headers);
  }
  else {
    document.getElementById('asdf').innerHTML = `no header`;
  }
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