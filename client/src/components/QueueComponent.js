import React  from 'react';
import {Component} from 'react';
import { RoomContext } from '../pages/RoomPage';

export class QueueComponent extends React.Component {

    state = {
        queue: []
    }

    addLast = (link) => {
        this.setState({
            queue: [...this.state.queue, link]
        })
    }

    removeFirst = () => {
        var array = [...this.state.queue]
        array.shift()
        this.setState({
            queue: array
        })
    }

    getFirst = () => {
        if(this.state.queue.length == 0){
            return null;
        }
        return this.state.queue[0];
    }

    getSize = () => {
        return this.state.queue.length;
    }

    render(){
        if(this.state.queue.length == 0){ return <p>No songs are in the queue</p> }
        
        return (

            this.state.queue.map((item, index) => <p key={index}>{item}</p>)  
        )
    }
   

}
