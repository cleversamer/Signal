import { addDoc } from "firebase/firestore";
import { chatsRef } from "../../firebase";

const createChat = async (chatName) => {
  try {
    await addDoc(chatsRef, { name: chatName });
  } catch (err) {
    throw err;
  }
};

export default {
  createChat,
};
