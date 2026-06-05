import { PRESET_RECIPES } from '../src/data/recipes.js'

const fail = (message) => {
  console.error(message)
  process.exitCode = 1
}

const byCategory = PRESET_RECIPES.reduce((acc, recipe) => {
  acc[recipe.category] = (acc[recipe.category] || 0) + 1
  return acc
}, {})

const soupCount = PRESET_RECIPES.filter((recipe) => recipe.isSoup).length
const childFriendlyCount = PRESET_RECIPES.filter((recipe) =>
  recipe.audience === 'all' || recipe.audience === 'child'
).length
const heavyDishCount = PRESET_RECIPES.filter((recipe) => recipe.category === '狠菜').length
const duplicateIds = PRESET_RECIPES
  .map((recipe) => recipe.id)
  .filter((id, index, ids) => ids.indexOf(id) !== index)
const duplicateNames = PRESET_RECIPES
  .map((recipe) => recipe.name)
  .filter((name, index, names) => names.indexOf(name) !== index)

if (PRESET_RECIPES.length < 60) {
  fail(`Expected at least 60 preset recipes, got ${PRESET_RECIPES.length}`)
}

if ((byCategory['家常菜'] || 0) < 48) {
  fail(`Expected at least 48 home-style recipes, got ${byCategory['家常菜'] || 0}`)
}

if (heavyDishCount > Math.floor(PRESET_RECIPES.length * 0.2)) {
  fail(`Expected 狠菜 to stay below 20%, got ${heavyDishCount}/${PRESET_RECIPES.length}`)
}

if (soupCount < 6) {
  fail(`Expected at least 6 soups, got ${soupCount}`)
}

if (childFriendlyCount < 20) {
  fail(`Expected at least 20 child-friendly/common recipes, got ${childFriendlyCount}`)
}

if (duplicateIds.length > 0) {
  fail(`Duplicate recipe ids: ${duplicateIds.join(', ')}`)
}

if (duplicateNames.length > 0) {
  fail(`Duplicate recipe names: ${duplicateNames.join(', ')}`)
}

if (!process.exitCode) {
  console.log(
    `Recipe library OK: ${PRESET_RECIPES.length} recipes, ${byCategory['家常菜'] || 0} home-style, ${heavyDishCount} heavy, ${soupCount} soups.`
  )
}
