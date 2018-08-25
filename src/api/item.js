import config from './config'


export function getAsteroid() {
    const asteroid = config.getAsteroid()
    return asteroid
}

export function addItem (data) {
    const asteroid = config.getAsteroid()
    return asteroid.call('items.add',data)
}


export function getInventoryList (platform_id) {
    const asteroid = config.getAsteroid()
    return asteroid.call('getInventoryList',platform_id)
}

export function getCommunityList (platform_id) {
    const asteroid = config.getAsteroid()
    return asteroid.call('getCommunityList',platform_id)
}


export function removeItem (item_id) {
    const asteroid = config.getAsteroid()
    return asteroid.call('items.remove',item_id)
}

// export function updateItem (data) {
//     return request ({
//         url: `${config.host}/weapp/updateitem`,
//         method: 'post',
//         data
//     })
// }
