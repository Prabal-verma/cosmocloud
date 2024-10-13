import { auth, googleProvider } from './lib/firebaseConfig'; // Adjust the import based on your structure
import { signInWithPopup, signOut } from 'firebase/auth';

// Google Sign-In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("User signed in with Google:", user);
    return user;
  } catch (error) {
    console.error("Error during Google sign in:", error.message);
    throw error;
  }
};

// Log Out User
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error during logout:", error.message);
    throw error;
  }
};
