import React  from 'react';
import {Component, useState, useContext} from 'react';
import { RoomContext } from '../pages/RoomPage';

export function QueueComponent(){

    const queue = useContext(RoomContext); 

    if(queue.length){ return <p>No songs are in the queue</p> }
    
    return (
        [queue].map((item, index) => <p key={index}>{item}</p>)  
    )
   

}
