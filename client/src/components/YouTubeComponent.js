import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { loadavg } from 'os';

export class YouTubeComponent extends React.PureComponent {


  state = {
    currentSong: ""
  }

  changeSong = (videoId) => {
    if(this.notFirstTime){
      this.player.loadVideoById(videoId);
    } else {
      this.player = new window.YT.Player(`youtube-player`, {
        videoId: videoId,
        playerVars: {'wmode': 'opaque', 'autohide': 1 , 'enablejsapi': 1},
        events: {
          onReady: this.onPlayerReady,
          onStateChange: this.onStateChange,
        },
      });
      this.notFirstTime = true; 
    }
  
  }

  componentDidMount = () => {
    // On mount, check to see if the API script is already loaded

      if (!window.YT) { // If not, load the script asynchronously
          const tag = document.createElement('script');
          tag.src = 'https://www.youtube.com/iframe_api';
  
          // onYouTubeIframeAPIReady will load the video after the script is loaded
          window.onYouTubeIframeAPIReady = this.loadVideo;
  
          const firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } 
      // If script is already there, dont do anything
  };



  onPlayerReady = event => {
    event.target.playVideo();
  };

  onStateChange = event => {
      if(event.data == 0){
        this.props.removeFirstExternal();
      }
  }

  render = () => {
    console.log("whyyy")
    return (
      <div className="video">
        <div id={`youtube-player`}/>
      </div>
    );
  };
}