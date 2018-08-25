import config from './config'


export function getAsteroid() {
    const asteroid = config.getAsteroid()
    return asteroid
}


export function addLeader(data) {
    const asteroid = config.getAsteroid()
    return asteroid.call('leaders.add', data)
}


export function removeLeader(leader_id) {
    const asteroid = config.getAsteroid()
    return asteroid.call('leaders.remove', leader_id)
}

export function updateLeader(data) {
    const asteroid = config.getAsteroid()
    return asteroid.call('leaders.update', data)
}

export function getCommunityList(platform_id) {
    const asteroid = config.getAsteroid()
    return asteroid.call('getCommunityList', platform_id)
}

export function cashBenefit(log) {
    const asteroid = config.getAsteroid()
    return asteroid.call('cashlogs.add', log)
}

