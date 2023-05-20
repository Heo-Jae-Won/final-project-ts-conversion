import { instance } from "../axios.util"

export const insertReview = (formData) => {
    return instance({
        url: '/review',
        method: 'post',
        data: formData
    })
}

export const getReceivedReview = (page, userNickname) => {
    return instance({
        url: '/review',
        method: 'get',
        params: {
            page,
            num: 6,
            receiver: userNickname
        }
    })
}