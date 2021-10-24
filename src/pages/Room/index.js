import {useParams} from 'react-router';
import useWebRTC, {LOCAL_VIDEO} from '../../hooks/useWebRTC';
import '../../css/room.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import cam from '../../img/cam.png';
import micro from '../../img/micro.png';
import end from '../../img/end.png';
import chat from '../../img/chat.png';
import gear from '../../img/gear.png';
import share from '../../img/share.png';

function layout(clientsNumber) {
  const pairs = Array.from({length: clientsNumber}).reduce((acc, next, index, arr) => {
      if (index % 2 === 0) {
        acc.push(arr.slice(index, index + 2));
      }

      return acc;
    }, []);

  const rowsNumber = pairs.length;
  const height = `${100 / rowsNumber}%`;
  return pairs.map((row, index, arr) => {

    if (index === arr.length - 1 && row.length === 1) {
      return [{
        width: '100%',
        height: '90%',
      }];
    }

    return row.map(() => ({
      width: '50%',
    }));
  }).flat();
  // if (clientsNumber == 1) {
  //   return [{
  //     width: '100%',
  //     height: '100%',
  //   }];
  // } else if(clientsNumber < 10) {
  //   if (clientsNumber > 4) {
  //     return [{
  //       width: '30%',
  //     }];
  //   } else {
  //     return [{
  //       width: '50%',
  //     }];
  //   }
  // }
}



export default function Room() {
  const {id: roomID} = useParams();
  const {clients, provideMediaRef, localMediaStream} = useWebRTC(roomID);
  const videoLayout = layout(clients.length);
  
  console.log(localMediaStream);

  async function mutedFunc() {
    //   var gumStream;
    
    // const stream = navigator.getUserMedia({audio: false, video: true},
    //     function(stream) {
    //          gumStream = stream;
    //         // ...
    //     },
    //     function(error) {
    //         console.log('getUserMedia() error', error);
    //     });
    
    // // …
    
    // if (gumStream.active) {
    //     // do something with the stream
    // }\


    
    localMediaStream.current.getTracks()[0].stop();
    }
  return (
    <div id="master">
      <div id="back" class="col-sm-1">
        <a href="/rooms">Back</a>
      </div>
      <div class="col-sm-10 mt-3 mx-auto text-center cam-box">

        {clients.map((clientID, index) => {
        console.log(clientID);
        return (
            <div key={clientID} class="peer mb-3 mt-2" style={videoLayout[index]} id={clientID}>
              <video class="camera" id="camera"
                width='90%'
                ref={instance => {
                  provideMediaRef(clientID, instance);
                }}
                autoPlay
                playsInline
                muted={clientID === LOCAL_VIDEO}
              />
            </div>
          );
        })}

        <div class="panel">
          <a class="col bt rounded"><img class="w-80" src={cam}/></a>
          <a class="col bt rounded" onClick={mutedFunc}><img class="w-80" src={micro}/></a>
          <a href="/rooms" class="col bt rounded"><img class="w-80" src={end}/></a>
          <a class="col bt rounded"><img class="w-80" src={share}/></a>
        </div>
      </div>

      {/* Menu */}
      <div class="col-sm-1">
        <div class="menu">
          <a class="col bt d-inline pb-1 rounded">
            <img src={chat} class="w-80"/>
          </a>
          <a class="col bt d-inline pb-1 rounded">
            <img src={gear} class="w-80"/>
          </a>
        </div>
      </div>
    </div>
  );
}