import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTemplates } from '../context/TemplatesContext';
import './Templates.css';

function Templates() {
  const navigate = useNavigate();
  const { templates, loading, saveTemplate, deleteTemplate } = useTemplates();
  const [templateName, setTemplateName] = useState('');
  const [currentPlan, setCurrentPlan] = useState(null);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedPlan = localStorage.getItem('currentPlan');
    if (savedPlan) {
      setCurrentPlan(JSON.parse(savedPlan));
    }
  }, []);

  const handleSaveTemplate = async () => {
    if (!templateName.trim()) {
      alert('Please enter a template name');
      return;
    }

    if (!currentPlan || (!currentPlan.breakfast && !currentPlan.lunch && !currentPlan.dinner && currentPlan.snacks.length === 0)) {
      alert('Please create a meal plan before saving as template');
      return;
    }

    setIsSaving(true);
    const success = await saveTemplate(templateName, currentPlan);
    setIsSaving(false);

    if (success) {
      setTemplateName('');
      setShowSaveForm(false);
      alert('Template saved successfully!');
    } else {
      alert('Error saving template');
    }
  };

  const handleLoadTemplate = (template) => {
    localStorage.setItem('currentPlan', JSON.stringify(template.plan));
    navigate('/my-plan');
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

  const getMealSummary = (plan) => {
    let totalCalories = 0;
    let mealCount = 0;

    if (plan.breakfast) {
      totalCalories += plan.breakfast.calories;
      mealCount++;
    }
    if (plan.lunch) {
      totalCalories += plan.lunch.calories;
      mealCount++;
    }
    if (plan.dinner) {
      totalCalories += plan.dinner.calories;
      mealCount++;
    }
    mealCount += plan.snacks.length;
    totalCalories += plan.snacks.reduce((sum, snack) => sum + snack.calories, 0);

    return { totalCalories, mealCount };
  };

  return (
    <div className="templates-page">
      <button
        onClick={() => navigate('/my-plan')}
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
        📋 Saved Templates
      </h1>

      {/* Save New Template Section */}
      <div className="save-template-section">
        {!showSaveForm ? (
          <button
            onClick={() => setShowSaveForm(true)}
            className="save-template-btn"
          >
            💾 Save Current Plan as Template
          </button>
        ) : (
          <div className="template-form">
            <h3>Save Your Meal Plan</h3>
            <input
              type="text"
              placeholder="Give your template a name (e.g., Gym Week, Bulk Phase)"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="template-name-input"
              autoFocus
            />
            <div className="form-actions">
              <button
                onClick={handleSaveTemplate}
                disabled={isSaving}
                className="form-btn primary"
              >
                {isSaving ? 'Saving...' : 'Save Template'}
              </button>
              <button
                onClick={() => {
                  setShowSaveForm(false);
                  setTemplateName('');
                }}
                className="form-btn secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Templates List */}
      <div className="templates-container">
        {loading ? (
          <div className="loading">Loading templates...</div>
        ) : templates.length === 0 ? (
          <div className="empty-templates-state">
            <div className="empty-icon">📭</div>
            <h2>No templates yet</h2>
            <p>Create a meal plan and save it as a template to use later!</p>
          </div>
        ) : (
          <div className="templates-grid">
            {templates.map((template) => {
              const { totalCalories, mealCount } = getMealSummary(template.plan);
              return (
                <div key={template.id} className="template-card">
                  <div className="template-header">
                    <h3>{template.name}</h3>
                    <button
                      onClick={() => handleDeleteTemplate(template.id)}
                      className="delete-btn"
                      title="Delete template"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="template-stats">
                    <div className="stat">
                      <span className="stat-value">{mealCount}</span>
                      <span className="stat-label">Meals</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{Math.round(totalCalories)}</span>
                      <span className="stat-label">Calories</span>
                    </div>
                  </div>

                  <div className="template-meals">
                    {template.plan.breakfast && (
                      <div className="meal-tag">🥐 {template.plan.breakfast.name}</div>
                    )}
                    {template.plan.lunch && (
                      <div className="meal-tag">🥗 {template.plan.lunch.name}</div>
                    )}
                    {template.plan.dinner && (
                      <div className="meal-tag">🍝 {template.plan.dinner.name}</div>
                    )}
                    {template.plan.snacks.map((snack, idx) => (
                      <div key={idx} className="meal-tag">🍪 {snack.name}</div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleLoadTemplate(template)}
                    className="load-btn"
                  >
                    Use This Template
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Templates;
