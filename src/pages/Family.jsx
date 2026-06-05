import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { generateMealPlan } from '../utils/algorithm'
import { getAllRecipes } from '../utils/algorithm'
import NumberPicker from '../components/NumberPicker'
import RecipeCard from '../components/RecipeCard'
import './Family.css'

const TASTE_OPTIONS = [
  { value: 'light', label: '🥗 清淡', desc: '少油少盐' },
  { value: 'medium', label: '🍚 适中', desc: '家常口味' },
  { value: 'heavy', label: '🌶️ 重口', desc: '无辣不欢' },
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

  const handleGenerate = () => {
    if (adults + children === 0) {
      setError('至少得有一个人吃饭吧～')
      return
    }

    const allRecipes = getAllRecipes()
    if (allRecipes.length < 3) {
      setError('菜谱库快空了，先去加点菜吧～')
      return
    }

    setLoading(true)
    setError('')
    setMealPlan(null)

    // 加一点延迟让加载动画可见
    setTimeout(() => {
      const plan = generateMealPlan(adults, children, taste)
      setMealPlan(plan)
      setLoading(false)
    }, 600)
  }

  const handleShare = () => {
    if (!mealPlan) return
    const allDishes = [
      ...mealPlan.adultDishes.map(d => d.name),
      ...mealPlan.childDishes.map(d => d.name),
      ...mealPlan.soups.map(d => d.name)
    ]
    const text = `🍳 今晚 ${adults}大人${children > 0 ? '+' + children + '小孩' : ''}：${allDishes.join(' · ')}，你家今晚吃什么？`
    const url = window.location.origin + '/family'

    if (navigator.share) {
      navigator.share({ title: '今天吃啥 - 家庭菜单', text, url }).catch(() => {})
    } else {
      copyFamilyText(text, url)
    }
    setShowShare(false)
  }

  const handleCopyShare = () => {
    if (!mealPlan) return
    const allDishes = [
      ...mealPlan.adultDishes.map(d => d.name),
      ...mealPlan.childDishes.map(d => d.name),
      ...mealPlan.soups.map(d => d.name)
    ]
    const text = `🍳 今晚 ${adults}大人${children > 0 ? '+' + children + '小孩' : ''}：${allDishes.join(' · ')}，你家今晚吃什么？`
    const url = window.location.origin + '/family'
    copyFamilyText(text, url)
    setShowShare(false)
  }

  const copyFamilyText = (text, url) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text + ' ' + url).then(() => setToast('已复制！去粘贴给朋友吧'))
    } else {
      setToast('复制失败，请长按手动复制')
    }
  }

  const totalPeople = adults + children

  return (
    <div className="family-page">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← 首页
      </button>

      <h1 className="page-title">家庭吃啥 👨‍👩‍👧‍👦</h1>

      {/* 人数选择 */}
      <div className="family-page__card card">
        <NumberPicker label="👨‍👩‍👧 大人" value={adults} onChange={setAdults} max={10} />
        <NumberPicker label="🧒 小孩" value={children} onChange={setChildren} max={10} />
        {totalPeople > 0 && (
          <p className="family-page__total">
            共 {totalPeople} 人
            {children > 0 ? `（其中 ${children} 位小朋友）` : ''}
            {totalPeople <= 2 ? ' → 2菜1汤' : totalPeople <= 4 ? ' → 3菜1汤' : ' → 4菜1汤'}
          </p>
        )}
      </div>

      {/* 口味选择 */}
      <div className="family-page__card card">
        <p className="family-page__section-label">口味偏好</p>
        <div className="taste-options">
          {TASTE_OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`taste-btn ${taste === opt.value ? 'taste-btn--active' : ''}`}
              onClick={() => setTaste(opt.value)}
            >
              <span className="taste-btn__label">{opt.label}</span>
              <span className="taste-btn__desc">{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 生成按钮 */}
      <button
        className="btn btn--primary btn--large btn--block family-page__cta"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? '正在搭配中… 🍳' : '🔥 开始做菜'}
      </button>

      {/* 错误 */}
      {error && (
        <div className="family-page__error">
          <p>{error}</p>
          {error.includes('菜谱库') && (
            <button className="btn btn--secondary" onClick={() => navigate('/custom-recipes')}>
              📖 去添加菜谱
            </button>
          )}
        </div>
      )}

      {/* 加载 */}
      {loading && (
        <div className="family-page__loading">
          <div className="loading-dots">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
          <p>正在搭配营养均衡的菜单…</p>
        </div>
      )}

      {/* 菜单结果 */}
      {mealPlan && !loading && (
        <div className="meal-result animate-fade-in">
          <div className="meal-result__header">
            <h2>📋 今日菜单</h2>
            <button className="btn btn--secondary" onClick={() => setShowShare(true)}>
              📤 分享菜单
            </button>
          </div>

          {/* 大人菜 */}
          {mealPlan.adultDishes.length > 0 && (
            <div className="meal-section">
              <h3 className="meal-section__title">👨‍👩‍👧 大人菜</h3>
              {mealPlan.adultDishes.map(dish => (
                <RecipeCard key={dish.id} recipe={dish} audience="adult" />
              ))}
            </div>
          )}

          {/* 小孩菜 */}
          {mealPlan.childDishes.length > 0 && (
            <div className="meal-section">
              <h3 className="meal-section__title">🧒 小孩菜</h3>
              {mealPlan.childDishes.map(dish => (
                <RecipeCard key={dish.id} recipe={dish} audience="child" />
              ))}
            </div>
          )}

          {/* 汤 */}
          {mealPlan.soups.length > 0 && (
            <div className="meal-section">
              <h3 className="meal-section__title">🍲 汤</h3>
              {mealPlan.soups.map(dish => (
                <RecipeCard key={dish.id} recipe={dish} audience="adult" />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 分享弹窗 */}
      {showShare && (
        <div className="modal-overlay" onClick={() => setShowShare(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <h3 className="modal-sheet__title">分享菜单</h3>
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

      {/* Toast */}
      {toast && (
        <div className="toast" onClick={() => setToast('')}>
          {toast}
        </div>
      )}
    </div>
  )
}
