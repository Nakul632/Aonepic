
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listener for Auth changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-bold tracking-tight animate-pulse">Initializing KwickPic...</p>
      </div>
    );
  }

  // Simple conditional routing based on Auth status
  return (
    <div className="antialiased text-gray-900">
      {user ? <HomePage /> : <AuthPage />}
    </div>
  );
};

export default App;
