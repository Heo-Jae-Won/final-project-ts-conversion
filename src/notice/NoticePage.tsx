import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NoticeList from './NoticeList'
import NoticeRead from './NoticeRead'

/**
 * 공지사항 관련 routing
 */
const NoticePage = () => {
  return (
    <div>
      <Routes>
        <Route path="/list" element={<NoticeList/>} />
        <Route path="/read/:noticeCode" element={<NoticeRead/>} />
      </Routes>
    </div>
  )
}

export default NoticePage