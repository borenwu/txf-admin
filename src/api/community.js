import config from './config'


export function getAsteroid() {
    const asteroid = config.getAsteroid()
    return asteroid
}

export function addCommunity(data) {
    const asteroid = config.getAsteroid()
    return asteroid.call('communities.add',data)
}



export function removeCommunity(community_id) {
    const asteroid = config.getAsteroid()
    return asteroid.call('communities.remove',community_id)
}

export function updateCommunity(data) {
    const asteroid = config.getAsteroid()
    return asteroid.call('communities.update',data)
}

