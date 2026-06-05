import './RestaurantCard.css'

export default function RestaurantCard({ restaurant, onReroll, onShare, onNavigate }) {
  if (!restaurant) return null

  const distanceText = restaurant.distance > 1000
    ? (restaurant.distance / 1000).toFixed(1) + ' km'
    : restaurant.distance + 'm'

  return (
    <div className="restaurant-card animate-bounce-in">
      {/* 顶部装饰 */}
      <div className="restaurant-card__glow" />

      {/* 命中提示 */}
      <div className="restaurant-card__stamp">
        <span>🎯 今天就去这！</span>
      </div>

      {/* 主信息 */}
      <div className="restaurant-card__main">
        <div className="restaurant-card__icon-wrap">
          <span className="restaurant-card__icon">🍽️</span>
        </div>
        <div className="restaurant-card__info-main">
          <h2 className="restaurant-card__name">{restaurant.name}</h2>
          <div className="restaurant-card__tags">
            {restaurant.rating && (
              <span className="restaurant-tag restaurant-tag--rating">
                ⭐ {restaurant.rating}
              </span>
            )}
            <span className="restaurant-tag restaurant-tag--distance">
              📍 {distanceText}
            </span>
          </div>
        </div>
      </div>

      {/* 地址 */}
      <div className="restaurant-card__address-row">
        <span className="restaurant-card__address-icon">📍</span>
        <p className="restaurant-card__address">
          {restaurant.address || '地址未知'}
        </p>
      </div>

      {/* 操作按钮 */}
      <div className="restaurant-card__actions">
        <button className="action-btn action-btn--reroll" onClick={onReroll}>
          <span>🔄</span>
          <span>换一家</span>
        </button>
        <button className="action-btn action-btn--share" onClick={onShare}>
          <span>📤</span>
          <span>分享</span>
        </button>
        <button className="action-btn action-btn--go" onClick={onNavigate}>
          <span>🧭</span>
          <span>导航去</span>
        </button>
      </div>
    </div>
  )
}
