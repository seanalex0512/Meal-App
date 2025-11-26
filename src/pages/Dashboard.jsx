import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useStreak } from '../context/StreakContext';
import { useStatistics } from '../context/StatisticsContext';
import './Dashboard.css';

function Dashboard({ plan }) {
  const navigate = useNavigate();
  const { logout, displayName } = useAuth();
  const { currentStreak, bestStreak, updateStreak } = useStreak();
  const { saveDailyStats } = useStatistics();

  // Calculate daily stats from plan
  const calculateStats = () => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    if (plan.breakfast) {
      totalCalories += plan.breakfast.calories;
      totalProtein += plan.breakfast.protein;
      totalCarbs += plan.breakfast.carbs;
      totalFats += plan.breakfast.fats;
    }
    if (plan.lunch) {
      totalCalories += plan.lunch.calories;
      totalProtein += plan.lunch.protein;
      totalCarbs += plan.lunch.carbs;
      totalFats += plan.lunch.fats;
    }
    if (plan.dinner) {
      totalCalories += plan.dinner.calories;
      totalProtein += plan.dinner.protein;
      totalCarbs += plan.dinner.carbs;
      totalFats += plan.dinner.fats;
    }
    plan.snacks.forEach(snack => {
      totalCalories += snack.calories;
      totalProtein += snack.protein;
      totalCarbs += snack.carbs;
      totalFats += snack.fats;
    });

    return { totalCalories, totalProtein, totalCarbs, totalFats };
  };

  const calculateTotalCost = () => {
    let totalCost = 0;

    if (plan.breakfast) totalCost += plan.breakfast.price || 0;
    if (plan.lunch) totalCost += plan.lunch.price || 0;
    if (plan.dinner) totalCost += plan.dinner.price || 0;
    plan.snacks.forEach(snack => {
      totalCost += snack.price || 0;
    });

    return totalCost;
  };

  // Update streak and save daily stats when component mounts or plan changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (plan && (plan.breakfast || plan.lunch || plan.dinner || (plan.snacks && plan.snacks.length > 0))) {
      updateStreak();

      // Calculate stats and save them
      const stats = calculateStats();
      saveDailyStats(new Date(), {
        calories: stats.totalCalories,
        protein: stats.totalProtein,
        carbs: stats.totalCarbs,
        fats: stats.totalFats,
        cost: calculateTotalCost(),
        meals: plan
      });
    }
  }, [plan, updateStreak, saveDailyStats]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const dailyCalorieGoal = 2000;
  const stats = calculateStats();
  const caloriePercentage = Math.min((stats.totalCalories / dailyCalorieGoal) * 100, 100);
  const remainingCalories = Math.max(dailyCalorieGoal - stats.totalCalories, 0);
  const hasCompletedGoal = stats.totalCalories >= dailyCalorieGoal;


  // Get current day of week
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Create week calendar
  const getWeekDays = () => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const week = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(date.getDate() + i);
      week.push({
        day: days[date.getDay()].slice(0, 3),
        date: date.getDate(),
        isToday: date.getDate() === new Date().getDate()
      });
    }
    return week;
  };

  const weekDays = getWeekDays();

  return (
    <div className="dashboard-page">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-header">
          <div>
            <p className="welcome-greeting">Welcome back! 👋</p>
            <h1 className="welcome-title" style={{ margin: 0 }}>{displayName}</h1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div className="welcome-emoji">🍽️</div>
            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--dark-text)',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: '600',
                opacity: 0.7,
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0.7'}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Week Calendar */}
        <div className="week-calendar">
          {weekDays.map((day, index) => (
            <div
              key={index}
              className={`week-day ${day.isToday ? 'today' : ''}`}
            >
              <div className="day-name">{day.day}</div>
              <div className="day-date">{day.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Stats Section */}
      <div className="main-stats-container">
        {/* Calorie Progress */}
        <div className="calorie-card">
          <div className="calorie-header">
            <h2>Today's Progress</h2>
            <span className={`calorie-status ${hasCompletedGoal ? 'completed' : 'in-progress'}`}>
              {hasCompletedGoal ? '✨ Goal Reached!' : '🎯 Keep Going!'}
            </span>
          </div>

          <div className="calorie-display">
            <div className="calorie-big-number">
              {stats.totalCalories}
              <span className="calorie-unit">kcal</span>
            </div>
            <div className="calorie-goal">
              of {dailyCalorieGoal} kcal
            </div>
          </div>

          {/* Progress Ring */}
          <div className="progress-ring-container">
            <svg className="progress-ring-svg" viewBox="0 0 200 200">
              {/* Background circle */}
              <circle
                className="progress-ring-bg"
                cx="100"
                cy="100"
                r="90"
              />
              {/* Progress circle */}
              <circle
                className="progress-ring"
                cx="100"
                cy="100"
                r="90"
                style={{
                  strokeDasharray: `${(caloriePercentage / 100) * 565.5} 565.5`
                }}
              />
            </svg>
            <div className="progress-percentage">{Math.round(caloriePercentage)}%</div>
          </div>

          {remainingCalories > 0 && !hasCompletedGoal && (
            <div className="remaining-info">
              <p className="remaining-text">
                {remainingCalories} kcal to go! 💪
              </p>
            </div>
          )}

          {hasCompletedGoal && (
            <div className="completed-info">
              <p className="completed-text">
                You've reached your goal today! 🎉
              </p>
            </div>
          )}
        </div>

        {/* Streak Section */}
        <div className="streak-card">
          <div className="streak-header">
            <h3>Your Streak 🔥</h3>
          </div>

          <div className="streak-display">
            <div className="streak-number">{currentStreak}</div>
            <div className="streak-label">days</div>
          </div>

          <div className="streak-info">
            <p className="streak-text">Keep it up!</p>
            <p className="streak-best">Best: {bestStreak} days</p>
          </div>
        </div>
      </div>

      {/* Quick Macros */}
      <div className="macros-section">
        <h3 className="section-title">Macros</h3>
        <div className="macros-grid">
          <div className="macro-item">
            <div className="macro-icon">⚡</div>
            <div className="macro-value">{stats.totalProtein}g</div>
            <div className="macro-label">Protein</div>
          </div>
          <div className="macro-item">
            <div className="macro-icon">🍞</div>
            <div className="macro-value">{stats.totalCarbs}g</div>
            <div className="macro-label">Carbs</div>
          </div>
          <div className="macro-item">
            <div className="macro-icon">🧈</div>
            <div className="macro-value">{stats.totalFats}g</div>
            <div className="macro-label">Fats</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button
          className="action-btn primary"
          onClick={() => navigate('/meals')}
        >
          🍽️ Pick Meals
        </button>
        <button
          className="action-btn primary"
          onClick={() => navigate('/my-plan')}
        >
          📋 View Plan
        </button>
        <button
          className="action-btn primary"
          onClick={() => navigate('/stats')}
        >
          📊 Statistics
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
