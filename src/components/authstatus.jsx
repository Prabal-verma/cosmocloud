"use client";

import { useEffect, useState } from 'react';
import { auth } from '../lib/firebaseConfig';
import GoogleSignIn from '../components/signin';
import Logout from '../components/logout';

const AuthStatus = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {user ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold">Welcome, {user.displayName}</h2>
            <Logout />
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-semibold">Please Sign In</h2>
            <GoogleSignIn />
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthStatus;
