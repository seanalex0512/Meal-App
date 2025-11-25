import { useParams, useNavigate } from 'react-router-dom';
import './MealCategory.css';

function MealCategory() {
  const { type } = useParams();
  const navigate = useNavigate();

  const meals = {
    breakfast: [
      {
        id: 1,
        name: 'Fluffy Pancakes',
        description: 'Soft, golden pancakes with maple syrup and berries',
        price: 6.50,
        icon: '🥞',
        calories: 450,
        protein: 12,
        carbs: 68,
        fats: 12,
        prepTime: '10 min',
        cookTime: '15 min'
      },
      {
        id: 2,
        name: 'Berry Smoothie Bowl',
        description: 'Creamy smoothie base topped with granola and fresh berries',
        price: 8.00,
        icon: '🍓',
        calories: 380,
        protein: 15,
        carbs: 52,
        fats: 8,
        prepTime: '5 min',
        cookTime: '0 min'
      },
      {
        id: 3,
        name: 'Avocado Toast',
        description: 'Whole grain toast with mashed avocado, poached egg, and seeds',
        price: 7.50,
        icon: '🥑',
        calories: 420,
        protein: 14,
        carbs: 38,
        fats: 18,
        prepTime: '5 min',
        cookTime: '10 min'
      },
      {
        id: 4,
        name: 'Greek Yogurt Parfait',
        description: 'Layers of creamy yogurt, granola, honey, and mixed berries',
        price: 6.00,
        icon: '🥛',
        calories: 350,
        protein: 16,
        carbs: 45,
        fats: 8,
        prepTime: '3 min',
        cookTime: '0 min'
      }
    ],
    lunch: [
      {
        id: 5,
        name: 'Caesar Salad',
        description: 'Crisp romaine with parmesan, croutons, and creamy caesar dressing',
        price: 10.00,
        icon: '🥗',
        calories: 380,
        protein: 18,
        carbs: 28,
        fats: 20
      },
      {
        id: 6,
        name: 'Caprese Sandwich',
        description: 'Fresh mozzarella, tomato, basil on artisan bread with balsamic',
        price: 9.50,
        icon: '🥪',
        calories: 420,
        protein: 16,
        carbs: 42,
        fats: 16
      },
      {
        id: 7,
        name: 'Quinoa Buddha Bowl',
        description: 'Nutty quinoa with roasted veggies, chickpeas, tahini dressing',
        price: 11.00,
        icon: '🌾',
        calories: 480,
        protein: 18,
        carbs: 58,
        fats: 14
      },
      {
        id: 8,
        name: 'Salmon Poke Bowl',
        description: 'Sushi-grade salmon over sushi rice with cucumber, avocado, and ponzu',
        price: 13.50,
        icon: '🍣',
        calories: 520,
        protein: 32,
        carbs: 48,
        fats: 16
      }
    ],
    dinner: [
      {
        id: 9,
        name: 'Creamy Pasta',
        description: 'Fettuccine in a light parmesan cream sauce with fresh herbs',
        price: 12.00,
        icon: '🍝',
        calories: 580,
        protein: 20,
        carbs: 65,
        fats: 22
      },
      {
        id: 10,
        name: 'Grilled Chicken with Veggies',
        description: 'Herb-marinated chicken breast with roasted seasonal vegetables',
        price: 14.00,
        icon: '🍗',
        calories: 450,
        protein: 42,
        carbs: 32,
        fats: 12
      },
      {
        id: 11,
        name: 'Mushroom Risotto',
        description: 'Creamy arborio rice with wild mushrooms and truffle oil',
        price: 13.50,
        icon: '🍚',
        calories: 520,
        protein: 16,
        carbs: 68,
        fats: 18
      },
      {
        id: 12,
        name: 'Baked Salmon',
        description: 'Wild salmon fillet with lemon butter, asparagus, and sweet potato',
        price: 16.00,
        icon: '🐟',
        calories: 580,
        protein: 38,
        carbs: 42,
        fats: 20
      }
    ],
    snacks: [
      {
        id: 13,
        name: 'Chocolate Chip Cookie',
        description: 'Warm, chewy cookie loaded with dark chocolate chips',
        price: 3.50,
        icon: '🍪',
        calories: 280,
        protein: 4,
        carbs: 35,
        fats: 14
      },
      {
        id: 14,
        name: 'Mixed Nuts & Berries',
        description: 'Almonds, cashews, and dried cranberries',
        price: 4.00,
        icon: '🥜',
        calories: 220,
        protein: 8,
        carbs: 18,
        fats: 14
      },
      {
        id: 15,
        name: 'Fruit & Cheese Plate',
        description: 'Apple slices, grapes, cheddar cheese, and whole grain crackers',
        price: 5.50,
        icon: '🍎',
        calories: 320,
        protein: 12,
        carbs: 32,
        fats: 14
      },
      {
        id: 16,
        name: 'Protein Energy Balls',
        description: 'No-bake bites with oats, peanut butter, and dark chocolate',
        price: 3.00,
        icon: '⚡',
        calories: 240,
        protein: 10,
        carbs: 24,
        fats: 10
      }
    ]
  };

  const categoryMeals = meals[type] || [];
  const categoryLabels = {
    breakfast: '🥐 Breakfast',
    lunch: '🥗 Lunch',
    dinner: '🍝 Dinner',
    snacks: '🍪 Snacks'
  };

  return (
    <div>
      <button
        onClick={() => navigate('/meals')}
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

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--dark-text)' }}>
          {categoryLabels[type]}
        </h1>
        <p style={{ color: 'var(--light-text)', marginTop: '0.5rem' }}>
          Choose a delicious {type} option
        </p>
      </div>

      <div>
        {categoryMeals.map((meal) => (
          <div
            key={meal.id}
            className="meal-card"
            onClick={() => navigate(`/meal/${meal.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <div className="meal-image">{meal.icon}</div>
            <div className="meal-content">
              <div className="meal-name">{meal.name}</div>
              <div className="meal-description">{meal.description}</div>

              {/* Time and Nutrition in a grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--light-pink)'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--light-text)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                    ⏱️ {meal.prepTime}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--light-text)', textTransform: 'uppercase' }}>
                    🍳 {meal.cookTime}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent-red)' }}>
                    {meal.calories}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--light-text)' }}>Calories</div>
                </div>
              </div>

              {/* Nutrition Summary */}
              <div className="meal-nutrition">
                <div className="nutrition-item">
                  <span className="nutrition-label">Protein</span>
                  <span className="nutrition-value">{meal.protein}g</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-label">Carbs</span>
                  <span className="nutrition-value">{meal.carbs}g</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-label">Fat</span>
                  <span className="nutrition-value">{meal.fats}g</span>
                </div>
              </div>

              {/* Price */}
              <div style={{
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--light-pink)',
                fontSize: '0.9rem',
                color: 'var(--light-text)'
              }}>
                Estimated Price
                <div style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: 'var(--accent-red)',
                  marginTop: '0.25rem'
                }}>
                  ${meal.price.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MealCategory;
