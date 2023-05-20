import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/**
 * BestList의 실제 화면
 */

const BestItem = ({ bestList }) => {
  const navigate = useNavigate();
  const { productCode, productLikeCnt, productTitle, productImage } = bestList;

  const onClick = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute("href")
    navigate(href);
  }
  return (
    <div>
      <img src={productImage} alt={productTitle} width={300} height={300} border={2} />
      <span>{productTitle}</span>
      <p>좋아요: {productLikeCnt}</p>
      <Button variant='secondary'>
        <Nav.Link href={`/productBoard/read/${productCode}`} onClick={onClick}>자세히보기</Nav.Link>
      </Button>
    </div>
  )
}

export default BestItem