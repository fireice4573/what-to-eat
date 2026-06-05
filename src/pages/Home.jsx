import { useNavigate } from 'react-router-dom'
import './Home.css'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <header className="home-top">
        <div className="brand-mark">吃</div>
        <button className="home-library-btn" onClick={() => navigate('/custom-recipes')}>菜谱库</button>
      </header>

      <main className="home-shell">
        <section className="hero">
          <div className="hero-copy">
            <p className="hero-kicker">今天吃啥</p>
            <h1 className="hero-title">
              少纠结一会儿，早点吃上饭。
            </h1>
            <p className="hero-desc">
              一个人就随机附近餐厅，一家人就按人数和口味配一桌家常菜。
            </p>
          </div>

          <section className="mode-section" aria-label="选择模式">
            <button className="mode-card mode-card-orange anim-fade-up" onClick={() => navigate('/single')}>
              <div className="mode-card-icon">🧑‍🍳</div>
              <div className="mode-card-content">
                <h2>单人吃啥</h2>
                <p>定位附近餐厅，避开重复推荐。</p>
              </div>
              <div className="mode-card-arrow">→</div>
            </button>

            <button className="mode-card mode-card-amber anim-fade-up" onClick={() => navigate('/family')} style={{animationDelay:'0.1s'}}>
              <div className="mode-card-icon">🍳</div>
              <div className="mode-card-content">
                <h2>家庭吃啥</h2>
                <p>家常菜为主，自动照顾小孩口味。</p>
              </div>
              <div className="mode-card-arrow">→</div>
            </button>
          </section>
        </section>

        <aside className="home-aside" aria-label="今日建议">
          <div className="hero-visual">
            <div className="hero-bowl">
              <span className="hero-emoji">🍜</span>
              <div className="hero-steam"><span /><span /><span /></div>
            </div>
          </div>
          <div className="aside-card">
            <p className="aside-label">今晚思路</p>
            <h2>一荤一素一汤，够稳。</h2>
            <p>平日默认家常，偶尔再来一道狠菜，不让随机结果总是差不多。</p>
          </div>
          <div className="home-stats">
            <span>免注册</span>
            <span>本地保存</span>
            <span>打开就用</span>
          </div>
        </aside>
      </main>
    </div>
  )
}
