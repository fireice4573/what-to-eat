import { useNavigate } from 'react-router-dom'
import './Home.css'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">🥢 今天吃什么？</div>
        <h1 className="hero-title">
          帮你决定<span className="hero-highlight">今天吃啥</span>
        </h1>
        <p className="hero-desc">
          打开即用 · 随机推荐 · 告别纠结
        </p>
        <div className="hero-visual">
          <div className="hero-bowl">
            <span className="hero-emoji">🍜</span>
            <div className="hero-steam">
              <span /><span /><span />
            </div>
          </div>
        </div>
      </section>

      {/* 模式选择 */}
      <section className="mode-section">
        <button className="mode-card mode-card-orange anim-fade-up" onClick={() => navigate('/single')}>
          <div className="mode-card-icon">🧑‍🍳</div>
          <div className="mode-card-content">
            <h2>单人吃啥</h2>
            <p>定位 · 搜附近 · 随机推荐</p>
          </div>
          <div className="mode-card-arrow">→</div>
        </button>

        <button className="mode-card mode-card-amber anim-fade-up" onClick={() => navigate('/family')} style={{animationDelay:'0.1s'}}>
          <div className="mode-card-icon">👨‍👩‍👧‍👦</div>
          <div className="mode-card-content">
            <h2>家庭吃啥</h2>
            <p>按人数搭配 · 大人小孩分开</p>
          </div>
          <div className="mode-card-arrow">→</div>
        </button>
      </section>

      {/* 底部 */}
      <footer className="home-footer">
        <button className="footer-link" onClick={() => navigate('/custom-recipes')}>
          📖 我的菜谱库
        </button>
        <p className="footer-tagline">免注册 · 零费用 · 打开就用</p>
      </footer>
    </div>
  )
}
