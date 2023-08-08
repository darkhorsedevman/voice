import logo from './logo.svg';
import './App.css';
import { useMicVAD, utils } from "@ricky0123/vad-react"

import React, { useState } from 'react';

function App() {
  const [audioList, setAudioList] = useState([])

  const vad = useMicVAD({
    onSpeechEnd: (audio) => {
      const wavBuffer = utils.encodeWAV(audio)
      const base64 = utils.arrayBufferToBase64(wavBuffer)
      const url = `data:audio/wav;base64,${base64}`
      setAudioList((old) => [url, ...old])
    },
  })

  function UserSpeaking() {
    return <span style={{ color: "green" }}>user is speaking</span>
  }
  
  function UserNotSpeaking() {
    return <span style={{ color: "red" }}>user is not speaking</span>
  }


  return (
    <div className="App">
      <header className="App-header">
        <button onClick={vad.toggle} style={{padding:10, fontSize: 15}}>
          Record
        </button>

        {vad.listening && <div>Recording</div>}
      {!vad.listening && <div>Not Recording</div>}


      {vad.userSpeaking && <UserSpeaking />}
      {!vad.userSpeaking && <UserNotSpeaking />}

      <ol id="playlist">
        {audioList.map((audioURL) => {
          return (
            <li key={audioURL.substring(-10)}>
              <audio controls src={audioURL} />
            </li>
          )
        })}
      </ol>

      </header>
    </div>
  );
}

export default App;
