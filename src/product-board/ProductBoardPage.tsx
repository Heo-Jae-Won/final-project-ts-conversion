import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductBoardRead from './ProductBoardRead'
import ProductBoardList from './ProductBoardList'
import ProductBoardInsert from './ProductBoardInsert'

/**
 * 상품 게시판에 관한 routing
 */
const ProductBoardPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/list" element={<ProductBoardList/>} />
        <Route path="/read/:productCode" element={<ProductBoardRead/>} />
        <Route path="/insert" element={<ProductBoardInsert/>} />
      </Routes>
    </div>
  )
}













export default ProductBoardPage