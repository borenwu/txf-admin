import config from './config'


export function signInPlatform (data) {
    const asteroid = config.getAsteroid()
    return asteroid.call("platforms.signin",data)
}

