import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../firebase';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';

const StreakContext = createContext();

export function StreakProvider({ children }) {
  const { currentUser } = useAuth();
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [lastActiveDate, setLastActiveDate] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch streak data from Firestore
  useEffect(() => {
    if (!currentUser) {
      setCurrentStreak(0);
      setBestStreak(0);
      setLastActiveDate(null);
      setLoading(false);
      return;
    }

    const fetchStreakData = async () => {
      try {
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setCurrentStreak(userData.streakData?.currentStreak || 0);
          setBestStreak(userData.streakData?.bestStreak || 0);
          setLastActiveDate(userData.streakData?.lastActiveDate?.toDate?.() || null);
        } else {
          // Initialize streak data if user doc doesn't have it
          setCurrentStreak(0);
          setBestStreak(0);
          setLastActiveDate(null);
        }
      } catch (error) {
        console.error('Error fetching streak data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStreakData();
  }, [currentUser]);

  const updateStreak = async () => {
    if (!currentUser) return;

    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const userRef = doc(db, 'users', currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // User doesn't exist, create with initial streak
        await setDoc(userRef, {
          streakData: {
            currentStreak: 1,
            bestStreak: 1,
            lastActiveDate: today
          }
        }, { merge: true });
        setCurrentStreak(1);
        setBestStreak(1);
        setLastActiveDate(today);
        return;
      }

      const userData = userSnap.data();
      const streakData = userData.streakData || { currentStreak: 0, bestStreak: 0, lastActiveDate: null };
      let newCurrentStreak = streakData.currentStreak || 0;
      let newBestStreak = streakData.bestStreak || 0;

      const lastActive = streakData.lastActiveDate?.toDate?.() || null;
      let streakUpdated = false;

      if (lastActive) {
        const lastActiveDate = new Date(lastActive);
        lastActiveDate.setHours(0, 0, 0, 0);
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);

        // Calculate days difference
        const daysDiff = Math.floor((todayDate - lastActiveDate) / (1000 * 60 * 60 * 24));

        if (daysDiff === 1) {
          // Consecutive day - increment streak
          newCurrentStreak += 1;
          streakUpdated = true;
        } else if (daysDiff > 1) {
          // Streak broken - reset to 1
          newCurrentStreak = 1;
          streakUpdated = true;
        }
        // If daysDiff === 0, it's the same day, don't update
      } else {
        // First time, start streak at 1
        newCurrentStreak = 1;
        streakUpdated = true;
      }

      // Update best streak if current exceeds it
      if (newCurrentStreak > newBestStreak) {
        newBestStreak = newCurrentStreak;
      }

      // Only update if there's a change
      if (streakUpdated) {
        await updateDoc(userRef, {
          streakData: {
            currentStreak: newCurrentStreak,
            bestStreak: newBestStreak,
            lastActiveDate: today
          }
        });

        setCurrentStreak(newCurrentStreak);
        setBestStreak(newBestStreak);
        setLastActiveDate(today);
      }
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  };

  const value = {
    currentStreak,
    bestStreak,
    lastActiveDate,
    loading,
    updateStreak
  };

  return (
    <StreakContext.Provider value={value}>
      {children}
    </StreakContext.Provider>
  );
}

export function useStreak() {
  return useContext(StreakContext);
}
