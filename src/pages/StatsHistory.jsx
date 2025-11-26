import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStatistics } from '../context/StatisticsContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './StatsHistory.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function StatsHistory() {
  const navigate = useNavigate();
  const { dailyStats } = useStatistics();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [graphRange, setGraphRange] = useState(30); // 30 days by default

  // Get the selected date's statistics
  const selectedDateKey = selectedDate.toISOString().split('T')[0];
  const selectedStats = dailyStats[selectedDateKey] || null;

  // Get calendar days for the current month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const calendarDays = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendarDays.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(new Date(year, month, i));
    }

    return calendarDays;
  };

  // Get data for graph
  const getGraphData = () => {
    const now = new Date();
    const labels = [];
    const calorieData = [];
    const proteinData = [];
    const carbsData = [];
    const fatsData = [];

    for (let i = graphRange - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];

      labels.push(new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));

      const stats = dailyStats[dateKey];
      calorieData.push(stats?.calories || 0);
      proteinData.push(stats?.protein || 0);
      carbsData.push(stats?.carbs || 0);
      fatsData.push(stats?.fats || 0);
    }

    return {
      labels,
      calorieData,
      proteinData,
      carbsData,
      fatsData
    };
  };

  const graphData = getGraphData();

  const chartData = {
    labels: graphData.labels,
    datasets: [
      {
        label: 'Calories',
        data: graphData.calorieData,
        borderColor: '#FF6B9D',
        backgroundColor: 'rgba(255, 107, 157, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Protein (g)',
        data: graphData.proteinData,
        borderColor: '#4ECDC4',
        backgroundColor: 'rgba(78, 205, 196, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Carbs (g)',
        data: graphData.carbsData,
        borderColor: '#FFE66D',
        backgroundColor: 'rgba(255, 230, 109, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Fats (g)',
        data: graphData.fatsData,
        borderColor: '#95E1D3',
        backgroundColor: 'rgba(149, 225, 211, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      title: {
        display: true,
        text: `Last ${graphRange} Days`
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const monthDays = getDaysInMonth(currentMonth);
  const monthYear = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="stats-history-page">
      <button
        onClick={() => navigate('/')}
        style={{
          marginBottom: '1.5rem',
          background: 'none',
          border: '1px solid var(--primary-pink)',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          color: 'var(--dark-text)',
          cursor: 'pointer',
          fontWeight: '500'
        }}
      >
        ← Back
      </button>

      <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--dark-text)', marginBottom: '1.5rem' }}>
        📊 Statistics & History
      </h1>

      <div className="stats-container">
        {/* Calendar Section */}
        <div className="calendar-section">
          <div className="calendar-header">
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              className="nav-btn"
            >
              ←
            </button>
            <h2>{monthYear}</h2>
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              className="nav-btn"
            >
              →
            </button>
          </div>

          <div className="weekdays">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="weekday">{day}</div>
            ))}
          </div>

          <div className="calendar-grid">
            {monthDays.map((day, index) => {
              if (!day) {
                return <div key={`empty-${index}`} className="calendar-day empty"></div>;
              }

              const dateKey = day.toISOString().split('T')[0];
              const stats = dailyStats[dateKey];
              const isSelected = selectedDateKey === dateKey;
              const hasData = stats && stats.calories > 0;

              return (
                <div
                  key={dateKey}
                  className={`calendar-day ${isSelected ? 'selected' : ''} ${hasData ? 'has-data' : ''}`}
                  onClick={() => setSelectedDate(day)}
                >
                  <div className="day-number">{day.getDate()}</div>
                  {hasData && (
                    <div className="day-calories">{Math.round(stats.calories)}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Date Stats */}
        <div className="selected-date-section">
          <h3>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>

          {selectedStats ? (
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🔥</div>
                <div className="stat-value">{Math.round(selectedStats.calories)}</div>
                <div className="stat-label">Calories</div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">⚡</div>
                <div className="stat-value">{selectedStats.protein}g</div>
                <div className="stat-label">Protein</div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">🍞</div>
                <div className="stat-value">{selectedStats.carbs}g</div>
                <div className="stat-label">Carbs</div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">🧈</div>
                <div className="stat-value">{selectedStats.fats}g</div>
                <div className="stat-label">Fats</div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-value">${selectedStats.cost.toFixed(2)}</div>
                <div className="stat-label">Total Cost</div>
              </div>
            </div>
          ) : (
            <div className="no-data">
              <p>No data for this date</p>
            </div>
          )}
        </div>
      </div>

      {/* Graph Section */}
      <div className="graph-section">
        <div className="graph-controls">
          <h3>Trend Analysis</h3>
          <div className="range-buttons">
            <button
              className={graphRange === 7 ? 'active' : ''}
              onClick={() => setGraphRange(7)}
            >
              7 Days
            </button>
            <button
              className={graphRange === 30 ? 'active' : ''}
              onClick={() => setGraphRange(30)}
            >
              30 Days
            </button>
            <button
              className={graphRange === 90 ? 'active' : ''}
              onClick={() => setGraphRange(90)}
            >
              90 Days
            </button>
          </div>
        </div>

        <div className="chart-container">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default StatsHistory;
