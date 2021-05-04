import { generateUserId } from '../../services/id-service';

export class User {
    constructor(ws) {
        this.id = generateUserId();
        this.nickname = 'Anonymous';
        this.ws = ws;
    }

    setNickname(nickname) {
        this.nickname = nickname;
    }
}