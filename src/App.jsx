import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { TemplatesProvider } from './context/TemplatesContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import MealCategory from './pages/MealCategory';
import MealDetails from './pages/MealDetails';
import MyPlan from './pages/MyPlan';
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
        <TemplatesProvider>
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
        </TemplatesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
