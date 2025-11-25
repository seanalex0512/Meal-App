import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTemplates } from '../context/TemplatesContext';
import './MyPlan.css';

function MyPlan({ plan, setPlan }) {
  const navigate = useNavigate();
  const { templates, saveTemplate, deleteTemplate } = useTemplates();
  const [showSaveTemplate, setShowSaveTemplate] = useState(false);
  const [showLoadTemplate, setShowLoadTemplate] = useState(false);
  const [templateName, setTemplateName] = useState('');


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

  const handleSaveTemplate = async () => {
    if (!templateName.trim()) {
      alert('Please enter a template name');
      return;
    }

    const success = await saveTemplate(templateName, plan);
    if (success) {
      setTemplateName('');
      setShowSaveTemplate(false);
      alert('Template saved successfully!');
    } else {
      alert('Error saving template');
    }
  };

  const handleLoadTemplate = (template) => {
    setPlan(template.plan);
    setShowLoadTemplate(false);
  };

  const handleDeleteTemplate = async (templateId) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      const success = await deleteTemplate(templateId);
      if (success) {
        alert('Template deleted');
      } else {
        alert('Error deleting template');
      }
    }
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

          <div className="template-actions">
            <button
              onClick={() => setShowSaveTemplate(true)}
              className="template-btn save-btn"
            >
              💾 Save as Template
            </button>
            {templates.length > 0 && (
              <button
                onClick={() => setShowLoadTemplate(true)}
                className="template-btn load-btn"
              >
                📂 Load Template ({templates.length})
              </button>
            )}
          </div>
        </>
      )}

      {/* Save Template Modal */}
      {showSaveTemplate && (
        <div className="modal-overlay" onClick={() => setShowSaveTemplate(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Save Meal Plan as Template</h2>
            <input
              type="text"
              placeholder="Enter template name (e.g., Gym Week, Bulk Phase)"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="template-input"
            />
            <div className="modal-actions">
              <button onClick={handleSaveTemplate} className="modal-btn primary">
                Save
              </button>
              <button onClick={() => setShowSaveTemplate(false)} className="modal-btn secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Load Template Modal */}
      {showLoadTemplate && (
        <div className="modal-overlay" onClick={() => setShowLoadTemplate(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <h2>Load a Template</h2>
            {templates.length === 0 ? (
              <p className="empty-templates">No templates saved yet</p>
            ) : (
              <div className="templates-list">
                {templates.map((template) => (
                  <div key={template.id} className="template-item">
                    <div className="template-info">
                      <h3>{template.name}</h3>
                      <div className="template-stats">
                        {template.plan.breakfast && <span>🥐 Breakfast</span>}
                        {template.plan.lunch && <span>🥗 Lunch</span>}
                        {template.plan.dinner && <span>🍝 Dinner</span>}
                        {template.plan.snacks.length > 0 && (
                          <span>🍪 {template.plan.snacks.length} Snacks</span>
                        )}
                      </div>
                    </div>
                    <div className="template-actions-small">
                      <button
                        onClick={() => handleLoadTemplate(template)}
                        className="template-item-btn load"
                        title="Load"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="template-item-btn delete"
                        title="Delete"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => setShowLoadTemplate(false)} className="modal-btn secondary">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPlan;
