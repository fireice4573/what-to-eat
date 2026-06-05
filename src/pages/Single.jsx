import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { geocodeAddress, searchNearbyFood, reverseGeocode } from '../utils/amap'
import { pickRestaurant } from '../utils/algorithm'
import { addHistory, getHistory, removeHistoryItem } from '../utils/storage'
import RestaurantCard from '../components/RestaurantCard'
import './Single.css'

export default function Single() {
  const navigate = useNavigate()
  const [location, setLocation] = useState(null)
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [restaurants, setRestaurants] = useState([])
  const [picked, setPicked] = useState(null)
  const [error, setError] = useState('')
  const [showShare, setShowShare] = useState(false)
  const [toast, setToast] = useState('')
  const [locationDenied, setLocationDenied] = useState(false)
  const [manualCity, setManualCity] = useState('')
  const [history, setHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => { getLocation(); setHistory(getHistory()) }, [])

  const getLocation = () => {
    setLoading(true); setError(''); setLocationDenied(false)
    if (!navigator.geolocation) {
      setLocationDenied(true); setError('浏览器不支持定位，请手动输入城市'); setLoading(false); return
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { longitude, latitude } = pos.coords
        setLocation({ lng: longitude, lat: latitude })
        try {
          const geo = await reverseGeocode(longitude, latitude)
          setAddress(geo.city || geo.district || geo.address)
        } catch { setAddress('已定位') }
        setLoading(false)
      },
      () => { setLocationDenied(true); setError('定位被拒绝，请输入城市名'); setLoading(false) },
      { timeout: 10000, enableHighAccuracy: false }
    )
  }

  const handleSearch = useCallback(async () => {
    if (!location) { setError('请先获取定位或输入城市'); return }
    setLoading(true); setError(''); setPicked(null)
    try {
      const results = await searchNearbyFood(location.lng, location.lat)
      if (results.length === 0) { setError('附近没有找到餐厅，试试扩大范围？'); setRestaurants([]); setLoading(false); return }
      setRestaurants(results)
      const choice = pickRestaurant(results)
      if (choice) { setPicked(choice); addHistory(choice); setHistory(getHistory()) }
      else { setError('出了点意外，再试一次？') }
    } catch (e) { setError('搜索失败：' + (e.message || '网络错误')) }
    setLoading(false)
  }, [location])

  const handleReroll = () => {
    const pool = restaurants.filter(r => r.name !== picked?.name)
    if (pool.length > 0) {
      const choice = pool[Math.floor(Math.random() * pool.length)]
      setPicked(choice); addHistory(choice); setHistory(getHistory())
    } else { setError('附近的都推荐过了～') }
  }

  const handleShare = () => {
    if (!picked) return
    const dist = picked.distance > 1000 ? (picked.distance/1000).toFixed(1)+'km' : picked.distance+'m'
    const text = `🎯 今天吃啥帮我选了「${picked.name}」| ${dist}，你也试试？`
    const url = window.location.origin + '/single'
    if (navigator.share) { navigator.share({title:'今天吃啥',text,url}).catch(()=>{}) }
    else { copyText(text+' '+url) }
    setShowShare(false)
  }

  const handleCopyShare = () => {
    if (!picked) return
    const dist = picked.distance > 1000 ? (picked.distance/1000).toFixed(1)+'km' : picked.distance+'m'
    copyText(`🎯 今天吃啥帮我选了「${picked.name}」| ${dist}，你也试试？ ${window.location.origin}/single`)
    setShowShare(false)
  }

  const copyText = (text) => {
    if (navigator.clipboard) { navigator.clipboard.writeText(text).then(()=>setToast('已复制！')) }
    else { setToast('复制失败，请长按手动复制') }
  }

  const handleNavigate = () => {
    if (picked) {
      const url = `https://uri.amap.com/marker?position=${picked.lng},${picked.lat}&name=${encodeURIComponent(picked.name)}`
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const handleManualSearch = async () => {
    if (!manualCity.trim()) return
    try {
      const { lng, lat } = await geocodeAddress(manualCity)
      const geo = await reverseGeocode(lng, lat)
      setLocation({lng,lat}); setAddress(geo.city||manualCity); setLocationDenied(false); setError('')
    } catch (e) { setError(e.message || '搜索失败') }
  }

  const fmt = (ts) => {
    const d = new Date(ts)
    return `${d.getMonth()+1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2,'0')}`
  }

  return (
    <div className="single-page">
      <button className="back-btn" onClick={()=>navigate('/')}>← 首页</button>

      <div className="single-header">
        <h1 className="page-title">单人吃啥</h1>
        <p className="page-subtitle">帮你从附近随机挑一家</p>
      </div>

      {/* 位置 */}
      <div className="location-pill">
        <span className="loc-dot" />
        <span className="loc-text">{address || '定位中…'}</span>
        <button className="loc-refresh" onClick={getLocation}>⟳</button>
      </div>

      {/* 手动输入 */}
      {locationDenied && (
        <div className="manual-box anim-fade-up">
          <p>需要位置才能帮你找附近的店哦～</p>
          <div className="manual-row">
            <input className="manual-input" placeholder="例如：北京朝阳" value={manualCity}
              onChange={e=>setManualCity(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleManualSearch()} />
            <button className="btn btn-primary" onClick={handleManualSearch}>搜索</button>
          </div>
        </div>
      )}

      {/* CTA */}
      <button className="btn btn-primary btn-lg btn-block cta-btn" onClick={handleSearch} disabled={loading}>
        {loading ? '正在搜索附近的餐厅…' : '🎯 帮我决定今天吃啥'}
      </button>

      {/* Error */}
      {error && (
        <div className="error-box anim-fade-up">
          <p>{error}</p>
          {error.includes('扩大') && (
            <button className="btn btn-secondary" style={{marginTop:8}}
              onClick={async()=>{
                const r=await searchNearbyFood(location.lng,location.lat,5000)
                if(r.length>0){setRestaurants(r);const c=pickRestaurant(r);setPicked(c);addHistory(c);setHistory(getHistory());setError('')}
                else{setError('扩大范围还是没找到')}
              }}>扩大至 5km</button>
          )}
        </div>
      )}

      {/* Loading */}
      {loading && !picked && (
        <div className="loading-area">
          <div className="loading-dots"><span className="dot"/><span className="dot"/><span className="dot"/></div>
          <p>正在附近搜罗美食…</p>
        </div>
      )}

      {/* Result */}
      {picked && !loading && (
        <RestaurantCard restaurant={picked} onReroll={handleReroll}
          onShare={()=>setShowShare(true)} onNavigate={handleNavigate} />
      )}

      {/* Share modal */}
      {showShare && (
        <div className="modal-overlay" onClick={()=>setShowShare(false)}>
          <div className="modal-sheet" onClick={e=>e.stopPropagation()}>
            <h3>分享给朋友</h3>
            {navigator.share && <button onClick={handleShare}>📤 直接分享</button>}
            <button onClick={handleCopyShare}>📋 复制文案</button>
            <button className="cancel-btn" onClick={()=>setShowShare(false)}>取消</button>
          </div>
        </div>
      )}

      {/* History */}
      <div className="history-area">
        <button className="history-toggle" onClick={()=>{setShowHistory(!showHistory);setHistory(getHistory())}}>
          推荐记录 ({history.length}) {showHistory?'▲':'▼'}
        </button>
        {showHistory && (
          <div className="history-list">
            {history.length===0 ? <p className="history-empty">暂无记录</p> :
              history.map((item,i)=>(
                <div key={i} className="history-row">
                  <span className="h-name">{item.name}</span>
                  <span className="h-time">{fmt(item.timestamp)}</span>
                  <button className="h-del" onClick={()=>{removeHistoryItem(i);setHistory(getHistory())}}>✕</button>
                </div>
              ))
            }
          </div>
        )}
      </div>

      {toast && <div className="toast" onClick={()=>setToast('')}>{toast}</div>}
    </div>
  )
}
