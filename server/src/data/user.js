import { generateUserId } from './id-service';

export class User {
    constructor(ws) {
        this.id = generateUserId();
        this.nickname = 'Anonymous';
        this.ws = ws;
    }
}