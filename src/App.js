import React, { useState } from 'react';
import './App.css';

function App() {
  return <main>

    <header>
      <img classname="logo"
        alt="logo"
        src="https://cdn2.iconfinder.com/data/icons/ios7-inspired-mac-icon-set/1024/messages_5122x.png"
      />
      Chatter
  </header>

    <div class="received-msg">
      <div class="arrow-left"></div>
      <div class="received-msg-inbox">
        <p>Hi, Jung!!</p>
      </div>
    </div>

    <div class="sending-msg">
      <div class="arrow-right"></div>
      <div class="sending-msg-inbox">
        <p>Hi, You!!❤️</p>
      </div>
    </div>

    <TextInput onSend={m => console.log(m)} />

  </main>
}

function TextInput(props) {
  const [text, setText] = useState('')

  return <div className="textbox">
    <div className="text-input-wrap">
      {/*       <input value={text} className="text-input"
        placeholder="write your message here..."
        onChange={e => setText(target.value)}
      /> */}

      <button onClick={() => {
        props.onSend(text)
        setText('')
      }} className="button">
        →
    </button>
    </div>
  </div>
}


export default App;
