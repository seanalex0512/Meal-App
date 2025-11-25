import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

function SetupName() {
  const navigate = useNavigate();
  const { displayName, updateDisplayName } = useAuth();
  const [nameInput, setNameInput] = useState(displayName || '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSaveName = async (e) => {
    e.preventDefault();
    setError('');

    if (!nameInput.trim()) {
      setError('Please enter a name');
      return;
    }

    setIsSaving(true);
    try {
      const success = await updateDisplayName(nameInput.trim());
      if (success) {
        navigate('/');
      } else {
        setError('Failed to save name. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">🍽️</div>
          <h1 className="auth-title">Autistic Gorilla</h1>
          <p className="auth-subtitle">Your Personal Meal Planner</p>
        </div>

        <form onSubmit={handleSaveName} className="auth-form">
          <h2 className="auth-form-title">Welcome!</h2>
          <p style={{ color: 'var(--light-text)', marginBottom: '1.5rem' }}>
            What would you like to be called?
          </p>

          {error && (
            <div className="error-message">
              <span>⚠️</span> {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={isSaving || !nameInput.trim()}
            className="auth-btn primary"
          >
            {isSaving ? 'Setting up...' : 'Get Started'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SetupName;
