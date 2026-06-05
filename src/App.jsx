import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Single from './pages/Single'
import Family from './pages/Family'
import CustomRecipes from './pages/CustomRecipes'

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/single" element={<Single />} />
        <Route path="/family" element={<Family />} />
        <Route path="/custom-recipes" element={<CustomRecipes />} />
      </Routes>
    </div>
  )
}
