import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import firebase, { chatsRef } from "../../firebase";

const createChat = async (info) => {
  try {
    await addDoc(chatsRef, {
      name: info.chatName,
      avatarUrl: info.user?.photoURL,
    });
  } catch (err) {
    throw err;
  }
};

const subscribeToChats = (setChats) => {
  try {
    const chatsQuery = query(chatsRef);
    return onSnapshot(chatsQuery, (snapshot) => {
      setChats(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  } catch (err) {
    throw err;
  }
};

const deleteChat = async (chatId) => {
  try {
    await deleteDoc(doc(firebase.db, "chats", chatId));
  } catch (err) {
    throw err;
  }
};

const sendMessage = async (chatId, message) => {
  try {
    const chatRef = collection(firebase.db, "chats", chatId, "messages");
    await addDoc(chatRef, { ...message, timestamp: serverTimestamp() });
  } catch (err) {
    throw err;
  }
};

const subscribeToLastChat = (setLastMssg, chatId) => {
  try {
    const chatRef = collection(firebase.db, "chats", chatId, "messages");
    const chatQuery = query(chatRef, orderBy("timestamp", "desc"), limit(1));
    return onSnapshot(chatQuery, (snapshot) => {
      const lastMssg = snapshot.docs.map((doc) => doc.data())[0];
      const message = !lastMssg?.text ? "" : lastMssg.text;
      const name = !message
        ? "No messages sent yet."
        : !lastMssg?.sender?.name
        ? "Someone:"
        : `${lastMssg.sender.name.split(" ")[0]}:`;

      setLastMssg(`${name} ${message}`);
    });
  } catch (err) {
    throw err;
  }
};

const subscribeToChat = (setMessages, chatId) => {
  try {
    const chatRef = collection(firebase.db, "chats", chatId, "messages");
    const chatQuery = query(chatRef, orderBy("timestamp", "asc"));
    return onSnapshot(chatQuery, (snapshot) => {
      const lastMssg = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(lastMssg);
    });
  } catch (err) {
    throw err;
  }
};

export default {
  createChat,
  deleteChat,
  sendMessage,
  subscribeToChat,
  subscribeToChats,
  subscribeToLastChat,
};
