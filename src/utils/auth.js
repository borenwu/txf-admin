import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const PlatformInfo = 'PlatformInfo'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function setStorage(platformInfo) {
    console.log('set local storage')
    let platform = JSON.stringify(platformInfo);
    let local = window.localStorage;
    local.setItem(PlatformInfo, platform);
}

export function getStorage() {
    let local = window.localStorage;
    let platformInfo = local.getItem(PlatformInfo)
    if(platformInfo == null){
        return 0
    }else{
        return JSON.parse(local.getItem(PlatformInfo))
    }
}
