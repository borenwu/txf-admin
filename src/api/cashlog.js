import config from './config'


export function getAsteroid() {
    const asteroid = config.getAsteroid()
    return asteroid
}

export function getCashLogs (platform_id,query) {
    const asteroid = config.getAsteroid()
    return asteroid.call('getCashLogs',platform_id,query)
}
