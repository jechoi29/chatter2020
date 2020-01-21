import React, { useState } from 'react'
import './App.css'

function App() {
  {/* store messages into an empty array */ }
  const [messages, setMessages] = useState([])

  // check how messages are shown
  console.log(messages)

  return <main>

    <header>
      <img className="logo"
        alt="logo"
        src="https://cdn2.iconfinder.com/data/icons/ios7-inspired-mac-icon-set/1024/messages_5122x.png"
      />
      Chatter
  </header>

    {/* show text messages */}
    <div className="messages">
      {messages.map((m, i) => {
        return <div key={i} className="message-wrap">
          <div className="message">{m}</div>
        </div>
      })}
    </div>

    <TextInput onSend={(text) => {
      // new messages at the beginning of the array
      setMessages([text, ...messages])
    }} />

  </main>
}

function TextInput(props) {
  var [text, setText] = useState('')

  // js comment
  return <div className="textbox">
    <input value={text}
      className="textbox-input"
      placeholder="write your message here..."
      onChange={e => setText(e.target.value)}
      onKeyPress={e => {
        if (e.key === 'Enter') {
          if (text) props.onSend(text)
          setText('')
        }
      }}
    />
    <button onClick={() => {
      if (text) props.onSend(text)
      setText('')
    }} className="button"
      disabled={!text}>
      SEND
    </button>
  </div>
}


export default App;
