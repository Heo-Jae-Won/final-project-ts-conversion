import React from "react";
import { Button, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BestProduct } from "model/model.best.product";

/**
 * BestList의 실제 화면
 */

const BestItem = ({ bestList }: { bestList: BestProduct }) => {
  const navigate = useNavigate();
  const { productCode, productLikeCnt, productTitle, productImage } = bestList;

  const onClick: React.MouseEventHandler<HTMLElement> = ($event) => {
    $event.preventDefault();
    const target = $event.target as HTMLAnchorElement;
    const href = target.getAttribute("href") as string;
    navigate(href); //To parameter는 string을 받는다.
  };
  return (
    <div>
      <img src={productImage} alt={productTitle} width={300} height={300} />
      <span>{productTitle}</span>
      <p>좋아요: {productLikeCnt}</p>
      <Button variant="secondary">
        <Nav.Link href={`/productBoard/read/${productCode}`} onClick={onClick}>
          자세히보기
        </Nav.Link>
      </Button>
    </div>
  );
};

export default BestItem;
