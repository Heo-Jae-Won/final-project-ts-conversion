import React, { useCallback, useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { useUserStore } from "../model/user.store";
import { getProductBoardLikeByUser } from "../util/axios/product.board";
import LikeButton from "./LikeButton";

/**
 * ProductBoardList의 실제 화면
 */
const ProductBoardItem = ({ postList }) => {
  const {
    productCode,
    productTitle,
    productContent,
    productWriter,
    productImage,
    productViewcnt,
  } = postList;
  const [isClickedLike, setIsClickedLike] = useState(false);
  const loginUserNickname = useUserStore((state) => state.loginUserNickname);

  const fetchLikeList = useCallback(async () => {
    //상품에 대한 좋아요 클릭 여부 확인
    const result = (
      await getProductBoardLikeByUser(productCode, loginUserNickname)
    ).data;

    setIsClickedLike(result.likeStatus || false);
  }, [loginUserNickname, productCode]);

  useEffect(() => {
    fetchLikeList();
  }, [fetchLikeList, isClickedLike]);

  return (
    <>
      <Col md="auto" style={{ marginTop: 60 }}>
        <Card
          border="success"
          bg="light"
          style={{ width: "25rem", marginRight: 40, height: 700, padding: 10 }}
        >
          <Card.Body style={{ marginBottom: 50 }}>
            <Card.Header style={{ fontSize: 20, height: 50 }}>
              <span style={{ float: "left" }}>작성자: {productWriter}</span>
              <span style={{ float: "right" }}>조회수: {productViewcnt}</span>
            </Card.Header>
            <Card.Img src={productImage} height="300" />
            <Card.Title style={{ textAlign: "left", marginTop: 22 }}>
              제목: {productTitle}
            </Card.Title>
            <hr />
            <Card.Text style={{ textAlign: "left", marginTop: 22 }}>
              내용: {productContent}
            </Card.Text>
          </Card.Body>
          <LikeButton productCode={productCode} />
        </Card>
      </Col>
    </>
  );
};

export default React.memo(ProductBoardItem);
