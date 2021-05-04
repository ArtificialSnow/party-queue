// Store global application constants in this file


// HTTP Responses
export const BAD_REQUEST_RESPONSE = 'HTTP/1.1 400 Bad Request\r\n\r\n';
export const NOT_FOUND_RESPONSE = 'HTTP/1.1 404 Not Found\r\n\r\n';
export const FORBIDDEN_RESPONSE = 'HTTP/1.1 403 Forbidden\r\n\r\n';


//Messaging and Media
export const MessageTypes = Object.freeze({
    CLIENT_REQUEST_QUEUE: 'client_request_queue', 
    CLIENT_REQUEST_USERS: 'client_request_users',
    CLIENT_REQUEST_ADD_MEDIA: 'client_request_add_media',
    HOST_REQUEST_NEXT_MEDIA: 'host_request_next_song',
    SERVER_SEND_QUEUE_UPDATE: 'server_send_queue',
    SERVER_SEND_USERS_UPDATE: 'server_send_users',
    SERVER_SEND_USER_JOIN: 'server_send_user_join',
    SERVER_SEND_USER_LEAVE: 'server_send_user_leave'
});

export const MediaTypes = Object.freeze({
    YOUTUBE: 'youtube',
    SPOTIFY: 'spotify',
    SOUNDCLOUD: 'soundcloud'
});