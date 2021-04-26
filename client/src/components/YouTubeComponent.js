import React from 'react';

export const YouTubeComponent = ({ videoId }) => {
    return (
    <div id = "videoContainer">
        <iframe
            type="text/html"
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
        />
    </div>
    )
}