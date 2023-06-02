import { instance } from "../axios.util"

export const getPaymentId = (paymentId) => {
    return instance({
        url: '/payment/' + paymentId,
        method: 'get'
    })
}

export const payProduct = (formData) => {
    return instance({
        url: '/payment',
        method: 'post',
        data: formData
    })
}