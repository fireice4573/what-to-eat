import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PRESET_RECIPES } from '../data/recipes'
import { getCustomRecipes, addCustomRecipe, deleteCustomRecipe } from '../utils/storage'
import './CustomRecipes.css'

const CATEGORIES = ['家常菜', '狠菜']
const AUDIENCES = [
  { value: 'adult', label: '大人' },
  { value: 'child', label: '小孩' },
  { value: 'all', label: '通用' },
]
const TASTES = [
  { value: 'light', label: '清淡' },
  { value: 'medium', label: '适中' },
  { value: 'heavy', label: '重口' },
]

const EMPTY_FORM = {
  name: '',
  category: '家常菜',
  audience: 'adult',
  taste: 'medium',
  isSoup: false,
  isVegetarian: false,
  cookTime: '',
  ingredients: '',
  steps: '',
}

export default function CustomRecipes() {
  const navigate = useNavigate()
  const [customRecipes, setCustomRecipes] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ ...EMPTY_FORM })
  const [toast, setToast] = useState('')
  const [filter, setFilter] = useState('all') // 'all' | 'preset' | 'custom'

  useEffect(() => {
    setCustomRecipes(getCustomRecipes())
  }, [])

  const allRecipes = [
    ...PRESET_RECIPES.map(r => ({ ...r, isPreset: true })),
    ...customRecipes.map(r => ({ ...r, isPreset: false })),
  ]

  const filteredRecipes = filter === 'all'
    ? allRecipes
    : filter === 'preset'
      ? allRecipes.filter(r => r.isPreset)
      : allRecipes.filter(r => !r.isPreset)

  const handleSubmit = () => {
    if (!form.name.trim()) {
      setToast('菜名不能为空哦～')
      return
    }
    if (!form.ingredients.trim()) {
      setToast('至少写一样食材吧～')
      return
    }
    if (!form.steps.trim()) {
      setToast('步骤也写一下吧～')
      return
    }

    addCustomRecipe({
      name: form.name.trim(),
      category: form.category,
      audience: form.audience,
      taste: form.taste,
      isSoup: form.isSoup,
      isVegetarian: form.isVegetarian,
      cookTime: parseInt(form.cookTime) || 15,
      ingredients: form.ingredients.split('\n').filter(s => s.trim()),
      steps: form.steps.split('\n').filter(s => s.trim()),
    })

    setCustomRecipes(getCustomRecipes())
    setForm({ ...EMPTY_FORM })
    setShowForm(false)
    setToast('添加成功！🎉')
  }

  const handleDelete = (id) => {
    deleteCustomRecipe(id)
    setCustomRecipes(getCustomRecipes())
    setToast('已删除')
  }

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="custom-page">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← 首页
      </button>

      <div className="custom-page__header">
        <h1 className="page-title">📖 我的菜谱库</h1>
        <button
          className="btn btn--primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '取消' : '+ 添加新菜'}
        </button>
      </div>

      {/* 添加表单 */}
      {showForm && (
        <div className="custom-page__form card animate-fade-in">
          <h3>添加新菜谱</h3>

          <div className="form-group">
            <label>菜名 *</label>
            <input
              type="text"
              placeholder="例如：红烧排骨"
              value={form.name}
              onChange={e => updateForm('name', e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>分类</label>
              <select value={form.category} onChange={e => updateForm('category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>耗时(分钟)</label>
              <input
                type="number"
                placeholder="15"
                value={form.cookTime}
                onChange={e => updateForm('cookTime', e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>适合人群</label>
              <div className="form-chips">
                {AUDIENCES.map(a => (
                  <button
                    key={a.value}
                    className={`chip ${form.audience === a.value ? 'chip--active' : ''}`}
                    onClick={() => updateForm('audience', a.value)}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>口味</label>
            <div className="form-chips">
              {TASTES.map(t => (
                <button
                  key={t.value}
                  className={`chip ${form.taste === t.value ? 'chip--active' : ''}`}
                  onClick={() => updateForm('taste', t.value)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-row form-checks">
            <label className="form-check">
              <input
                type="checkbox"
                checked={form.isSoup}
                onChange={e => updateForm('isSoup', e.target.checked)}
              />
              是汤类
            </label>
            <label className="form-check">
              <input
                type="checkbox"
                checked={form.isVegetarian}
                onChange={e => updateForm('isVegetarian', e.target.checked)}
              />
              素菜
            </label>
          </div>

          <div className="form-group">
            <label>食材 *（一行一个）</label>
            <textarea
              rows={4}
              placeholder="番茄 2个&#10;鸡蛋 3个&#10;葱&#10;盐"
              value={form.ingredients}
              onChange={e => updateForm('ingredients', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>步骤 *（一行一步）</label>
            <textarea
              rows={5}
              placeholder="番茄切块，鸡蛋打散加少许盐&#10;热油炒鸡蛋至凝固盛出&#10;炒番茄至出汁&#10;倒回鸡蛋翻炒调味&#10;撒葱花出锅"
              value={form.steps}
              onChange={e => updateForm('steps', e.target.value)}
            />
          </div>

          <button className="btn btn--primary btn--block" onClick={handleSubmit}>
            ✅ 保存菜谱
          </button>
        </div>
      )}

      {/* 过滤 */}
      <div className="custom-page__filter">
        {[
          { value: 'all', label: '全部' },
          { value: 'preset', label: '预设' },
          { value: 'custom', label: '自定义' },
        ].map(f => (
          <button
            key={f.value}
            className={`filter-btn ${filter === f.value ? 'filter-btn--active' : ''}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
        <span className="custom-page__count">共 {filteredRecipes.length} 道</span>
      </div>

      {/* 菜谱列表 */}
      <div className="custom-page__list">
        {filteredRecipes.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state__emoji">🍽️</p>
            <p>还没有菜谱，点击上方按钮添加吧～</p>
          </div>
        ) : (
          filteredRecipes.map(recipe => (
            <div key={recipe.id} className="recipe-list-item card">
              <div className="recipe-list-item__info">
                <h4>
                  {recipe.name}
                  {recipe.isPreset && <span className="badge badge--preset">预设</span>}
                </h4>
                <div className="recipe-list-item__meta">
                  <span>{recipe.category}</span>
                  <span>⏱️ {recipe.cookTime}min</span>
                  <span>🌶️ {recipe.taste === 'light' ? '清淡' : recipe.taste === 'medium' ? '适中' : '重口'}</span>
                  {recipe.isSoup && <span>🍲 汤</span>}
                  {recipe.isVegetarian && <span>🥬 素</span>}
                </div>
              </div>
              {!recipe.isPreset && (
                <button
                  className="btn--delete"
                  onClick={() => handleDelete(recipe.id)}
                  title="删除"
                >
                  🗑️
                </button>
              )}
            </div>
          ))
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
