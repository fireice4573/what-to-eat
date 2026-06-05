import './RecipeCard.css'

const LABELS = { adult: '大人菜', child: '小孩专属' }
const TASTE_MAP = { light:'🥗 清淡', medium:'🍚 适中', heavy:'🌶️ 重口' }

export default function RecipeCard({ recipe, audience }) {
  if (!recipe) return null

  return (
    <div className={`rccard rccard-${audience} anim-fade-up`}>
      <div className="rccard-head">
        <div className="rccard-emoji-bg">{TASTE_MAP[recipe.taste]?.split(' ')[0] || '🍳'}</div>
        <div className="rccard-head-info">
          <h3>{recipe.name}</h3>
          <div className="rccard-chips">
            <span className="chip chip-time">⏱️ {recipe.cookTime}分钟</span>
            <span className="chip chip-taste">{TASTE_MAP[recipe.taste]}</span>
            <span className={`chip chip-audience chip-audience-${audience}`}>{LABELS[audience]}</span>
          </div>
        </div>
      </div>

      <div className="rccard-section">
        <h4>🥬 食材</h4>
        <div className="rccard-ingredients">
          {recipe.ingredients.map((ing,i)=><span key={i} className="ing-badge">{ing}</span>)}
        </div>
      </div>

      <div className="rccard-section">
        <h4>👨‍🍳 步骤</h4>
        <div className="rccard-steps">
          {recipe.steps.map((step,i)=>(
            <div key={i} className="step-row">
              <span className="step-num">{i+1}</span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
