import React from "react";
import { useContext } from 'react';

import "./Searcher.css";
import youtube from './api/youtube';
import { MessageTypes } from '../shared/constants.js';
import { AppContext } from '../context-providers/AppContextProvider.js';


import { InputGroup, Input } from 'reactstrap';

function VideoItem({ title, channel, img, onClickDetails, videoJson, videoIndex}) {
    function handleOnClick()
    {
        document.querySelector('#mediaLinkInput').value = `https://www.youtube.com/watch?v=${videoJson.id.videoId}`;
    }

    return (
        <div className="videoitem" key={videoIndex}>
            <div className="videoitem-imgcon" key={1}>
                <img className="videoitem-img" src={img.url}></img>
            </div>
            <div className="videoitem-desc" key={2}>
                <h5 className="videoitem-title">{title}</h5>
                <span>{channel}</span>
            </div>
            <div key={3}>
                <button onClick={() => handleOnClick()}>Add</button>
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
                        videoIndex = {index}
                    />
                );
            })}
        </div>
    );
}

class SearchBar extends React.Component {
    state = { input: "" };
    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.input);
    }
    onHandleSearch = (e) => {
        const val = e.target.value;
        this.setState({ input: val })

    }
    render() {
        return (
            <div className="searchbar">
                <form onSubmit={this.onFormSubmit}>
                    <InputGroup>
                        <Input className="searchbar-input" placeholder="Search videos" value={this.state.input} onChange={this.onHandleSearch} />
                    </InputGroup>
                </form>

            </div>
        );
    }

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

export default class Searcher extends React.Component {

    state = { videos: [], selectedVid: null, playlist: [] }

    onSubmitSearch = async (input) => {
        try {
            const res = await youtube.get('/search/', {
                params: {
                    q: input,
                    maxResults: 10,
                }
            })

            this.setState({ videos: res.data.items, selectedVid: res.data.items[0] });
        } catch (err) {
            console.log(err)
        }
        console.log(this.state.videos);

    };


    selectedVideo = (video) => {

        console.log(this.state.selectedVid);
        this.setState({ selectedVid: video });
        return;

    }

    render() {
        return (
            <div className="Searcher">
                <div className="app-navbar">
                    <SearchBox onSubmit={this.onSubmitSearch} />
                </div>

                <div className="app-videocon">
                    <div className="app-list">
                        <VideoList videos={this.state.videos} selectedVideo={this.selectedVideo} />
                    </div>
                </div>
            </div>
        );
    }
}


