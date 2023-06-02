import { instance } from "./axios.util"

export const restoreUser = (formData) => {
    return instance({
        url: '/user/restore',
        method: 'post',
        data: formData
    })
}

export const checkDuplicationUserNickname = (userNickname) => {
    return instance({
        url: `/user/data/${userNickname}`,
        method: 'get'
    })
}

export const checkDuplicationUserId = (id) => {
    return instance({
        url: `/user/${id}`,
        method: 'get'
    })
}

export const authenticateUser = (userTel) => {
    return instance({
        url: `/user/authentication/${userTel}`,
        method: 'get'
    })
}

export const saveUser = (formData) => {
    return instance({
        url: `/user`,
        method: 'post',
        data: formData
    })
}

export const login = (form) => {
    return instance({
        url: `/user/login`,
        method: 'post',
        data: form
    })
}

export const sendTempPassword = (form) => {
    return instance({
        url: `/user/password`,
        method: 'post',
        data: form
    })
}

export const findUserId=(userEmail,userName)=>{
return instance({
    url:`/user/id/${userEmail}/${userName}`,
    method:'get'
})
}
