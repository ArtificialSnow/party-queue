import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class YouTubeComponent extends React.PureComponent {
  
    componentDidMount = () => {
      // On mount, check to see if the API script is already loaded
  
        if (!window.YT) { // If not, load the script asynchronously
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
    
            // onYouTubeIframeAPIReady will load the video after the script is loaded
            window.onYouTubeIframeAPIReady = this.loadVideo;
    
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
        } else { // If script is already there, load the video directly
            this.loadVideo();
        }
    };
  
    loadVideo = () => {
        const  id  = this.props.id;
        console.log(id)
      // the Player object is created uniquely based on the id in props
        this.player = new window.YT.Player(`youtube-player`, {
        videoId: id,
        events: {
          onReady: this.onPlayerReady,
          onStateChange: this.onStateChange,
        },
      });
    };
  
    onPlayerReady = event => {
      event.target.playVideo();
    };

    onStateChange = event => {
        if(event.data == 0){
            this.props.removeFirstExternal()
        }
    }
  
    render = () => {
      return (
        <div className="video">
          <div id={`youtube-player`}/>
        </div>
      );
    };
  }