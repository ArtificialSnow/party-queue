import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context-providers/AppContextProvider.js';
import { MediaPlayer } from '../components/MediaPlayer';
import { MediaQueue } from '../components/MediaQueue.js';
import { DisplayModalErrorMessage } from '../App.js';
import { MessageTypes } from '../shared/constants.js';
import '../global/RoomPage.css';


export default function Room() {
  const { roomId } = useParams();
  const { user, sendMessage, setRoomId, queuedMedia } = useContext(AppContext);
  useEffect(() => {
    setRoomId(roomId);
  }, [])

  function submitMedia() {
    const mediaUrl = document.querySelector('#mediaLinkInput').value;
    if (!mediaUrl) {
      return;
    }

    //Error checking to check that link is valid

    const payload = {
      mediaName: null,
      artist: null,
      source: null,
      mediaUrl: mediaUrl,
      requestedBy: user.nickname
    }
    
    sendMessage(MessageTypes.CLIENT_REQUEST_ADD_MEDIA, payload);
  }

  function parseYoutubeUrl(url) {
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      var match = url.match(regExp);
      return (match && match[7].length === 11) ? match[7] : false;
  }

  return (
    <div>
      <div>
        <h1>Hello, welcome to {roomId}!</h1>
        <label>Enter link:</label>
        <input className="mediaLinkInput" id="mediaLinkInput" type="text"></input>
        <button className="submitMediaButton" type="button" onClick={submitMedia}>Submit</button>
      </div>
      <div className="container">
        <div className="container-child">
          <label>Queue:</label>
          <MediaQueue />
        </div>
        <div className="container-child">
          <MediaPlayer queuedMedia={queuedMedia} sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}