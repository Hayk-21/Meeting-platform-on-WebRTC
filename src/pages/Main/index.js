import {useState, useEffect, useRef} from 'react';
import socket from '../../socket';
import ACTIONS from '../../socket/actions';
import {useHistory} from 'react-router';
import {v4} from 'uuid';

export default function Main() {
  const history = useHistory();
  const [rooms, updateRooms] = useState([]);
  const rootNode = useRef();

  useEffect(() => {
    socket.on(ACTIONS.SHARE_ROOMS, ({rooms = []} = {}) => {
      if (rootNode.current) {
        updateRooms(rooms);
      }
    });
  }, []);

  var id = 1;
  return (
    <div class="master"  ref={rootNode}>
      <div class="back col-sm-1">
        <a href="/">Back</a>
      </div>
      <div class="w-100 mx-auto text-center">
        {rooms.map(roomID => (
            <a class="room" key={roomID} onClick={() => {
              history.push(`/room/${roomID}`);
            }}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Room [{id++}]
            </a>
        ))}
      </div>

      <a class="create row" onClick={() => {
        history.push(`/room/${v4()}`);
      }}>Create New Room</a>
    </div>
  );
}