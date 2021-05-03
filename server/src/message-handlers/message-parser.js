import { getRoomById } from '../data/room-cache.js';
import { YOUTUBE_API } from '../constants.js';
import axios from 'axios';


async function parseMessage(ws, msg) {
    const room = getRoomById(roomId);
    if (!room) {
        //reply invalid message to client
    }
    console.log(`${nickname}: ${msg} to ${roomId}`);
    var query = msg.split(" ");
    if(query[0] == "addLast"){
        var videoId = getVideoIdFromLink(query[1]);
        var videoName =  await getNameFromVideoId(videoId);
        room.addToQueue(videoId, videoName);
        room.message(JSON.stringify({
            videoId: videoId,
            videoName: videoName, 
            instruction: "A"
        }));
        return; 
    }
    if(query[0] == "removeFirst"){
        room.removeFirst();
        room.message(JSON.stringify({
            videoId: "",
            videoName: "", 
            instruction: "R"
        }));
        return; 
    }

    if(query[0] == "getQueueState"){
        var songNames = room.getQueuedSongNames();
        var songIds = room.getQueuedSongIds();
        ws.send(JSON.stringify({
            videoNames: JSON.stringify(songNames),
            videoIds: JSON.stringify(songIds), 
            instruction: "Q"
        }));
        return; 
    }
}

function getVideoIdFromLink(media){
    var words = media.split("=");
    //Assuming the last word will always be the id
    return words[words.length-1];
}


async function getNameFromVideoId(videoId){
    const queryString = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&fields=items(id%2Csnippet)&key=${YOUTUBE_API}`;
    const response = await axios.get(queryString);
    var title = response.data.items[0].snippet.title;
    return title;
} 

export {
    parseMessage,
}