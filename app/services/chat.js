import { addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import firebase, { chatsRef } from "../../firebase";

const createChat = async (chatName) => {
  try {
    await addDoc(chatsRef, { name: chatName });
  } catch (err) {
    throw err;
  }
};

const subscribeToChats = (setChats) => {
  try {
    return onSnapshot(chatsRef, (snapshot) => {
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

export default {
  createChat,
  deleteChat,
  subscribeToChats,
};
