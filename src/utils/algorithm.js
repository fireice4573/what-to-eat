import { getRecentRecommendations } from './storage'
import { PRESET_RECIPES } from '../data/recipes'
import { getCustomRecipes } from './storage'

// ===== 单人模式 =====

export function pickRestaurant(restaurants) {
  if (!restaurants || restaurants.length === 0) return null

  const recent = getRecentRecommendations()
  const fresh = restaurants.filter(r => !recent.includes(r.name))

  const pool = fresh.length > 0 ? fresh : restaurants
  const index = Math.floor(Math.random() * pool.length)
  return pool[index]
}

// ===== 家庭模式 =====

export function getAllRecipes() {
  return [...PRESET_RECIPES, ...getCustomRecipes()]
}

function getMealSize(adults, children) {
  const total = adults + children
  if (total <= 0) return { dishes: 2, soups: 1 }
  if (total <= 2) return { dishes: 2, soups: 1 }
  if (total <= 4) return { dishes: 3, soups: 1 }
  return { dishes: 4, soups: 1 }
}

/**
 * 提取菜的所有食材关键字（用于去重，检查前2个主要食材避免撞车）
 */
function getKeyIngredients(dish) {
  if (!dish.ingredients || dish.ingredients.length === 0) return [dish.name]
  return dish.ingredients.slice(0, 2).map(raw =>
    raw
      .replace(/[\d]+g|[\d]+个|[\d]+块|[\d]+条|[\d]+把|[\d]+勺|[\d]+罐|[\d]+颗|[\d]+根|[\d]+只/g, '')
      .replace(/（[^）]*）/g, '')
      .replace(/\([^)]*\)/g, '')
      .replace(/或.*$/, '')
      .replace(/\s+/g, '')
      .trim()
      .slice(0, 4)
  )
}

/**
 * 随机抽取不重复主食材的菜
 */
function pickDiverse(arr, count, alreadyPicked = []) {
  const used = new Set(alreadyPicked.flatMap(d => getKeyIngredients(d)))
  // 先挑主食材不撞的（菜的所有关键食材都不在已用集合中）
  const diverse = arr.filter(d => {
    const keys = getKeyIngredients(d)
    return !keys.some(k => used.has(k))
  })
  // 不够就回退到全量
  const pool = diverse.length >= count ? diverse : arr
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, pool.length))
}

export function generateMealPlan(adults = 0, children = 0, taste = 'medium') {
  const allRecipes = getAllRecipes()
  const { dishes, soups } = getMealSize(adults, children)

  const adultPool = allRecipes.filter(r =>
    r.audience !== 'child' && r.taste === taste && !r.isSoup
  )
  const childPool = allRecipes.filter(r =>
    r.audience !== 'adult' && r.taste === 'light' && !r.isSoup
  )
  const soupPool = allRecipes.filter(r => r.isSoup)

  const childDishCount = children > 0 ? Math.max(1, Math.ceil(children / 2)) : 0
  const adultDishCount = dishes - childDishCount

  // 先抽小孩菜
  const childDishes = pickDiverse(childPool, childDishCount)
  // 大人菜避开小孩菜的主食材
  const adultDishes = pickDiverse(adultPool, adultDishCount, childDishes)
  // 汤也避开已选主食材
  const soup = pickDiverse(soupPool, soups, [...adultDishes, ...childDishes])

  // 至少1道素菜
  const allPicked = [...adultDishes, ...childDishes]
  if (allPicked.length > 0 && !allPicked.some(d => d.isVegetarian)) {
    const vegPool = allRecipes.filter(r =>
      r.isVegetarian && !allPicked.find(p => p.id === r.id) && !r.isSoup
    )
    if (vegPool.length > 0) {
      const repIdx = adultDishes.findIndex(d => !d.isVegetarian)
      if (repIdx >= 0) {
        const vegPick = pickDiverse(vegPool, 1, [
          ...adultDishes.filter((_, i) => i !== repIdx),
          ...childDishes
        ])
        if (vegPick.length > 0) adultDishes[repIdx] = vegPick[0]
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
