import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const FOOD_QUOTES = [
  '人间烟火气，最抚凡人心',
  '没有什么是一顿好吃的解决不了的',
  '吃饱了才有力气减肥',
  '今天也要好好吃饭呀',
  '唯有美食与爱不可辜负',
  '世界很大，不如先吃好这一顿',
  '人生苦短，再来一碗',
]

export default function Home() {
  const navigate = useNavigate()
  const [quote] = useState(() => FOOD_QUOTES[Math.floor(Math.random() * FOOD_QUOTES.length)])

  return (
    <div className="home">
      {/* 顶部装饰 - 飘浮的食物 */}
      <div className="home__decoration">
        <span className="float-item float-item--1">🥟</span>
        <span className="float-item float-item--2">🍜</span>
        <span className="float-item float-item--3">🥢</span>
        <span className="float-item float-item--4">🍚</span>
        <span className="float-item float-item--5">🫕</span>
        <span className="float-item float-item--6">🥬</span>
      </div>

      <header className="home__header">
        <div className="home__logo">
          <span className="home__logo-emoji animate-bounce-in">🍜</span>
        </div>
        <h1 className="home__title">今天吃啥</h1>
        <p className="home__subtitle">专治选择困难症，打开就有答案</p>
        <p className="home__quote">「 {quote} 」</p>
      </header>

      <div className="home__cards">
        <button
          className="home-card home-card--single animate-slide-up"
          onClick={() => navigate('/single')}
          style={{ animationDelay: '0.1s' }}
        >
          <div className="home-card__illustration">
            <span className="home-card__illust-emoji">🧑‍🍳</span>
            <div className="home-card__illust-dots">
              <span /><span /><span />
            </div>
          </div>
          <div className="home-card__content">
            <span className="home-card__title">单人吃啥</span>
            <span className="home-card__desc">附近餐厅 · 随机推荐 · 不纠结</span>
          </div>
          <span className="home-card__arrow">→</span>
        </button>

        <button
          className="home-card home-card--family animate-slide-up"
          onClick={() => navigate('/family')}
          style={{ animationDelay: '0.2s' }}
        >
          <div className="home-card__illustration">
            <span className="home-card__illust-emoji">👨‍👩‍👧‍👦</span>
            <div className="home-card__illust-steam">
              <span className="steam" /><span className="steam" /><span className="steam" />
            </div>
          </div>
          <div className="home-card__content">
            <span className="home-card__title">家庭吃啥</span>
            <span className="home-card__desc">按人搭配 · 小孩专属 · 营养均衡</span>
          </div>
          <span className="home-card__arrow">→</span>
        </button>
      </div>

      <footer className="home__footer">
        <button
          className="home__link"
          onClick={() => navigate('/custom-recipes')}
        >
          <span className="home__link-icon">📖</span>
          <span>我的菜谱库</span>
          <span className="home__link-hint">自定义你的专属菜单</span>
        </button>
        <p className="home__footer-text">
          免注册 · 免付费 · 打开即用
        </p>
      </footer>
    </div>
  )
}
