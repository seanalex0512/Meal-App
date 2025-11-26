import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../firebase';
import { collection, doc, setDoc, getDocs, Timestamp } from 'firebase/firestore';

const StatisticsContext = createContext();

export function StatisticsProvider({ children }) {
  const { currentUser } = useAuth();
  const [dailyStats, setDailyStats] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch all daily statistics from Firestore
  useEffect(() => {
    if (!currentUser) {
      setDailyStats({});
      setLoading(false);
      return;
    }

    const fetchStatistics = async () => {
      try {
        const statsRef = collection(db, 'users', currentUser.uid, 'dailyStats');
        const querySnapshot = await getDocs(statsRef);
        const stats = {};

        querySnapshot.docs.forEach(doc => {
          stats[doc.id] = doc.data();
        });

        setDailyStats(stats);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [currentUser]);

  // Save daily statistics
  const saveDailyStats = async (date, stats) => {
    if (!currentUser) return false;

    try {
      const dateKey = date instanceof Date
        ? date.toISOString().split('T')[0]
        : date;

      const statsRef = doc(db, 'users', currentUser.uid, 'dailyStats', dateKey);
      await setDoc(statsRef, {
        date: dateKey,
        calories: stats.calories || 0,
        protein: stats.protein || 0,
        carbs: stats.carbs || 0,
        fats: stats.fats || 0,
        cost: stats.cost || 0,
        meals: stats.meals || [],
        timestamp: Timestamp.now()
      });

      setDailyStats(prev => ({
        ...prev,
        [dateKey]: {
          date: dateKey,
          calories: stats.calories || 0,
          protein: stats.protein || 0,
          carbs: stats.carbs || 0,
          fats: stats.fats || 0,
          cost: stats.cost || 0,
          meals: stats.meals || [],
          timestamp: new Date()
        }
      }));

      return true;
    } catch (error) {
      console.error('Error saving daily stats:', error);
      return false;
    }
  };

  // Get stats for a specific date
  const getStatsForDate = (date) => {
    const dateKey = date instanceof Date
      ? date.toISOString().split('T')[0]
      : date;

    return dailyStats[dateKey] || null;
  };

  // Get stats for a date range
  const getStatsForRange = (startDate, endDate) => {
    const stats = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      const dateKey = current.toISOString().split('T')[0];
      stats.push({
        date: dateKey,
        ...dailyStats[dateKey]
      });
      current.setDate(current.getDate() + 1);
    }

    return stats;
  };

  const value = {
    dailyStats,
    loading,
    saveDailyStats,
    getStatsForDate,
    getStatsForRange
  };

  return (
    <StatisticsContext.Provider value={value}>
      {children}
    </StatisticsContext.Provider>
  );
}

export function useStatistics() {
  return useContext(StatisticsContext);
}
