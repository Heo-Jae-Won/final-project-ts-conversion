import { instance } from "./axios.util"

export const getEventRead = (eventCode) => {
    return instance({
        url: `/event/${eventCode}`,
        method: 'get'
    })
}

export const getEventList = (page, num, searchType, keyword) => {
    return instance({
        url: `/event`,
        method: 'get',
        params: {
            page,
            num,
            searchType,
            keyword
        }
    })
}

export const getReplyList = (eventCode, page, num) => {
    return instance({
        url: `/eventReply`,
        method: 'get',
        params: {
            eventCode,
            page,
            num
        }
    })
}

export const insertReply = (eventReply) => {
    return instance({
        url: `/eventReply`,
        method: 'post',
        data: eventReply,
    })
}

export const deleteReply = (eventReplyCode) => {
    return instance({
        url: `/eventReply/${eventReplyCode}`,
        method: 'patch'
    })
}