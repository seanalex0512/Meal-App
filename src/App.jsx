import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { TemplatesProvider } from './context/TemplatesContext';
import { StreakProvider } from './context/StreakContext';
import { StatisticsProvider } from './context/StatisticsContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import MealCategory from './pages/MealCategory';
import MealDetails from './pages/MealDetails';
import MyPlan from './pages/MyPlan';
import Templates from './pages/Templates';
import StatsHistory from './pages/StatsHistory';
import Settings from './pages/Settings';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SetupName from './pages/SetupName';

function App() {
  const [plan, setPlan] = useState({
    breakfast: null,
    lunch: null,
    dinner: null,
    snacks: []
  });

  // Load plan from localStorage on mount
  useEffect(() => {
    const savedPlan = localStorage.getItem('currentPlan');
    if (savedPlan) {
      try {
        setPlan(JSON.parse(savedPlan));
      } catch (error) {
        console.error('Error parsing saved plan:', error);
      }
    }
  }, []);

  // Sync plan to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentPlan', JSON.stringify(plan));
  }, [plan]);

  const [preferences, setPreferences] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    lowCarb: false,
    highProtein: false
  });

  return (
    <Router>
      <AuthProvider>
        <StreakProvider>
          <TemplatesProvider>
            <StatisticsProvider>
              <div className="app-container">
              <div className="main-content">
                <Routes>
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/setup-name" element={<SetupName />} />

                {/* Protected Routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Dashboard plan={plan} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/meals"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/category/:type"
                  element={
                    <ProtectedRoute>
                      <MealCategory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/meal/:id"
                  element={
                    <ProtectedRoute>
                      <MealDetails plan={plan} setPlan={setPlan} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-plan"
                  element={
                    <ProtectedRoute>
                      <MyPlan plan={plan} setPlan={setPlan} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/templates"
                  element={
                    <ProtectedRoute>
                      <Templates plan={plan} setPlan={setPlan} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/stats"
                  element={
                    <ProtectedRoute>
                      <StatsHistory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings preferences={preferences} setPreferences={setPreferences} />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              </div>
            </div>
            </StatisticsProvider>
          </TemplatesProvider>
        </StreakProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
