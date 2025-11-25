import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const categories = [
    { type: 'breakfast', label: 'Breakfast', icon: '🥐' },
    { type: 'lunch', label: 'Lunch', icon: '🥗' },
    { type: 'dinner', label: 'Dinner', icon: '🍝' },
    { type: 'snacks', label: 'Snacks', icon: '🍪' },
  ];

  return (
    <div className="home-page">
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
          fontWeight: '500',
          fontSize: '0.95rem'
        }}
      >
        ← Back
      </button>

      <div className="greeting">What Do You Feel Like Having? 🍽️</div>

      <div className="category-grid">
        {categories.map((category) => (
          <button
            key={category.type}
            className="category-btn"
            onClick={() => navigate(`/category/${category.type}`)}
          >
            <span className="category-icon">{category.icon}</span>
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      <div className="meal-plans-section">
        <button
          className="meal-plans-btn"
          onClick={() => navigate('/my-plan')}
        >
          📋 View My Plan
        </button>
      </div>

      <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
        <button
          className="meal-plans-btn templates-btn"
          onClick={() => navigate('/templates')}
        >
          💾 Save & Manage Templates
        </button>
      </div>

      <div style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
        <button
          className="meal-plans-btn"
          onClick={() => navigate('/settings')}
        >
          ⚙️ Preferences
        </button>
      </div>
    </div>
  );
}

export default Home;
