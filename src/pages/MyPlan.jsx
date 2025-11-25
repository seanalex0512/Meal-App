import { useNavigate } from 'react-router-dom';
import './MyPlan.css';

function MyPlan({ plan, setPlan }) {
  const navigate = useNavigate();


  const hasAnyMeals = plan.breakfast || plan.lunch || plan.dinner || plan.snacks.length > 0;

  const calculateTotals = () => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;
    let totalCost = 0;

    if (plan.breakfast) {
      totalCalories += plan.breakfast.calories;
      totalProtein += plan.breakfast.protein;
      totalCarbs += plan.breakfast.carbs;
      totalFats += plan.breakfast.fats;
      totalCost += plan.breakfast.price;
    }
    if (plan.lunch) {
      totalCalories += plan.lunch.calories;
      totalProtein += plan.lunch.protein;
      totalCarbs += plan.lunch.carbs;
      totalFats += plan.lunch.fats;
      totalCost += plan.lunch.price;
    }
    if (plan.dinner) {
      totalCalories += plan.dinner.calories;
      totalProtein += plan.dinner.protein;
      totalCarbs += plan.dinner.carbs;
      totalFats += plan.dinner.fats;
      totalCost += plan.dinner.price;
    }
    plan.snacks.forEach(snack => {
      totalCalories += snack.calories;
      totalProtein += snack.protein;
      totalCarbs += snack.carbs;
      totalFats += snack.fats;
      totalCost += snack.price;
    });

    return { totalCalories, totalProtein, totalCarbs, totalFats, totalCost };
  };

  const totals = calculateTotals();

  const removeMeal = (category, index = null) => {
    if (category === 'snacks' && index !== null) {
      setPlan(prev => ({
        ...prev,
        snacks: prev.snacks.filter((_, i) => i !== index)
      }));
    } else {
      setPlan(prev => ({
        ...prev,
        [category]: null
      }));
    }
  };

  const replaceMeal = (category, index = null) => {
    // For simplicity, we'll just navigate to the category
    navigate(`/category/${category}`);
  };

  const categoryLabels = {
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
    snacks: 'Snacks'
  };

  return (
    <div className="my-plan-page">
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

      <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--dark-text)', marginBottom: '1.5rem' }}>
        📋 My Plan for Today
      </h1>

      {!hasAnyMeals ? (
        <div className="empty-state">
          <div className="empty-state-icon">💕</div>
          <div className="empty-state-text">Your plan is empty</div>
          <div className="empty-state-subtext">Pick your favorite meals to get started</div>
          <button
            onClick={() => navigate('/meals')}
            style={{
              marginTop: '1.5rem',
              background: 'linear-gradient(135deg, var(--light-pink) 0%, var(--blush) 100%)',
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-lg)',
              border: 'none',
              color: 'var(--dark-text)',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 2px 8px var(--shadow-soft)'
            }}
          >
            Browse Meals
          </button>
        </div>
      ) : (
        <>
          <div className="plan-summary">
            <div className="plan-summary-title">Today's Summary</div>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Calories</span>
                <span className="summary-value">{Math.round(totals.totalCalories)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Protein</span>
                <span className="summary-value">{totals.totalProtein}g</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Carbs</span>
                <span className="summary-value">{totals.totalCarbs}g</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Fats</span>
                <span className="summary-value">{totals.totalFats}g</span>
              </div>
            </div>

            <div className="total-cost">
              <span className="cost-label">Estimated Total Cost</span>
              <span className="cost-value">${totals.totalCost.toFixed(2)}</span>
            </div>
          </div>

          <div className="plan-meals">
            {plan.breakfast && (
              <div className="plan-meal-card">
                <div className="plan-meal-emoji">{plan.breakfast.icon}</div>
                <div className="plan-meal-info">
                  <span className="plan-meal-type">🥐 {categoryLabels.breakfast}</span>
                  <div className="plan-meal-title">{plan.breakfast.name}</div>
                  <span className="plan-meal-price">${plan.breakfast.price.toFixed(2)}</span>
                </div>
                <div className="meal-controls">
                  <button
                    className="meal-btn-small"
                    onClick={() => replaceMeal('breakfast')}
                    title="Replace"
                  >
                    🔄
                  </button>
                  <button
                    className="meal-btn-small"
                    onClick={() => removeMeal('breakfast')}
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {plan.lunch && (
              <div className="plan-meal-card">
                <div className="plan-meal-emoji">{plan.lunch.icon}</div>
                <div className="plan-meal-info">
                  <span className="plan-meal-type">🥗 {categoryLabels.lunch}</span>
                  <div className="plan-meal-title">{plan.lunch.name}</div>
                  <span className="plan-meal-price">${plan.lunch.price.toFixed(2)}</span>
                </div>
                <div className="meal-controls">
                  <button
                    className="meal-btn-small"
                    onClick={() => replaceMeal('lunch')}
                    title="Replace"
                  >
                    🔄
                  </button>
                  <button
                    className="meal-btn-small"
                    onClick={() => removeMeal('lunch')}
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {plan.dinner && (
              <div className="plan-meal-card">
                <div className="plan-meal-emoji">{plan.dinner.icon}</div>
                <div className="plan-meal-info">
                  <span className="plan-meal-type">🍝 {categoryLabels.dinner}</span>
                  <div className="plan-meal-title">{plan.dinner.name}</div>
                  <span className="plan-meal-price">${plan.dinner.price.toFixed(2)}</span>
                </div>
                <div className="meal-controls">
                  <button
                    className="meal-btn-small"
                    onClick={() => replaceMeal('dinner')}
                    title="Replace"
                  >
                    🔄
                  </button>
                  <button
                    className="meal-btn-small"
                    onClick={() => removeMeal('dinner')}
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {plan.snacks.map((snack, index) => (
              <div key={index} className="plan-meal-card">
                <div className="plan-meal-emoji">{snack.icon}</div>
                <div className="plan-meal-info">
                  <span className="plan-meal-type">🍪 {categoryLabels.snacks}</span>
                  <div className="plan-meal-title">{snack.name}</div>
                  <span className="plan-meal-price">${snack.price.toFixed(2)}</span>
                </div>
                <div className="meal-controls">
                  <button
                    className="meal-btn-small"
                    onClick={() => removeMeal('snacks', index)}
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/meals')}
            className="add-more-btn"
          >
            + Add More Meals
          </button>
        </>
      )}
    </div>
  );
}

export default MyPlan;
