import { getRecentRecommendations } from './storage'
import { PRESET_RECIPES } from '../data/recipes'
import { getCustomRecipes } from './storage'

// ===== 单人模式 =====

/**
 * 从附近餐厅中随机选一家（带去重）
 */
export function pickRestaurant(restaurants) {
  if (!restaurants || restaurants.length === 0) return null

  const recent = getRecentRecommendations()
  const fresh = restaurants.filter(r => !recent.includes(r.name))

  const pool = fresh.length > 0 ? fresh : restaurants
  const index = Math.floor(Math.random() * pool.length)
  return pool[index]
}

// ===== 家庭模式 =====

/**
 * 获取全部可用菜谱（预设 + 用户自定义）
 */
export function getAllRecipes() {
  return [...PRESET_RECIPES, ...getCustomRecipes()]
}

/**
 * 根据人数确定菜量
 */
function getMealSize(adults, children) {
  const total = adults + children
  if (total <= 0) return { dishes: 2, soups: 1 }
  if (total <= 2) return { dishes: 2, soups: 1 }
  if (total <= 4) return { dishes: 3, soups: 1 }
  return { dishes: 4, soups: 1 }
}

/**
 * 随机抽取不重复的菜
 */
function pickRandom(arr, count) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, arr.length))
}

/**
 * 生成家庭菜单
 * @param {number} adults - 大人数量
 * @param {number} children - 小孩数量
 * @param {string} taste - 'light' | 'medium' | 'heavy'
 */
export function generateMealPlan(adults = 0, children = 0, taste = 'medium') {
  const allRecipes = getAllRecipes()
  const { dishes, soups } = getMealSize(adults, children)

  // 大人菜：匹配所选口味
  const adultPool = allRecipes.filter(r =>
    r.audience !== 'child' &&
    r.taste === taste &&
    !r.isSoup
  )

  // 小孩菜：强制清淡
  const childPool = allRecipes.filter(r =>
    r.audience !== 'adult' &&
    r.taste === 'light' &&
    !r.isSoup
  )

  // 汤池
  const soupPool = allRecipes.filter(r => r.isSoup)

  // 需要几道小孩菜：有小孩时至少1道
  const childDishCount = children > 0 ? Math.max(1, Math.ceil(children / 2)) : 0
  const adultDishCount = dishes - childDishCount

  const childDishes = pickRandom(childPool, childDishCount)
  const adultDishes = pickRandom(adultPool, Math.max(adultDishCount, dishes - childDishes.length))
  const soup = pickRandom(soupPool, soups)

  // 确保至少1道素菜
  const allPicked = [...adultDishes, ...childDishes]
  if (allPicked.length > 0 && !allPicked.some(d => d.isVegetarian)) {
    const vegPool = allRecipes.filter(r =>
      r.isVegetarian && !allPicked.find(p => p.id === r.id) && !r.isSoup
    )
    if (vegPool.length > 0) {
      const replaceIdx = adultDishes.findIndex(d => !d.isVegetarian)
      if (replaceIdx >= 0) {
        adultDishes[replaceIdx] = pickRandom(vegPool, 1)[0]
      }
    }
  }

  return {
    adultDishes,
    childDishes,
    soups: soup,
    totalCount: allPicked.length + soup.length
  }
}
