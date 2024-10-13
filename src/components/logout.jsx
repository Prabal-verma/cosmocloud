"use client";

import { logOut } from '../firebaseAuth';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await logOut();
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <button 
      onClick={handleLogout} 
      className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded shadow hover:bg-red-600 transition"
    >
      Log Out
    </button>
  );
};

export default Logout;
