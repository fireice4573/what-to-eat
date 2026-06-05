const AMAP_KEY = import.meta.env.VITE_AMAP_KEY
const AMAP_BASE = 'https://restapi.amap.com/v3'

function getAmapKey() {
  if (!AMAP_KEY) {
    throw new Error('缺少高德地图配置')
  }
  return AMAP_KEY
}

/**
 * 搜索周边餐饮 POI
 * @param {number} lng - 经度
 * @param {number} lat - 纬度
 * @param {number} radius - 搜索半径（米），默认 3000
 */
export async function searchNearbyFood(lng, lat, radius = 3000) {
  const url = `${AMAP_BASE}/place/around?key=${getAmapKey()}&location=${lng},${lat}&radius=${radius}&types=050000&offset=50&page=1&extensions=all`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('网络请求失败')
  }
  const data = await response.json()

  if (data.status !== '1') {
    throw new Error(data.info || '搜索失败')
  }

  return (data.pois || []).map(poi => ({
    name: poi.name,
    address: poi.address,
    lat: parseFloat(poi.location.split(',')[1]),
    lng: parseFloat(poi.location.split(',')[0]),
    rating: poi.biz_ext?.rating ? parseFloat(poi.biz_ext.rating) : null,
    distance: parseInt(poi.distance),
    type: poi.type
  }))
}

/**
 * 逆地理编码：根据经纬度获取城市名
 */
export async function reverseGeocode(lng, lat) {
  const url = `${AMAP_BASE}/geocode/regeo?key=${getAmapKey()}&location=${lng},${lat}&extensions=base`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('定位失败')
  }
  const data = await response.json()

  if (data.status !== '1') {
    throw new Error('定位失败')
  }

  return {
    city: data.regeocode?.addressComponent?.city || '',
    district: data.regeocode?.addressComponent?.district || '',
    address: data.regeocode?.formatted_address || ''
  }
}

/**
 * 地址转经纬度：用于定位被拒绝后的城市/地址输入。
 */
export async function geocodeAddress(address) {
  const url = `${AMAP_BASE}/geocode/geo?key=${getAmapKey()}&address=${encodeURIComponent(address)}`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('搜索失败')
  }
  const data = await response.json()

  if (data.status !== '1' || !data.geocodes?.length) {
    throw new Error('没找到这个城市')
  }

  const [lng, lat] = data.geocodes[0].location.split(',').map(parseFloat)
  return { lng, lat }
}
