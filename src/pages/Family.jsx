import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import html2canvas from 'html2canvas'
import { generateMealPlan, getAllRecipes } from '../utils/algorithm'
import NumberPicker from '../components/NumberPicker'
import RecipeCard from '../components/RecipeCard'
import ShareCard from '../components/ShareCard'
import './Family.css'

const TASTES = [
  { value:'light', label:'🥗 清淡', desc:'少油少盐' },
  { value:'medium', label:'🍚 适中', desc:'家常口味' },
  { value:'heavy', label:'🌶️ 重口', desc:'无辣不欢' },
]

export default function Family() {
  const navigate = useNavigate()
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [taste, setTaste] = useState('medium')
  const [mealPlan, setMealPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showShare, setShowShare] = useState(false)
  const [toast, setToast] = useState('')
  const [screenshotting, setScreenshotting] = useState(false)
  const cardRef = useRef(null)

  const handleGenerate = () => {
    if (adults+children===0) { setError('至少得有一个人吃饭吧～'); return }
    const all = getAllRecipes()
    if (all.length<3) { setError('菜谱库快空了，先去加点菜吧～'); return }
    setLoading(true); setError(''); setMealPlan(null)
    setTimeout(()=>{
      setMealPlan(generateMealPlan(adults,children,taste))
      setLoading(false)
    },600)
  }

  const buildShareText = () => {
    if (!mealPlan) return ''
    const dishes = [...mealPlan.adultDishes.map(d=>d.name), ...mealPlan.childDishes.map(d=>d.name), ...mealPlan.soups.map(d=>d.name)]
    return `🍳 今晚 ${adults}大人${children>0?'+'+children+'小孩':''}：${dishes.join(' · ')}，你家今晚吃什么？`
  }

  const doShare = (mode) => {
    const text = buildShareText(); const url = window.location.origin+'/family'
    if (mode==='native' && navigator.share) { navigator.share({title:'今天吃啥·家庭菜单',text,url}).catch(()=>{}) }
    else {
      if (navigator.clipboard) { navigator.clipboard.writeText(text+' '+url).then(()=>setToast('已复制！')) }
      else { setToast('复制失败') }
    }
    setShowShare(false)
  }

  const saveImage = async () => {
    setShowShare(false)
    setScreenshotting(true)
    // Wait for the hidden card to render
    await new Promise(r => setTimeout(r, 300))
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      })
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `今天吃啥_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.png`
        a.click()
        URL.revokeObjectURL(url)
        setToast('✅ 图片已保存！')
      }, 'image/png')
    } catch (e) {
      setToast('😢 生成失败，请重试')
    }
    setScreenshotting(false)
  }

  return (
    <div className="family-page">
      <button className="back-btn" onClick={()=>navigate('/')}>← 首页</button>
      <div className="family-header">
        <h1 className="page-title">家庭吃啥</h1>
        <p className="page-subtitle">按人数搭配，大人小孩分开</p>
      </div>

      {/* 人数 */}
      <div className="card family-card">
        <NumberPicker label="👨‍👩‍👧 大人" value={adults} onChange={setAdults} max={10} />
        <div className="family-divider" />
        <NumberPicker label="🧒 小孩" value={children} onChange={setChildren} max={10} />
        {adults+children>0 && (
          <div className="family-summary">
            共 {adults+children} 人  ·  {adults+children<=2?'2菜1汤':adults+children<=4?'3菜1汤':'4菜1汤'}
            {children>0 && `  ·  含${Math.max(1,Math.ceil(children/2))}道小孩菜`}
          </div>
        )}
      </div>

      {/* 口味 */}
      <div className="card family-card">
        <p className="flabel">口味偏好</p>
        <div className="taste-row">
          {TASTES.map(t=>(
            <button key={t.value} className={`taste-btn ${taste===t.value?'taste-active':''}`}
              onClick={()=>setTaste(t.value)}>
              <span className="taste-label">{t.label}</span>
              <span className="taste-desc">{t.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button className="btn btn-primary btn-lg btn-block" style={{margin:'8px 0 20px'}}
        onClick={handleGenerate} disabled={loading}>
        {loading ? '搭配中…' : '🔥 开始做菜'}
      </button>

      {error && <div className="error-box anim-fade-up"><p>{error}</p>{error.includes('菜谱库')&&<button className="btn btn-secondary" style={{marginTop:8}} onClick={()=>navigate('/custom-recipes')}>📖 去添加菜谱</button>}</div>}
      {loading && <div className="loading-area"><div className="loading-dots"><span className="dot"/><span className="dot"/><span className="dot"/></div><p>搭配营养均衡的一桌菜…</p></div>}

      {mealPlan && !loading && (
        <div className="meal-result anim-fade-up">
          <div className="meal-header">
            <h2>📋 今日菜单</h2>
            <button className="btn btn-secondary" style={{padding:'10px 16px',fontSize:'14px'}} onClick={()=>setShowShare(true)}>📤 分享</button>
          </div>
          {mealPlan.adultDishes.length>0 && <div className="meal-group"><h3>👨‍👩‍👧 大人菜</h3>{mealPlan.adultDishes.map(d=><RecipeCard key={d.id} recipe={d} audience="adult"/>)}</div>}
          {mealPlan.childDishes.length>0 && <div className="meal-group"><h3>🧒 小孩菜</h3>{mealPlan.childDishes.map(d=><RecipeCard key={d.id} recipe={d} audience="child"/>)}</div>}
          {mealPlan.soups.length>0 && <div className="meal-group"><h3>🍲 汤</h3>{mealPlan.soups.map(d=><RecipeCard key={d.id} recipe={d} audience="adult"/>)}</div>}
        </div>
      )}

      {showShare && (
        <div className="modal-overlay" onClick={()=>setShowShare(false)}>
          <div className="modal-sheet" onClick={e=>e.stopPropagation()}>
            <h3>分享菜单</h3>
            {navigator.share && <button onClick={()=>doShare('native')}>📤 直接分享</button>}
            <button onClick={()=>doShare('copy')}>📋 复制文案</button>
            <button onClick={saveImage}>📸 保存图片</button>
            <button className="cancel-btn" onClick={()=>setShowShare(false)}>取消</button>
          </div>
        </div>
      )}

      {toast && <div className="toast" onClick={()=>setToast('')}>{toast}</div>}

      {/* Hidden share card for screenshot */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <div ref={cardRef}>
          {mealPlan && (
            <ShareCard
              mealPlan={mealPlan}
              adults={adults}
              children={children}
              dateStr={new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
            />
          )}
        </div>
      </div>
    </div>
  )
}
