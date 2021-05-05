import { generateMediaId } from '../../services/id-service.js';
export class Media {
    constructor(mediaName, artist, source, mediaUrl, requestedBy) {
        this.mediaName = mediaName;
        this.artist = artist;
        this.source = source;
        this.mediaUrl = mediaUrl;
        this.requestedBy = requestedBy;
        this.id = generateMediaId();
    }
}