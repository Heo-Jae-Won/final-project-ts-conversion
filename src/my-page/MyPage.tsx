import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MyBuyList from './transaction/MyBuyList'
import MyBuyListChart from './transaction/MyBuyListChart'
import MyChatList from './chat-payment/MyChatList'
import MyInfo from './MyInfo'
import MyInsertReview from './review/MyInsertReview'
import MyMenu from './MyMenu'
import MyPay from './chat-payment/MyPay'
import MySellList from './transaction/MySellList'
import MySellListChart from './transaction/MySellListChart'
import MyUpdatePass from './MyUpdatePass'
import MyReceiveReviewList from './review/MyReceiveReviewList'

/**
 * myPage에 관련된 routing
 */
const MyPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/info/:userId" element={<MyInfo/>} />
        <Route path="/chat" element={<MyChatList/>} />
        <Route path="/pay/:productCode" element={<MyPay/>} />
        <Route path="/menu" element={<MyMenu/>} />
        <Route path="/review" element={<MyReceiveReviewList/>}/>
        <Route path="/review/insert/:payCode" element={<MyInsertReview/>} />
        <Route path="/pass/update" element={<MyUpdatePass/>} />
        <Route path="/sell" element={<MySellList/>} />
        <Route path="/buy" element={<MyBuyList/>} />
        <Route path="/buyChart" element={<MyBuyListChart/>} />
        <Route path="/sellChart" element={<MySellListChart/>} />
      </Routes>
    </div>
  )
}

export default MyPage