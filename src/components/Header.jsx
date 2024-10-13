"use client";

import { useEffect, useState } from 'react';
import { auth } from '../lib/firebaseConfig'; // Adjust the path as necessary
import { logOut, signInWithGoogle } from '../firebaseAuth'; // Import logout and sign-in functions
import { useRouter } from 'next/navigation';

const Header = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe(); // Cleanup subscription
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      console.log("Logged out successfully");
      router.push('/auth/login'); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("Google User:", user);
    } catch (error) {
      console.error("Google Sign-In failed:", error.message);
    }
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-md">
      <div className="logo text-2xl font-bold">
        <a href="/" className="hover:text-gray-300 transition duration-200">CryptoPortfolio</a>
      </div>
      <nav>
        <ul className="flex items-center space-x-6">
          <li>
            <a href="/dashboard" className="hover:text-gray-300 transition duration-200 text-lg">Dashboard</a>
          </li>
          <li>
            <a href="/transactions" className="hover:text-gray-300 transition duration-200 text-lg">Transactions</a>
          </li>
          <li>
            <a href="/settings" className="hover:text-gray-300 transition duration-200 text-lg">Settings</a>
          </li>
          <li className="flex items-center">
            {user ? (
              <button 
                onClick={handleLogout} 
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-200 font-semibold text-lg"
              >
                Logout
              </button>
            ) : (
              // <button 
              //   onClick={handleGoogleSignIn} 
              //   className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200 font-semibold text-lg"
              // >
              //   Sign In with Google
              // </button>
              null
            )}
          </li>
        </ul>
      </nav>
      <div className="user-info text-lg">
        {user ? <span className="text-sm">Welcome, {user.displayName}</span> : (
              <button 
                onClick={handleGoogleSignIn} 
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200 font-semibold text-lg"
              >
                Sign In with Google
              </button>
              
            )}
      </div>
    </header>
  );
};

export default Header;
