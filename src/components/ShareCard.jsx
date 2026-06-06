import './ShareCard.css'

const TASTE_EMOJI = { light: '🥗', medium: '🍚', heavy: '🌶️' }

export default function ShareCard({ mealPlan, adults, children, dateStr }) {
  if (!mealPlan) return null

  const allDishes = [
    ...mealPlan.adultDishes.map(d => ({ ...d, group: '👨‍👩‍👧 大人菜' })),
    ...mealPlan.childDishes.map(d => ({ ...d, group: '🧒 小孩菜' })),
    ...mealPlan.soups.map(d => ({ ...d, group: '🍲 汤' })),
  ]

  // Group by audience
  const groups = {}
  allDishes.forEach(d => {
    if (!groups[d.group]) groups[d.group] = []
    groups[d.group].push(d)
  })

  const peopleLabel = children > 0
    ? `${adults}大人 + ${children}小孩`
    : `${adults}人`

  return (
    <div className="share-card">
      {/* Header */}
      <div className="sc-header">
        <div className="sc-brand">
          <span className="sc-logo">🍳</span>
          <span className="sc-brand-name">今天吃啥</span>
        </div>
        <div className="sc-domain">chiwhat.online</div>
      </div>

      {/* Title */}
      <div className="sc-title-row">
        <h2 className="sc-title">📋 今日菜单</h2>
        <span className="sc-people">{peopleLabel}</span>
      </div>

      {/* Dish groups */}
      {Object.entries(groups).map(([groupName, dishes]) => (
        <div key={groupName} className="sc-group">
          <h3 className="sc-group-title">{groupName}</h3>
          {dishes.map(dish => (
            <div key={dish.id} className="sc-dish">
              <div className="sc-dish-name-row">
                <span className="sc-dish-emoji">{TASTE_EMOJI[dish.taste] || '🍳'}</span>
                <span className="sc-dish-name">{dish.name}</span>
                <span className="sc-dish-time">⏱ {dish.cookTime}分钟</span>
              </div>
              <div className="sc-dish-ingredients">
                {dish.ingredients.map((ing, i) => (
                  <span key={i} className="sc-ing-tag">{ing.split(' ')[0]}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Footer */}
      <div className="sc-footer">
        <p className="sc-cta">你家今晚吃什么？</p>
        <p className="sc-date">{dateStr}</p>
        <p className="sc-watermark">🍳 今天吃啥 · 打开即用，免注册</p>
      </div>
    </div>
  )
}
