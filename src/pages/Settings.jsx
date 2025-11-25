import { useNavigate } from 'react-router-dom';
import './Settings.css';

function Settings({ preferences, setPreferences }) {
  const navigate = useNavigate();

  const dietaryPreferences = [
    { key: 'vegetarian', label: 'Vegetarian', icon: '🥬' },
    { key: 'vegan', label: 'Vegan', icon: '🌱' },
    { key: 'glutenFree', label: 'Gluten Free', icon: '🌾' },
    { key: 'dairyFree', label: 'Dairy Free', icon: '🥛' },
    { key: 'lowCarb', label: 'Low Carb', icon: '🥘' },
    { key: 'highProtein', label: 'High Protein', icon: '💪' },
  ];

  const handlePreferenceChange = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const selectedCount = Object.values(preferences).filter(v => v).length;

  return (
    <div className="settings-page">
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

      <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--dark-text)', marginBottom: '0.5rem' }}>
        ⚙️ Preferences
      </h1>
      <p style={{ color: 'var(--light-text)', marginBottom: '2rem' }}>
        Customize your dietary preferences
      </p>

      <div className="settings-section">
        <div className="settings-section-title">
          Dietary Preferences {selectedCount > 0 && `(${selectedCount} selected)`}
        </div>

        {dietaryPreferences.map((pref) => (
          <label key={pref.key} className="preference-item" style={{ cursor: 'pointer' }}>
            <span style={{ marginRight: '1rem', fontSize: '1.2rem' }}>{pref.icon}</span>
            <span className="preference-label">{pref.label}</span>
            <input
              type="checkbox"
              className="checkbox"
              checked={preferences[pref.key]}
              onChange={() => handlePreferenceChange(pref.key)}
            />
          </label>
        ))}
      </div>

      <div className="settings-section">
        <div className="settings-section-title">About</div>
        <div style={{ padding: 'var(--spacing-sm) 0', color: 'var(--light-text)', lineHeight: '1.6' }}>
          <p style={{ marginBottom: '1rem' }}>
            <strong>MealLove</strong> is your personal meal planning companion, designed to make selecting meals for your day simple, delightful, and personalized.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Set your dietary preferences above, and we'll help you find meals that match your lifestyle.
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--light-text)' }}>
            Version 1.0 • Made with 💕
          </p>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-section-title">Quick Stats</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          padding: 'var(--spacing-sm) 0'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--light-pink) 0%, var(--blush) 100%)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--dark-text)', marginBottom: '0.5rem' }}>
              Total Meals
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--primary-pink)' }}>
              16
            </div>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, var(--peach) 0%, var(--primary-pink) 100%)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--dark-text)', marginBottom: '0.5rem' }}>
              Categories
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--white)' }}>
              4
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: '2rem' }} />
    </div>
  );
}

export default Settings;
