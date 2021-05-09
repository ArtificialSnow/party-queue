import React, { useState } from "react";
import { useContext } from 'react';
import "./Searcher.css";
import youtube from './api/youtube';
import { MediaTypes, MessageTypes } from '../shared/constants.js';
import { AppContext } from '../context-providers/AppContextProvider.js';
import { parseYoutubeUrl, getYouTubeMediaInfo } from '../media-helpers/media-helpers.js';


import { InputGroup, Input } from 'reactstrap';


function VideoItem({ title, channel, img, onClickDetails, videoJson, videoIndex }) {

    const { user, sendMessage } = useContext(AppContext);
    async function submitVideo() {

        const mediaUrl = `https://www.youtube.com/watch?v=${videoJson.id.videoId}`;
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
    }

    return (
        <div className="videoitem" key={videoIndex}>
            <div className="videoitem-imgcon" key={1}>
                <img className="videoitem-img" src={img.url} alt="" ></img>
            </div>
            <div className="videoitem-desc" key={2}>
                <h5 className="videoitem-title">{title}</h5>
                <span>{channel}</span>
            </div>
            <div key={3}>
                <button onClick={() => submitVideo()}>Add</button>
            </div>
        </div>
    );
}

function VideoList({ videos, selectedVideo }) {

    return (
        <div className="videolist">
            {videos.map((video, index) => {
                return (
                    <VideoItem
                        videoJson={video}
                        onClickDetails={selectedVideo}
                        title={video.snippet.title}
                        channel={video.snippet.channelTitle}
                        img={video.snippet.thumbnails.default}
                        videoIndex={index}
                    />
                );
            })}
        </div>
    );
}

function SearchBar(props) {
    const [state, setState] = useState({ input: "" });
    function onFormSubmit(e){
        e.preventDefault();
        props.onSubmit(state.input);
    }
    function onHandleSearch(e){
        const val = e.target.value;
        setState({ input: val })

    }

    return (
        <div className="searchbar">
            <form onSubmit={onFormSubmit}>
                <InputGroup>
                    <Input className="searchbar-input" placeholder="Search video" value={state.input} onChange={onHandleSearch} />
                </InputGroup>
            </form>

        </div>
    );

}

function SearchBox(props) {
    return (
        <div className="navbar">
            <div className="navbar-con">
                <div className="navbar-title">
                </div>
                <div className="navbar-searchbar">
                    <SearchBar onSubmit={props.onSubmit} />
                </div>
            </div>
        </div>
    );
}

export default function Searcher() {
    const [state, setState] = useState({ videos: [], selectedVid: null, playlist: [] });

    async function onSubmitSearch(input) {
        try {
            const res = await youtube.get('/search/', {
                params: {
                    q: input,
                    maxResults: 10,
                }
            })

            setState({ videos: res.data.items, selectedVid: res.data.items[0] });
        } catch (err) {
            console.log(err)
        }
    };


    function selectedVideo(video) {

        setState({ selectedVid: video });
        return;

    }


    return (
        <div className="Searcher">
            <div className="app-navbar">
                <SearchBox onSubmit={onSubmitSearch} />
            </div>

            <div className="app-videocon">
                <div className="app-list">
                    <VideoList videos={state.videos} selectedVideo={selectedVideo} />
                </div>
            </div>
        </div>
    );

}


