import './RestaurantCard.css'

export default function RestaurantCard({ restaurant, onReroll, onShare, onNavigate }) {
  if (!restaurant) return null

  const dist = restaurant.distance > 1000
    ? (restaurant.distance/1000).toFixed(1)+' km'
    : restaurant.distance+'m'

  return (
    <div className="rcard anim-pop">
      <div className="rcard-badge">🎯 就它了</div>

      <div className="rcard-icon-row">
        <div className="rcard-icon-circle">🍽️</div>
        <div className="rcard-name-col">
          <h2>{restaurant.name}</h2>
          <div className="rcard-tags">
            {restaurant.rating && <span className="rtag rtag-rating">⭐ {restaurant.rating}</span>}
            <span className="rtag rtag-dist">📍 {dist}</span>
          </div>
        </div>
      </div>

      <div className="rcard-addr">
        <span>📍</span>
        <p>{restaurant.address || '地址未知'}</p>
      </div>

      <div className="rcard-actions">
        <button className="ract ract-outline" onClick={onReroll}>
          <span>🔄</span> 换一家
        </button>
        <button className="ract ract-outline" onClick={onShare}>
          <span>📤</span> 分享
        </button>
        <button className="ract ract-primary" onClick={onNavigate}>
          <span>🧭</span> 导航去
        </button>
      </div>
    </div>
  )
}
