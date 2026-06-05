import './RecipeCard.css'

const AUDIENCE_LABEL = {
  adult: '👨‍👩‍👧 大人菜',
  child: '🧒 小孩菜'
}

const TASTE_LABEL = {
  light: '清淡',
  medium: '适中',
  heavy: '重口'
}

export default function RecipeCard({ recipe, audience }) {
  if (!recipe) return null

  return (
    <div className={`recipe-card recipe-card--${audience} animate-fade-in`}>
      <div className="recipe-card__header">
        <h3 className="recipe-card__name">{recipe.name}</h3>
        <span className="recipe-card__tag">{AUDIENCE_LABEL[audience] || ''}</span>
      </div>
      <div className="recipe-card__meta">
        <span>⏱️ {recipe.cookTime}分钟</span>
        <span>🌶️ {TASTE_LABEL[recipe.taste] || recipe.taste}</span>
        <span>{recipe.category}</span>
      </div>
      <div className="recipe-card__ingredients">
        <h4>🥬 食材</h4>
        <ul>
          {recipe.ingredients.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
      </div>
      <div className="recipe-card__steps">
        <h4>👨‍🍳 步骤</h4>
        <ol>
          {recipe.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}
