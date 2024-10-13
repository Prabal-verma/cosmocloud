"use client";

import { signInWithGoogle } from '../firebaseAuth';

const GoogleSignIn = () => {
  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("Google User:", user);
    } catch (error) {
      console.error("Google Sign-In failed:", error.message);
    }
  };

  return (
    <button 
      onClick={handleGoogleSignIn} 
      className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition duration-200 text-lg"
    >
      Sign In with Google
    </button>
  );
};

export default GoogleSignIn;
