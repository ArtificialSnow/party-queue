import React  from 'react';
import {Component} from 'react';
import { RoomContext } from '../pages/RoomPage';

export class QueueComponent extends React.Component {

    state = {
        queueVideoIds: [],
        queueVideoNames: []
    }

    addLast = (videoId, songName) => {
        this.setState({
            queueVideoIds: [...this.state.queueVideoIds, videoId]
        }); 
        this.setState({
            queueVideoNames: [...this.state.queueVideoNames, songName]
        });
    }

    removeFirst = () => {
        var arrayIds = [...this.state.queueVideoIds]
        arrayIds.shift();
        this.setState({
            queueVideoIds: arrayIds
        });

        var arrayNames = [...this.state.queueVideoNames]
        arrayNames.shift();
        this.setState({
            queueVideoNames: arrayNames
        });
    }

    getFirst = () => {
        if(this.state.queueVideoIds.length == 0){
            return null;
        }
        return this.state.queueVideoIds[0];
    }

    getSize = () => {
        return this.state.queueVideoIds.length;
    }

    render(){
         //Change this to names when we get the names. 
        if(this.state.queueVideoNames.length == 0){ return <p>No songs are in the queue</p> }
        
        return (
            this.state.queueVideoNames.map((item, index) => <p key={index}>{item}</p>)  
        )
    }
   

}
