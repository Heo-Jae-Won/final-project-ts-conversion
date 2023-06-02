import { instance } from "../axios.util"

export const updatePassword = (object) => {
    return instance({
        url: '/user/password',
        method: 'patch',
        data: object
    })
}

export const getUserNickname = (userNickname) => {
    return instance({
        url: '/user/data/' + userNickname,
        method: 'get'
    })
}

export const getUserId = (userId) => {
    return instance({
        url: '/user/' + userId,
        method: 'get'
    })
}

export const updateUserInfo = (userInfo) => {
    return instance({
        url: '/user/update',
        method: 'post',
        data: userInfo,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const getUserStatus = (userId) => {
    return instance({
        url: '/user/status',
        method: 'put',
        data: userId
    })
}

