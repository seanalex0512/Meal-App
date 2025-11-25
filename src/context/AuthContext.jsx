import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(true);
  const [needsNameSetup, setNeedsNameSetup] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        // Fetch display name from Firestore
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const savedDisplayName = userDocSnap.data().displayName;
            const isFirstTime = userDocSnap.data().isFirstTime;

            // If user hasn't customized their name (first time), show setup
            if (isFirstTime === true) {
              setDisplayName(user.displayName || 'Friend');
              setNeedsNameSetup(true);
            } else {
              setDisplayName(savedDisplayName || user.displayName || 'Friend');
              setNeedsNameSetup(false);
            }
          } else {
            setDisplayName(user.displayName || 'Friend');
            setNeedsNameSetup(false);
          }
        } catch (error) {
          console.error('Error fetching display name:', error);
          setDisplayName(user.displayName || 'Friend');
          setNeedsNameSetup(false);
        }
      } else {
        setCurrentUser(null);
        setDisplayName('');
        setNeedsNameSetup(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  const updateDisplayName = async (newName) => {
    if (currentUser) {
      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userDocRef, {
          displayName: newName,
          isFirstTime: false
        });
        setDisplayName(newName);
        setNeedsNameSetup(false);
        return true;
      } catch (error) {
        console.error('Error updating display name:', error);
        return false;
      }
    }
  };

  const value = {
    currentUser,
    displayName,
    logout,
    updateDisplayName,
    needsNameSetup,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
