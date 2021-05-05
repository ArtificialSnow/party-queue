import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context-providers/AppContextProvider.js';
import { MessageTypes } from '../shared/constants.js';
import ReactPlayer from 'react-player';

export function MediaPlayer() {
  const { queuedMedia, sendMessage } = useContext(AppContext);
  const currentMedia = (!queuedMedia || queuedMedia.length === 0) ? null : queuedMedia[0];
  const url = currentMedia?.mediaUrl;
  const id = currentMedia?.id;

  function nextVideo() {
    sendMessage(MessageTypes.HOST_REQUEST_NEXT_MEDIA, null);
  }

  return (
    <div className='player-wrapper'>
      <ReactPlayer
        className='react-player'
        id='react-player'
        key={id}
        url={url}
        onEnded={nextVideo}
        controls={true}
        playing={true}
        width='100%'
        height='100%'
      />
    </div>
  );
}