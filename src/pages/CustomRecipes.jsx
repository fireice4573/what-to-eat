import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PRESET_RECIPES } from '../data/recipes'
import { getCustomRecipes, addCustomRecipe, deleteCustomRecipe } from '../utils/storage'
import './CustomRecipes.css'

const CATEGORIES = ['家常菜','狠菜']
const AUDIENCES = [{v:'adult',l:'大人'},{v:'child',l:'小孩'},{v:'all',l:'通用'}]
const TASTES = [{v:'light',l:'清淡'},{v:'medium',l:'适中'},{v:'heavy',l:'重口'}]
const EF = { name:'', category:'家常菜', audience:'adult', taste:'medium', isSoup:false, isVegetarian:false, cookTime:'', ingredients:'', steps:'' }

export default function CustomRecipes() {
  const navigate = useNavigate()
  const [customRecipes, setCustomRecipes] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({...EF})
  const [toast, setToast] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(()=>{setCustomRecipes(getCustomRecipes())},[])

  const all = [...PRESET_RECIPES.map(r=>({...r,isPreset:true})), ...customRecipes.map(r=>({...r,isPreset:false}))]
  const filtered = filter==='all'?all:filter==='preset'?all.filter(r=>r.isPreset):all.filter(r=>!r.isPreset)

  const handleSubmit = () => {
    if(!form.name.trim()){setToast('菜名不能为空哦～');return}
    if(!form.ingredients.trim()){setToast('至少写一样食材吧～');return}
    if(!form.steps.trim()){setToast('步骤也写一下吧～');return}
    addCustomRecipe({
      name:form.name.trim(), category:form.category, audience:form.audience,
      taste:form.taste, isSoup:form.isSoup, isVegetarian:form.isVegetarian,
      cookTime:parseInt(form.cookTime)||15,
      ingredients:form.ingredients.split('\n').filter(s=>s.trim()),
      steps:form.steps.split('\n').filter(s=>s.trim()),
    })
    setCustomRecipes(getCustomRecipes()); setForm({...EF}); setShowForm(false); setToast('添加成功！🎉')
  }

  const handleDelete = (id) => { deleteCustomRecipe(id); setCustomRecipes(getCustomRecipes()); setToast('已删除') }
  const uf = (f,v) => setForm(p=>({...p,[f]:v}))

  return (
    <div className="custom-page">
      <button className="back-btn" onClick={()=>navigate('/')}>← 首页</button>
      <div className="custom-header">
        <h1 className="page-title">我的菜谱库</h1>
        <button className="btn btn-primary" style={{padding:'10px 18px',fontSize:'14px'}}
          onClick={()=>setShowForm(!showForm)}>{showForm?'取消':'+ 添加新菜'}</button>
      </div>

      {showForm && (
        <div className="card form-card anim-fade-up">
          <h3>✏️ 添加新菜谱</h3>
          <div className="fg"><label>菜名 *</label><input type="text" placeholder="例如：红烧排骨" value={form.name} onChange={e=>uf('name',e.target.value)} /></div>
          <div className="fr">
            <div className="fg"><label>分类</label><select value={form.category} onChange={e=>uf('category',e.target.value)}>{CATEGORIES.map(c=><option key={c}>{c}</option>)}</select></div>
            <div className="fg"><label>耗时(分钟)</label><input type="number" placeholder="15" value={form.cookTime} onChange={e=>uf('cookTime',e.target.value)} /></div>
          </div>
          <div className="fg"><label>适合人群</label><div className="chips">{AUDIENCES.map(a=><button key={a.v} className={`chip ${form.audience===a.v?'chip-on':''}`} onClick={()=>uf('audience',a.v)}>{a.l}</button>)}</div></div>
          <div className="fg"><label>口味</label><div className="chips">{TASTES.map(t=><button key={t.v} className={`chip ${form.taste===t.v?'chip-on':''}`} onClick={()=>uf('taste',t.v)}>{t.l}</button>)}</div></div>
          <div className="fr fchecks">
            <label className="fcheck"><input type="checkbox" checked={form.isSoup} onChange={e=>uf('isSoup',e.target.checked)} /> 汤类</label>
            <label className="fcheck"><input type="checkbox" checked={form.isVegetarian} onChange={e=>uf('isVegetarian',e.target.checked)} /> 素菜</label>
          </div>
          <div className="fg"><label>食材 *（一行一个）</label><textarea rows={4} placeholder={"番茄 2个\n鸡蛋 3个\n葱\n盐"} value={form.ingredients} onChange={e=>uf('ingredients',e.target.value)} /></div>
          <div className="fg"><label>步骤 *（一行一步）</label><textarea rows={5} placeholder={"番茄切块，鸡蛋打散\n热油炒鸡蛋盛出\n炒番茄至出汁\n倒回鸡蛋翻炒调味"} value={form.steps} onChange={e=>uf('steps',e.target.value)} /></div>
          <button className="btn btn-primary btn-block" onClick={handleSubmit}>✅ 保存菜谱</button>
        </div>
      )}

      <div className="filter-bar">
        {[{v:'all',l:'全部'},{v:'preset',l:'预设'},{v:'custom',l:'自定义'}].map(f=>(
          <button key={f.v} className={`fbtn ${filter===f.v?'fbtn-on':''}`} onClick={()=>setFilter(f.v)}>{f.l}</button>
        ))}
        <span className="fcount">共 {filtered.length} 道</span>
      </div>

      {filtered.length===0 ? (
        <div className="empty-state"><p className="empty-emoji">🍽️</p><p>还没有菜谱，点上方按钮添加吧～</p></div>
      ) : (
        filtered.map(r=>(
          <div key={r.id} className="card rlist-item">
            <div className="rlist-info">
              <h4>{r.name}{r.isPreset&&<span className="preset-badge">预设</span>}</h4>
              <div className="rlist-meta">
                <span>{r.category}</span><span>⏱️ {r.cookTime}min</span>
                <span>{r.taste==='light'?'清淡':r.taste==='medium'?'适中':'重口'}</span>
                {r.isSoup&&<span>🍲汤</span>}{r.isVegetarian&&<span>🥬素</span>}
              </div>
            </div>
            {!r.isPreset && <button className="del-btn" onClick={()=>handleDelete(r.id)}>🗑️</button>}
          </div>
        ))
      )}

      {toast && <div className="toast" onClick={()=>setToast('')}>{toast}</div>}
    </div>
  )
}
