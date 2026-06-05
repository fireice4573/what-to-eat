import { useNavigate } from 'react-router-dom'
import './Home.css'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <header className="home__header">
        <h1 className="home__title">
          <span className="home__emoji">🍜</span>
          今天吃啥
        </h1>
        <p className="home__subtitle">专治选择困难症，打开就有答案</p>
      </header>

      <div className="home__cards">
        <button
          className="home-card home-card--single"
          onClick={() => navigate('/single')}
        >
          <span className="home-card__emoji">🧑‍🍳</span>
          <span className="home-card__title">单人吃啥</span>
          <span className="home-card__desc">附近餐厅 · 随机推荐</span>
        </button>

        <button
          className="home-card home-card--family"
          onClick={() => navigate('/family')}
        >
          <span className="home-card__emoji">👨‍👩‍👧‍👦</span>
          <span className="home-card__title">家庭吃啥</span>
          <span className="home-card__desc">按人搭配 · 自动出菜</span>
        </button>
      </div>

      <footer className="home__footer">
        <button
          className="home__link"
          onClick={() => navigate('/custom-recipes')}
        >
          📖 我的菜谱库
        </button>
      </footer>
    </div>
  )
}
