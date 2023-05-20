import { instance } from "./axios.util"

export const getNoticeRead = (noticeCode) => {
    return instance({
        url: `/notice/${noticeCode}`,
        method: 'get'
    })
}

export const getNoticeList = (page, num, searchType, keyword) => {
    return instance({
        url: '/notice',
        method: 'get',
        params: {
            page,
            num,
            searchType,
            keyword
        }
    })
}