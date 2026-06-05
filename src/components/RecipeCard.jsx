import './RecipeCard.css'

const AUDIENCE_LABEL = {
  adult: '👨‍👩‍👧 大人菜',
  child: '🧒 小孩专属'
}

const TASTE_EMOJI = {
  light: '🥗',
  medium: '🍚',
  heavy: '🌶️'
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
      {/* 顶部便签夹 */}
      <div className="recipe-card__clip" />

      <div className="recipe-card__top">
        <span className="recipe-card__emoji">{TASTE_EMOJI[recipe.taste] || '🍳'}</span>
        <div className="recipe-card__top-info">
          <h3 className="recipe-card__name">{recipe.name}</h3>
          <div className="recipe-card__meta">
            <span className="recipe-meta-tag">
              ⏱️ {recipe.cookTime}分钟
            </span>
            <span className="recipe-meta-tag">
              {TASTE_EMOJI[recipe.taste]} {TASTE_LABEL[recipe.taste]}
            </span>
            <span className="recipe-card__audience-badge">
              {AUDIENCE_LABEL[audience]}
            </span>
          </div>
        </div>
      </div>

      {/* 食材 */}
      <div className="recipe-card__section">
        <h4>
          <span className="recipe-card__section-icon">🥬</span>
          食材清单
        </h4>
        <div className="recipe-card__ingredient-list">
          {recipe.ingredients.map((ing, i) => (
            <span key={i} className="ingredient-tag">{ing}</span>
          ))}
        </div>
      </div>

      {/* 步骤 */}
      <div className="recipe-card__section">
        <h4>
          <span className="recipe-card__section-icon">👨‍🍳</span>
          烹饪步骤
        </h4>
        <ol className="recipe-card__steps">
          {recipe.steps.map((step, i) => (
            <li key={i}>
              <span className="step-number">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
