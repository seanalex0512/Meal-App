import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './MealDetails.css';

function MealDetails({ plan, setPlan }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  // All meals database with detailed info
  const allMeals = [
    { id: 1, name: 'Fluffy Pancakes', category: 'breakfast', description: 'Soft, golden pancakes with maple syrup and berries', price: 6.50, icon: '🥞', calories: 450, protein: 12, carbs: 68, fats: 12, fiber: 4, sugar: 25, sodium: 300, prepTime: '10 min', cookTime: '15 min', servings: 1, ingredients: [{ name: 'All-purpose flour', amount: '1 cup' }, { name: 'Eggs', amount: '2' }, { name: 'Milk', amount: '3/4 cup' }, { name: 'Butter', amount: '2 tbsp' }, { name: 'Baking powder', amount: '2 tsp' }, { name: 'Vanilla extract', amount: '1 tsp' }, { name: 'Maple syrup', amount: '1/4 cup' }, { name: 'Fresh berries', amount: '1 cup' }], about: 'Fluffy, light pancakes made with simple ingredients. Perfect for a weekend brunch or special breakfast.' },
    { id: 2, name: 'Berry Smoothie Bowl', category: 'breakfast', description: 'Creamy smoothie base topped with granola and fresh berries', price: 8.00, icon: '🍓', calories: 380, protein: 15, carbs: 52, fats: 8, fiber: 6, sugar: 28, sodium: 200, prepTime: '5 min', cookTime: '0 min', servings: 1, ingredients: [{ name: 'Acai berries', amount: '1 cup' }, { name: 'Greek yogurt', amount: '1/2 cup' }, { name: 'Almond milk', amount: '1/2 cup' }, { name: 'Honey', amount: '1 tbsp' }, { name: 'Granola', amount: '1/2 cup' }, { name: 'Fresh strawberries', amount: '1/2 cup' }, { name: 'Blueberries', amount: '1/2 cup' }, { name: 'Coconut flakes', amount: '2 tbsp' }], about: 'Nutrient-dense smoothie bowl packed with antioxidants from berries and probiotics from yogurt.' },
    { id: 3, name: 'Avocado Toast', category: 'breakfast', description: 'Whole grain toast with mashed avocado, poached egg, and seeds', price: 7.50, icon: '🥑', calories: 420, protein: 14, carbs: 38, fats: 18, fiber: 7, sugar: 2, sodium: 350, prepTime: '5 min', cookTime: '10 min', servings: 1, ingredients: [{ name: 'Whole grain bread', amount: '2 slices' }, { name: 'Avocado', amount: '1' }, { name: 'Eggs', amount: '1' }, { name: 'Lemon juice', amount: '1/2 tbsp' }, { name: 'Sea salt', amount: 'to taste' }, { name: 'Black pepper', amount: 'to taste' }, { name: 'Pumpkin seeds', amount: '1 tbsp' }, { name: 'Red pepper flakes', amount: 'pinch' }], about: 'A modern classic combining healthy fats from avocado with protein-rich eggs on nutritious whole grain bread.' },
    { id: 4, name: 'Greek Yogurt Parfait', category: 'breakfast', description: 'Layers of creamy yogurt, granola, honey, and mixed berries', price: 6.00, icon: '🥛', calories: 350, protein: 16, carbs: 45, fats: 8, fiber: 5, sugar: 32, sodium: 100, prepTime: '3 min', cookTime: '0 min', servings: 1, ingredients: [{ name: 'Greek yogurt', amount: '1 cup' }, { name: 'Granola', amount: '1/2 cup' }, { name: 'Raw honey', amount: '2 tbsp' }, { name: 'Mixed berries', amount: '1 cup' }, { name: 'Almonds', amount: '1/4 cup' }, { name: 'Cinnamon', amount: '1/4 tsp' }, { name: 'Vanilla extract', amount: '1/2 tsp' }], about: 'Wholesome and satisfying, with layers of creamy yogurt, crunchy granola, and fresh berries.' },
    { id: 5, name: 'Caesar Salad', category: 'lunch', description: 'Crisp romaine with parmesan, croutons, and creamy caesar dressing', price: 10.00, icon: '🥗', calories: 380, protein: 18, carbs: 28, fats: 20, fiber: 5, sugar: 3, sodium: 450, prepTime: '10 min', cookTime: '0 min', servings: 1, ingredients: [{ name: 'Romaine lettuce', amount: '3 cups' }, { name: 'Parmesan cheese', amount: '1/4 cup' }, { name: 'Croutons', amount: '1/2 cup' }, { name: 'Caesar dressing', amount: '3 tbsp' }, { name: 'Lemon', amount: '1/2' }, { name: 'Garlic', amount: '1 clove' }, { name: 'Anchovies', amount: '2' }, { name: 'Black pepper', amount: 'to taste' }], about: 'A timeless classic salad with crisp romaine, savory parmesan, and creamy caesar dressing.' },
    { id: 6, name: 'Caprese Sandwich', category: 'lunch', description: 'Fresh mozzarella, tomato, basil on artisan bread with balsamic', price: 9.50, icon: '🥪', calories: 420, protein: 16, carbs: 42, fats: 16, fiber: 3, sugar: 5, sodium: 380, prepTime: '5 min', cookTime: '0 min', servings: 1, ingredients: [{ name: 'Artisan bread', amount: '2 slices' }, { name: 'Fresh mozzarella', amount: '4 oz' }, { name: 'Tomato', amount: '1 medium' }, { name: 'Fresh basil', amount: '6 leaves' }, { name: 'Balsamic vinegar', amount: '1 tbsp' }, { name: 'Olive oil', amount: '1 tbsp' }, { name: 'Sea salt', amount: 'to taste' }, { name: 'Black pepper', amount: 'to taste' }], about: 'Fresh and simple Italian-inspired sandwich celebrating quality ingredients and bright flavors.' },
    { id: 7, name: 'Quinoa Buddha Bowl', category: 'lunch', description: 'Nutty quinoa with roasted veggies, chickpeas, tahini dressing', price: 11.00, icon: '🌾', calories: 480, protein: 18, carbs: 58, fats: 14, fiber: 10, sugar: 4, sodium: 320, prepTime: '10 min', cookTime: '20 min', servings: 1, ingredients: [{ name: 'Quinoa', amount: '3/4 cup cooked' }, { name: 'Chickpeas', amount: '1/2 cup' }, { name: 'Sweet potato', amount: '1 medium' }, { name: 'Kale', amount: '1 cup' }, { name: 'Red cabbage', amount: '1/2 cup' }, { name: 'Tahini', amount: '2 tbsp' }, { name: 'Lemon juice', amount: '2 tbsp' }, { name: 'Garlic', amount: '1 clove' }], about: 'A balanced and nourishing bowl loaded with plant-based protein, healthy grains, and colorful vegetables.' },
    { id: 8, name: 'Salmon Poke Bowl', category: 'lunch', description: 'Sushi-grade salmon over sushi rice with cucumber, avocado, and ponzu', price: 13.50, icon: '🍣', calories: 520, protein: 32, carbs: 48, fats: 16, fiber: 6, sugar: 2, sodium: 600, prepTime: '15 min', cookTime: '0 min', servings: 1, ingredients: [{ name: 'Sushi-grade salmon', amount: '6 oz' }, { name: 'Sushi rice', amount: '1 cup cooked' }, { name: 'Cucumber', amount: '1/2' }, { name: 'Avocado', amount: '1/2' }, { name: 'Ponzu sauce', amount: '2 tbsp' }, { name: 'Sesame seeds', amount: '1 tbsp' }, { name: 'Seaweed', amount: 'small handful' }, { name: 'Ginger', amount: '1 tsp' }], about: 'Fresh and vibrant Hawaiian-inspired bowl featuring premium salmon and traditional Japanese flavors.' },
    { id: 9, name: 'Creamy Pasta', category: 'dinner', description: 'Fettuccine in a light parmesan cream sauce with fresh herbs', price: 12.00, icon: '🍝', calories: 580, protein: 20, carbs: 65, fats: 22, fiber: 3, sugar: 3, sodium: 480, prepTime: '5 min', cookTime: '20 min', servings: 1, ingredients: [{ name: 'Fettuccine', amount: '8 oz' }, { name: 'Heavy cream', amount: '1 cup' }, { name: 'Parmesan cheese', amount: '1/2 cup' }, { name: 'Butter', amount: '2 tbsp' }, { name: 'Garlic', amount: '2 cloves' }, { name: 'Fresh parsley', amount: '2 tbsp' }, { name: 'Black pepper', amount: 'to taste' }, { name: 'Nutmeg', amount: 'pinch' }], about: 'Elegant and indulgent pasta dish with a silky cream sauce infused with garlic and fresh herbs.' },
    { id: 10, name: 'Grilled Chicken with Veggies', category: 'dinner', description: 'Herb-marinated chicken breast with roasted seasonal vegetables', price: 14.00, icon: '🍗', calories: 450, protein: 42, carbs: 32, fats: 12, fiber: 6, sugar: 5, sodium: 350, prepTime: '15 min', cookTime: '25 min', servings: 1, ingredients: [{ name: 'Chicken breast', amount: '6 oz' }, { name: 'Broccoli', amount: '1.5 cups' }, { name: 'Carrots', amount: '2 medium' }, { name: 'Zucchini', amount: '1 medium' }, { name: 'Olive oil', amount: '2 tbsp' }, { name: 'Garlic', amount: '2 cloves' }, { name: 'Italian herbs', amount: '1 tbsp' }, { name: 'Lemon', amount: '1/2' }], about: 'Healthy and satisfying dinner with lean protein and abundant vegetables roasted to perfection.' },
    { id: 11, name: 'Mushroom Risotto', category: 'dinner', description: 'Creamy arborio rice with wild mushrooms and truffle oil', price: 13.50, icon: '🍚', calories: 520, protein: 16, carbs: 68, fats: 18, fiber: 2, sugar: 1, sodium: 520, prepTime: '10 min', cookTime: '30 min', servings: 1, ingredients: [{ name: 'Arborio rice', amount: '1 cup' }, { name: 'Wild mushrooms', amount: '8 oz' }, { name: 'Vegetable broth', amount: '4 cups' }, { name: 'White wine', amount: '1/2 cup' }, { name: 'Parmesan cheese', amount: '1/2 cup' }, { name: 'Butter', amount: '3 tbsp' }, { name: 'Truffle oil', amount: '1 tsp' }, { name: 'Onion', amount: '1 small' }], about: 'A luxurious Italian classic with creamy risotto, earthy mushrooms, and a drizzle of truffle oil.' },
    { id: 12, name: 'Baked Salmon', category: 'dinner', description: 'Wild salmon fillet with lemon butter, asparagus, and sweet potato', price: 16.00, icon: '🐟', calories: 580, protein: 38, carbs: 42, fats: 20, fiber: 6, sugar: 10, sodium: 400, prepTime: '10 min', cookTime: '25 min', servings: 1, ingredients: [{ name: 'Wild salmon fillet', amount: '6 oz' }, { name: 'Asparagus', amount: '1 bunch' }, { name: 'Sweet potato', amount: '1 medium' }, { name: 'Lemon', amount: '1/2' }, { name: 'Butter', amount: '2 tbsp' }, { name: 'Garlic', amount: '2 cloves' }, { name: 'Fresh dill', amount: '1 tbsp' }, { name: 'Sea salt', amount: 'to taste' }], about: 'A premium dinner featuring omega-3 rich salmon baked with bright lemon and paired with roasted vegetables.' },
    { id: 13, name: 'Chocolate Chip Cookie', category: 'snacks', description: 'Warm, chewy cookie loaded with dark chocolate chips', price: 3.50, icon: '🍪', calories: 280, protein: 4, carbs: 35, fats: 14, fiber: 1, sugar: 24, sodium: 200, prepTime: '10 min', cookTime: '12 min', servings: 12, ingredients: [{ name: 'All-purpose flour', amount: '2.25 cups' }, { name: 'Butter', amount: '1 cup' }, { name: 'Brown sugar', amount: '3/4 cup' }, { name: 'Eggs', amount: '2' }, { name: 'Vanilla extract', amount: '2 tsp' }, { name: 'Dark chocolate chips', amount: '2 cups' }, { name: 'Sea salt', amount: '1 tsp' }, { name: 'Baking soda', amount: '1 tsp' }], about: 'Classic homemade cookies with a crispy edge and chewy center loaded with dark chocolate.' },
    { id: 14, name: 'Mixed Nuts & Berries', category: 'snacks', description: 'Almonds, cashews, and dried cranberries', price: 4.00, icon: '🥜', calories: 220, protein: 8, carbs: 18, fats: 14, fiber: 3, sugar: 12, sodium: 50, prepTime: '0 min', cookTime: '0 min', servings: 1, ingredients: [{ name: 'Almonds', amount: '1/4 cup' }, { name: 'Cashews', amount: '1/4 cup' }, { name: 'Walnuts', amount: '2 tbsp' }, { name: 'Dried cranberries', amount: '2 tbsp' }, { name: 'Sea salt', amount: 'light sprinkle' }], about: 'A balanced snack combining healthy fats from nuts with natural sweetness from dried cranberries.' },
    { id: 15, name: 'Fruit & Cheese Plate', category: 'snacks', description: 'Apple slices, grapes, cheddar cheese, and whole grain crackers', price: 5.50, icon: '🍎', calories: 320, protein: 12, carbs: 32, fats: 14, fiber: 4, sugar: 18, sodium: 300, prepTime: '5 min', cookTime: '0 min', servings: 2, ingredients: [{ name: 'Apple', amount: '1 medium' }, { name: 'Grapes', amount: '1 cup' }, { name: 'Cheddar cheese', amount: '3 oz' }, { name: 'Whole grain crackers', amount: '1/2 cup' }, { name: 'Raw honey', amount: '1 tbsp' }], about: 'A simple and elegant snack perfect for sharing or enjoying solo with balanced nutrition and natural sweetness.' },
    { id: 16, name: 'Protein Energy Balls', category: 'snacks', description: 'No-bake bites with oats, peanut butter, and dark chocolate', price: 3.00, icon: '⚡', calories: 240, protein: 10, carbs: 24, fats: 10, fiber: 3, sugar: 14, sodium: 80, prepTime: '10 min', cookTime: '0 min', servings: 12, ingredients: [{ name: 'Rolled oats', amount: '1 cup' }, { name: 'Natural peanut butter', amount: '1/2 cup' }, { name: 'Dark chocolate chips', amount: '1/2 cup' }, { name: 'Honey', amount: '3 tbsp' }, { name: 'Coconut oil', amount: '2 tbsp' }, { name: 'Vanilla extract', amount: '1 tsp' }], about: 'Delicious and nutritious no-bake energy bites packed with protein, fiber, and natural ingredients.' }
  ];

  const meal = allMeals.find(m => m.id === parseInt(id));

  if (!meal) {
    return <div className="empty-state">Meal not found</div>;
  }

  const handleAddToPlan = () => {
    const categoryKey = meal.category;
    if (categoryKey === 'snacks') {
      setPlan(prev => ({
        ...prev,
        snacks: [...prev.snacks, meal]
      }));
    } else {
      setPlan(prev => ({
        ...prev,
        [categoryKey]: meal
      }));
    }
    setAdded(true);
    setTimeout(() => {
      navigate('/my-plan');
    }, 500);
  };

  return (
    <div className="meal-details">
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: '1.5rem',
          background: 'none',
          border: '1px solid var(--light-pink)',
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

      <div className="meal-hero">{meal.icon}</div>

      <div className="meal-header">
        <h1 className="meal-header-title">{meal.name}</h1>
        <p className="meal-header-description">{meal.description}</p>
      </div>

      {/* Meta Information */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '1rem',
        marginBottom: '2rem',
        padding: '1rem',
        background: 'var(--white)',
        borderRadius: 'var(--radius-md)',
        boxShadow: '0 2px 8px var(--shadow-soft)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--light-text)', marginBottom: '0.5rem' }}>Prep Time</div>
          <div style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--dark-text)' }}>{meal.prepTime}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--light-text)', marginBottom: '0.5rem' }}>Cook Time</div>
          <div style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--dark-text)' }}>{meal.cookTime}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--light-text)', marginBottom: '0.5rem' }}>Servings</div>
          <div style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--dark-text)' }}>{meal.servings}</div>
        </div>
      </div>

      {/* Nutrition Facts */}
      <div className="nutrition-full">
        <div className="section-title">Nutrition Facts</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            background: 'var(--protein-blue)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--dark-text)', display: 'block', marginBottom: '0.5rem' }}>Protein</span>
            <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2C3E50', display: 'block' }}>{meal.protein}g</span>
          </div>
          <div style={{
            background: 'var(--fat-yellow)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--dark-text)', display: 'block', marginBottom: '0.5rem' }}>Fat</span>
            <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#B8860B', display: 'block' }}>{meal.fats}g</span>
          </div>
          <div style={{
            background: 'var(--carbs-green)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--dark-text)', display: 'block', marginBottom: '0.5rem' }}>Carbs</span>
            <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#27AE60', display: 'block' }}>{meal.carbs}g</span>
          </div>
        </div>

        {/* Detailed Nutrition List */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem'
        }}>
          <div style={{
            borderLeft: '3px solid var(--protein-blue)',
            paddingLeft: '1rem'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--light-text)', marginBottom: '0.25rem' }}>Protein</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--dark-text)' }}>{meal.protein}g</div>
          </div>
          <div style={{
            borderLeft: '3px solid var(--fat-yellow)',
            paddingLeft: '1rem'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--light-text)', marginBottom: '0.25rem' }}>Fat</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--dark-text)' }}>{meal.fats}g</div>
          </div>
          <div style={{
            borderLeft: '3px solid var(--carbs-green)',
            paddingLeft: '1rem'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--light-text)', marginBottom: '0.25rem' }}>Carbs</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--dark-text)' }}>{meal.carbs}g</div>
          </div>
          <div style={{
            borderLeft: '3px solid #E8D4F0',
            paddingLeft: '1rem'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--light-text)', marginBottom: '0.25rem' }}>Fiber</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--dark-text)' }}>{meal.fiber}g</div>
          </div>
          <div style={{
            borderLeft: '3px solid #FFE5E5',
            paddingLeft: '1rem'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--light-text)', marginBottom: '0.25rem' }}>Sugar</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--dark-text)' }}>{meal.sugar}g</div>
          </div>
          <div style={{
            borderLeft: '3px solid #E8E0D0',
            paddingLeft: '1rem'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--light-text)', marginBottom: '0.25rem' }}>Sodium</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--dark-text)' }}>{meal.sodium}mg</div>
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <div className="ingredients-section">
        <div className="section-title">Ingredients</div>
        <ul className="ingredients-list">
          {meal.ingredients.map((ingredient, index) => (
            <li key={index} style={{
              padding: 'var(--spacing-sm) 0',
              borderBottom: '1px solid var(--light-pink)',
              fontSize: '0.95rem',
              color: 'var(--dark-text)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>{ingredient.name}</span>
              <span style={{ color: 'var(--light-text)', fontSize: '0.85rem', fontWeight: '500' }}>{ingredient.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* About This Meal */}
      <div className="ingredients-section">
        <div className="section-title">About this meal</div>
        <p style={{
          color: 'var(--light-text)',
          lineHeight: '1.6',
          margin: 0,
          fontSize: '0.95rem'
        }}>
          {meal.about}
        </p>
      </div>

      {/* Price and Add Button */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        padding: '1.5rem',
        background: 'var(--white)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 2px 8px var(--shadow-soft)'
      }}>
        <div>
          <div style={{
            fontSize: '0.85rem',
            color: 'var(--light-text)',
            marginBottom: '0.5rem'
          }}>Estimated cost</div>
          <div style={{
            fontSize: '1.6rem',
            fontWeight: '700',
            color: 'var(--accent-red)'
          }}>${meal.price.toFixed(2)}</div>
        </div>
        <button
          onClick={handleAddToPlan}
          style={{
            background: 'var(--white)',
            border: `2px solid var(--accent-red)`,
            color: 'var(--accent-red)',
            padding: '0.75rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.95rem',
            transition: 'all 0.2s ease'
          }}
        >
          ❤️ Add to Plan
        </button>
      </div>
    </div>
  );
}

export default MealDetails;
