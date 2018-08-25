import config from './config'

export function getAsteroid() {
    const asteroid = config.getAsteroid()
    return asteroid
}

export function addInventory(data) {
    const asteroid = config.getAsteroid()
    return asteroid.call('inventories.add',data)
}


export function removeInventory(inventory_id) {
    const asteroid = config.getAsteroid()
    return asteroid.call('inventories.remove',inventory_id)
}

export function updateInventory(data) {
    const asteroid = config.getAsteroid()
    return asteroid.call('inventories.update',data)
}
