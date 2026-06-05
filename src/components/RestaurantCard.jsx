import './RestaurantCard.css'

export default function RestaurantCard({ restaurant, onReroll, onShare, onNavigate }) {
  if (!restaurant) return null

  return (
    <div className="restaurant-card animate-bounce-in">
      <div className="restaurant-card__header">
        <span className="restaurant-card__icon">🍽️</span>
        <h2 className="restaurant-card__name">{restaurant.name}</h2>
      </div>
      <div className="restaurant-card__info">
        {restaurant.rating && (
          <span className="restaurant-card__rating">
            ⭐ {restaurant.rating}
          </span>
        )}
        <span className="restaurant-card__distance">
          📍 {restaurant.distance > 1000
            ? (restaurant.distance / 1000).toFixed(1) + 'km'
            : restaurant.distance + 'm'}
        </span>
      </div>
      <p className="restaurant-card__address">{restaurant.address}</p>
      <div className="restaurant-card__actions">
        <button className="btn btn--secondary" onClick={onReroll}>
          🔄 换一家
        </button>
        <button className="btn btn--secondary" onClick={onShare}>
          📤 分享
        </button>
        <button className="btn btn--primary" onClick={onNavigate}>
          🧭 导航
        </button>
      </div>
    </div>
  )
}
