import React from 'react';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context-providers/AppContextProvider.js';
import { MediaPlayer } from '../components/MediaPlayer';
import { MediaQueue } from '../components/MediaQueue.js';
import { DisplayModalErrorMessage } from '../App.js';
import { MessageTypes, MediaTypes } from '../shared/constants.js';
import { parseYoutubeUrl, getYouTubeMediaInfo, parseSoundCloudUrl, getSoundCloudMediaInfo } from '../media-helpers/media-helpers.js';
import { UserList } from '../components/UserList.js';
import '../global/RoomPage.css';


export default function Room() {
  const { roomId } = useParams();
  const { user, sendMessage, setRoomId } = useContext(AppContext);
  useEffect(() => {
    setRoomId(roomId);
  }, [])

  async function submitMedia() {
    const mediaUrl = document.querySelector('#mediaLinkInput').value;
    if (!mediaUrl) {
      return;
    }

    const youtubeMediaId = parseYoutubeUrl(mediaUrl);
    if (youtubeMediaId) {
      const { title, artist } = await getYouTubeMediaInfo(youtubeMediaId);

      const payload = {
        mediaName: title,
        artist: artist,
        source: MediaTypes.YOUTUBE,
        mediaUrl: mediaUrl,
        requestedBy: user.nickname
      }

      sendMessage(MessageTypes.CLIENT_REQUEST_ADD_MEDIA, payload);
      return;
    }

    const soundCloudMediaId = parseSoundCloudUrl(mediaUrl);
    if (soundCloudMediaId) {
      const { title, artist } = await getSoundCloudMediaInfo(soundCloudMediaId);

      const payload = {
        mediaName: title,
        artist: artist,
        source: MediaTypes.SOUNDCLOUD,
        mediaUrl: mediaUrl,
        requestedBy: user.nickname
      }

      sendMessage(MessageTypes.CLIENT_REQUEST_ADD_MEDIA, payload);
      return;
    }

    DisplayModalErrorMessage('Invalid url');
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
          {user?.isHost ? <MediaPlayer /> : null}
        </div>
        <div className="container-child">
          <UserList />
        </div>
      </div>
    </div>
  );
}