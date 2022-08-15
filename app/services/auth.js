import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import firebase from "../../firebase";

const errorTypes = {
  emailUsed: "auth/email-already-in-use",
  invalidEmail: "auth/invalid-email",
};

const parseError = (err) => {
  console.log(err);
  const { code } = err;
  let message = "Something went wrong.";

  if (code === errorTypes.emailUsed) {
    message = "Email already used.";
  } else if (code === errorTypes.invalidEmail) {
    message = "Invalid email address.";
  }

  return { err: { ...err, message }, ok: false };
};

const register = async (user) => {
  try {
    const res = await createUserWithEmailAndPassword(
      firebase.auth,
      user.email,
      user.password
    );

    await updateProfile(res.user, {
      displayName: user.name,
      photoURL: user.avatarUrl,
    });

    return { ok: true, user: res.user };
  } catch (err) {
    return parseError(err);
  }
};

const login = async (credentials) => {
  try {
    const res = await signInWithEmailAndPassword(
      firebase.auth,
      credentials.email,
      credentials.password
    );

    return { ok: true, user: res.user };
  } catch (err) {
    return parseError(err);
  }
};

const logout = async () => {
  try {
    await signOut(firebase.auth);
  } catch (err) {
    return parseError(err);
  }
};

export default {
  login,
  logout,
  register,
};
