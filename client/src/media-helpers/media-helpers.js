import axios from 'axios';

export function parseYoutubeUrl(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
}

export function parseSoundCloudUrl(url) {
    var regExp = /^(https?:\/\/)?(www\.|m\.)?(soundcloud\.com|snd\.sc)\/(.*)$\/?/;
    var match = url.match(regExp);
    return (match && match[4]) ? match[4] : false;
}

export async function getYouTubeMediaInfo(youtubeMediaId) {
    const response = await axios.get(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${youtubeMediaId}`);
    const data = response.data;

    const title = data.title;
    const artist = data.author_name;

    return { title, artist };
}

export async function getSoundCloudMediaInfo(soundCloudMediaId) {
    const response = await axios.get(`https://noembed.com/embed?url=https://soundcloud.com/${soundCloudMediaId}`);
    const data = response.data;

    const title = data.title;
    const artist = data.author_name;

    return { title, artist };
}