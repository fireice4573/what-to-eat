const HISTORY_KEY = 'eat_what_history'
const CUSTOM_RECIPES_KEY = 'eat_what_custom_recipes'

// ===== 推荐历史 =====

export function getHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function addHistory(restaurant) {
  const history = getHistory()
  history.unshift({
    name: restaurant.name,
    address: restaurant.address,
    lat: restaurant.lat,
    lng: restaurant.lng,
    timestamp: Date.now()
  })
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}

export function removeHistoryItem(index) {
  const history = getHistory()
  history.splice(index, 1)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}

export function getRecentRecommendations(days = 7) {
  const history = getHistory()
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000
  return history.filter(h => h.timestamp > cutoff).map(h => h.name)
}

// ===== 自定义菜谱 =====

export function getCustomRecipes() {
  try {
    const raw = localStorage.getItem(CUSTOM_RECIPES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function addCustomRecipe(recipe) {
  const recipes = getCustomRecipes()
  const newRecipe = {
    ...recipe,
    id: 'custom-' + Date.now(),
    audience: recipe.audience || 'adult',
    taste: recipe.taste || 'medium',
    isSoup: recipe.isSoup || false,
    isVegetarian: recipe.isVegetarian || false
  }
  recipes.push(newRecipe)
  localStorage.setItem(CUSTOM_RECIPES_KEY, JSON.stringify(recipes))
  return newRecipe
}

export function deleteCustomRecipe(id) {
  const recipes = getCustomRecipes().filter(r => r.id !== id)
  localStorage.setItem(CUSTOM_RECIPES_KEY, JSON.stringify(recipes))
}
