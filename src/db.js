import { useState, useEffect } from "react";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

let store;
const coll = "messages";

function useDB(room) {
  const [messages, setMessages] = useState([]);
  function add(m) {
    setMessages(current => {
      const msgs = [m, ...current];
      msgs.sort((a, b) => b.ts.seconds - a.ts.seconds);
      return msgs;
    });
  }
  function remove(id) {
    setMessages(current => current.filter(m => m.id !== id));
  }
  useEffect(() => {
    store
      .collection(coll)
      .where("room", "==", room)
      .onSnapshot(snap =>
        snap.docChanges().forEach(c => {
          const { doc, type } = c;
          if (type === "added") add({ ...doc.data(), id: doc.id });
          if (type === "removed") remove(doc.id);
        })
      );
  }, []);
  return messages;
}

const db = {};
db.send = function(msg) {
  return store.collection(coll).add(msg);
};
db.delete = function(id) {
  return store
    .collection(coll)
    .doc(id)
    .delete();
};

export { db, useDB };

const firebaseConfig = {
  apiKey: "AIzaSyAJzmIzkRhUyOKTJCioQ9PU5ypg15kuw1A",
  authDomain: "jechoi29-chatter.firebaseapp.com",
  databaseURL: "https://jechoi29-chatter.firebaseio.com",
  projectId: "jechoi29-chatter",
  storageBucket: "jechoi29-chatter.appspot.com",
  messagingSenderId: "39488841845",
  appId: "1:39488841845:web:0ba622e862e8cb1439303c",
  measurementId: "G-ZGTXGDVXHL"
};

firebase.initializeApp(firebaseConfig);
store = firebase.firestore();
