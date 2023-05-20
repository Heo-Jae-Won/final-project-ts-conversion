import { instance } from "../axios.util"

export const getTradeSellChart = (seller) => {
    return instance({
        url: '/tradeInfo/sellChart/' + seller,
        method: 'get'
    })
}

export const getTradeSellList = (seller, page) => {
    return instance({
        url: '/tradeInfo/sellList/' + seller,
        method: 'get',
        params: {
            page,
        }
    })
}

export const getTradeBuyChart = (buyer) => {
    return instance({
        url: '/tradeInfo/buyChart/' + buyer,
        method: 'get'
    })
}

export const getTradeBuyList = (buyer, page) => {
    return instance({
        url: '/tradeInfo/buyList/' + buyer,
        method: 'get',
        params: {
            page,
        }
    })
}