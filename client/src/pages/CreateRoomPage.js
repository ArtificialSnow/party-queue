import {useLocalStorage} from '../global/LocalStorage';
import {useHistory} from 'react-router';
import axios from 'axios';


export default function CreateRoom() {

    const history = useHistory();
    const [roomId, setRoomId] = useLocalStorage('roomId', "noId");

    async function RequestRoomCreation() {
        const reponse = await axios.post('/api/room/create');
        const roomId = reponse.data.roomId;
        setRoomId(roomId);
        window.localStorage.setItem("isCreator", "t");
        console.log(window.localStorage.getItem("isCreator"))
        history.push("/RoomPage"); 
    }

    return (
        <div>
          <h1>Create A Room!</h1>
            <button onClick={RequestRoomCreation}>Create</button>
        </div>
      );
}
    
