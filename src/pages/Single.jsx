import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchNearbyFood, reverseGeocode } from '../utils/amap'
import { pickRestaurant } from '../utils/algorithm'
import { addHistory, getHistory, removeHistoryItem } from '../utils/storage'
import RestaurantCard from '../components/RestaurantCard'
import './Single.css'

export default function Single() {
  const navigate = useNavigate()

  const [location, setLocation] = useState(null)       // { lng, lat }
  const [address, setAddress] = useState('')             // 可读地址
  const [loading, setLoading] = useState(false)
  const [restaurants, setRestaurants] = useState([])     // 附近餐厅池
  const [picked, setPicked] = useState(null)             // 当前推荐
  const [error, setError] = useState('')
  const [showShare, setShowShare] = useState(false)
  const [toast, setToast] = useState('')
  const [locationDenied, setLocationDenied] = useState(false)
  const [manualCity, setManualCity] = useState('')
  const [history, setHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)

  // 初始化：获取定位
  useEffect(() => {
    getLocation()
    setHistory(getHistory())
  }, [])

  const getLocation = () => {
    setLoading(true)
    setError('')
    setLocationDenied(false)

    if (!navigator.geolocation) {
      setLocationDenied(true)
      setError('你的浏览器不支持定位，请手动输入城市')
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { longitude, latitude } = pos.coords
        setLocation({ lng: longitude, lat: latitude })
        try {
          const geo = await reverseGeocode(longitude, latitude)
          setAddress(geo.city || geo.district || geo.address)
        } catch {
          setAddress('已定位')
        }
        setLoading(false)
      },
      () => {
        setLocationDenied(true)
        setError('定位被拒绝了，请输入城市名称来搜索')
        setLoading(false)
      },
      { timeout: 10000, enableHighAccuracy: false }
    )
  }

  // 搜索附近餐厅
  const handleSearch = useCallback(async () => {
    if (!location) {
      setError('请先获取定位或输入城市')
      return
    }

    setLoading(true)
    setError('')
    setPicked(null)

    try {
      const results = await searchNearbyFood(location.lng, location.lat)
      if (results.length === 0) {
        setError('你附近好像有点荒凉…试试扩大搜索范围？')
        setRestaurants([])
        setLoading(false)
        return
      }
      setRestaurants(results)
      const choice = pickRestaurant(results)
      if (choice) {
        setPicked(choice)
        addHistory(choice)
        setHistory(getHistory())
      } else {
        setError('出了点意外，再试一次？')
      }
    } catch (e) {
      setError('搜索失败了：' + (e.message || '网络错误'))
    }
    setLoading(false)
  }, [location])

  // 换一家
  const handleReroll = () => {
    if (restaurants.length === 0) {
      handleSearch()
      return
    }
    const pool = restaurants.filter(r => r.name !== picked?.name)
    if (pool.length > 0) {
      const choice = pool[Math.floor(Math.random() * pool.length)]
      setPicked(choice)
      addHistory(choice)
      setHistory(getHistory())
    } else {
      setError('附近能推荐的都推荐过了～')
    }
  }

  // 分享
  const handleShare = () => {
    const text = `🎲 今天吃啥帮我选了「${picked.name}」| 离你${picked.distance > 1000 ? (picked.distance / 1000).toFixed(1) + 'km' : picked.distance + 'm'}，你也试试？`
    const url = window.location.origin + '/single'

    if (navigator.share) {
      navigator.share({ title: '今天吃啥', text, url }).catch(() => {})
    } else {
      copyToClipboard(text + ' ' + url)
    }
    setShowShare(false)
  }

  const handleCopyShare = () => {
    const text = `🎲 今天吃啥帮我选了「${picked.name}」| 离你${picked.distance > 1000 ? (picked.distance / 1000).toFixed(1) + 'km' : picked.distance + 'm'}，你也试试？`
    const url = window.location.origin + '/single'
    copyToClipboard(text + ' ' + url)
    setShowShare(false)
  }

  const copyToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => setToast('已复制！去粘贴给朋友吧'))
    } else {
      setToast('复制失败，请长按手动复制')
    }
  }

  // 导航
  const handleNavigate = () => {
    if (picked) {
      const url = `https://uri.amap.com/marker?position=${picked.lng},${picked.lat}&name=${picked.name}`
      window.open(url, '_blank')
    }
  }

  // 手动搜索城市
  const handleManualSearch = async () => {
    if (!manualCity.trim()) return
    // 使用高德地理编码搜索城市
    try {
      const url = `https://restapi.amap.com/v3/geocode/geo?key=6103cc3169a3d3e47c68c1a636d8d139&address=${encodeURIComponent(manualCity)}`
      const res = await fetch(url)
      const data = await res.json()
      if (data.status === '1' && data.geocodes?.length > 0) {
        const [lng, lat] = data.geocodes[0].location.split(',').map(parseFloat)
        const geo = await reverseGeocode(lng, lat)
        setLocation({ lng, lat })
        setAddress(geo.city || manualCity)
        setLocationDenied(false)
        setError('')
      } else {
        setError('没找到这个城市，换个试试？')
      }
    } catch {
      setError('搜索失败')
    }
  }

  const formatTime = (ts) => {
    const d = new Date(ts)
    return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
  }

  return (
    <div className="single-page">
      {/* 返回 */}
      <button className="back-btn" onClick={() => navigate('/')}>
        ← 首页
      </button>

      <h1 className="page-title">单人吃啥 🧑‍🍳</h1>

      {/* 位置信息 */}
      <div className="location-bar">
        {address ? (
          <span className="location-bar__text">📍 {address}</span>
        ) : (
          <span className="location-bar__text">📍 定位中…</span>
        )}
        <button className="location-bar__refresh" onClick={getLocation}>
          🔄
        </button>
      </div>

      {/* 定位被拒 - 手动输入 */}
      {locationDenied && (
        <div className="manual-location">
          <p className="manual-location__hint">请输入城市名，帮你搜索附近的餐厅</p>
          <div className="manual-location__row">
            <input
              className="manual-location__input"
              type="text"
              placeholder="例如：北京朝阳"
              value={manualCity}
              onChange={e => setManualCity(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleManualSearch()}
            />
            <button className="btn btn--primary" onClick={handleManualSearch}>
              搜索
            </button>
          </div>
        </div>
      )}

      {/* 核心按钮 */}
      <button
        className="btn btn--primary btn--large btn--block single-page__cta"
        onClick={handleSearch}
        disabled={loading}
      >
        {loading ? '正在帮你找… 🏃' : '🎯 帮我决定今天吃啥'}
      </button>

      {/* 错误 */}
      {error && (
        <div className="single-page__error">
          <p>{error}</p>
          {error.includes('荒凉') && (
            <button
              className="btn btn--secondary"
              onClick={async () => {
                const results = await searchNearbyFood(location.lng, location.lat, 5000)
                if (results.length > 0) {
                  setRestaurants(results)
                  const choice = pickRestaurant(results)
                  setPicked(choice)
                  addHistory(choice)
                  setHistory(getHistory())
                  setError('')
                } else {
                  setError('扩大范围还是没有…换个地方试试？')
                }
              }}
            >
              📡 扩大至 5km
            </button>
          )}
        </div>
      )}

      {/* 加载动画 */}
      {loading && !picked && (
        <div className="single-page__loading">
          <div className="loading-dots">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
          <p>正在附近搜罗美食…</p>
        </div>
      )}

      {/* 结果 */}
      {picked && !loading && (
        <RestaurantCard
          restaurant={picked}
          onReroll={handleReroll}
          onShare={() => setShowShare(true)}
          onNavigate={handleNavigate}
        />
      )}

      {/* 分享弹窗 */}
      {showShare && (
        <div className="modal-overlay" onClick={() => setShowShare(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <h3 className="modal-sheet__title">分享给朋友</h3>
            {navigator.share ? (
              <button onClick={handleShare}>📤 直接分享</button>
            ) : null}
            <button onClick={handleCopyShare}>📋 复制文案</button>
            <button className="modal-sheet__cancel" onClick={() => setShowShare(false)}>
              取消
            </button>
          </div>
        </div>
      )}

      {/* 推荐历史 */}
      <div className="history-section">
        <button
          className="history-section__toggle"
          onClick={() => { setShowHistory(!showHistory); setHistory(getHistory()) }}
        >
          📋 推荐历史 ({history.length}) {showHistory ? '▲' : '▼'}
        </button>
        {showHistory && (
          <div className="history-list">
            {history.length === 0 ? (
              <p className="history-list__empty">还没有推荐记录</p>
            ) : (
              history.map((item, i) => (
                <div key={i} className="history-item">
                  <span className="history-item__name">{item.name}</span>
                  <span className="history-item__time">{formatTime(item.timestamp)}</span>
                  <button
                    className="history-item__del"
                    onClick={() => { removeHistoryItem(i); setHistory(getHistory()) }}
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="toast" onClick={() => setToast('')}>
          {toast}
        </div>
      )}
    </div>
  )
}
