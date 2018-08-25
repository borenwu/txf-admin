import config from './config'

export function getAsteroid() {
    const asteroid = config.getAsteroid()
    return asteroid
}

export function getCommunityList (platform_id) {
    const asteroid = config.getAsteroid()
    return asteroid.call('getCommunityList',platform_id)
}

export function getOrderList (platform_id,query) {
    const asteroid = config.getAsteroid()
    return asteroid.call('getOrderList',platform_id,query)
}

export function getSoFarSales(platform_id,startDate,endDate) {
    const asteroid = config.getAsteroid()
    return asteroid.call('getSoFarSales',platform_id,startDate,endDate)
}

export function getItemStat(platform_id,startDate,endDate) {
    const asteroid = config.getAsteroid()
    return asteroid.call('getItemStat',platform_id,startDate,endDate)
}

export function getItemTitle(platform_id,item_id) {
    const asteroid = config.getAsteroid()
    return asteroid.call('getItemTitle',platform_id,item_id)
}
