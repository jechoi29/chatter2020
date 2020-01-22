import React, { useState, useEffect } from "react";
import "./App.css";
import NamePicker from "./namePicker.js";
import { db } from "./db";

function App() {
  // store messages into an empty array
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("Jung");

  useEffect(() => {
    db.listen({
      receive: m => setMessages(current => [m, ...current])
    });
  }, []);

  // check how messages are shown
  console.log(messages);

  return (
    <main>
      <header>
        <div className="logo-wrap">
          <img
            className="logo"
            alt="logo"
            src="https://cdn2.iconfinder.com/data/icons/ios7-inspired-mac-icon-set/1024/messages_5122x.png"
          />
          Chatter
        </div>
        <NamePicker onSave={setName} />
      </header>

      {/* show text messages */}
      <div className="messages">
        {messages.map((m, i) => {
          return (
            <div key={i} className="message-wrap">
              <div className="message">{m.text}</div>
            </div>
          );
        })}
      </div>

      <TextInput
        onSend={text => {
          db.send({
            text,
            name,
            ts: new Date()
          });
        }}
      />
    </main>
  );
}

function TextInput(props) {
  var [text, setText] = useState("");

  // js comment
  return (
    <div className="textbox">
      <input
        value={text}
        className="textbox-input"
        placeholder="write your message here..."
        onChange={e => setText(e.target.value)}
        // in the textbox, pressed the enter key, then sent message
        onKeyPress={e => {
          if (e.key === "Enter") {
            if (text) props.onSend(text);
            setText("");
          }
        }}
      />
      <button
        onClick={() => {
          if (text) props.onSend(text);
          setText("");
        }}
        className="button"
        disabled={!text}
      >
        SEND
      </button>
    </div>
  );
}

export default App;
