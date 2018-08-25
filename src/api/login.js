import config from './config'
import request from '@/utils/request'

export function loginByUsername(username, password) {
    const data = {
        username: username,
        password: password
    }
    return request({
        url: config.loginUrl,
        method: 'post',
        data
    })
}

export function logout() {
    return request({
        url: '/login/logout',
        method: 'post'
    })
}

export function getUserInfo(token) {
    const data = {
        token:token
    }
    return request({
        url: config.userUrl,
        method: 'post',
        data
    })
}

