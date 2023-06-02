import React, { useState } from "react";
import { Button, ButtonGroup, Nav } from "react-bootstrap";
import { useUserStore } from "../model/user.store";
import { onClickDislike, onClickLike } from "../util/axios/product.board";
import { useNavigate } from "react-router-dom";
const LikeButton = ({ productCode }) => {
  const [isClickedLike, setIsClickedLike] = useState(false);
  const { loginUserNickname } = useUserStore();
  const handleLikeClick = async () => {
    const data = {
      productCode,
      userNickname: loginUserNickname,
    };

    !isClickedLike ? await onClickLike(data) : await onClickDislike(data);

    setIsClickedLike(!isClickedLike);
  };

  const navigate = useNavigate();

  const onClick = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute("href");
    navigate(href);
  };

  return (
    <ButtonGroup>
      <Button
        className="btn-10"
        onClick={loginUserNickname && handleLikeClick}
        variant="primary"
      >
        <img
          src={isClickedLike ? "../image/heart.png" : "../image/emptyheart.png"}
          width={30}
          alt="빈 이미지"
        />
      </Button>

      <Button style={{ marginLeft: 100 }} variant="secondary">
        <Nav.Link
          className="box"
          onClick={onClick}
          href={`/productBoard/read/${productCode}`}
        >
          자세히보기
        </Nav.Link>
      </Button>
    </ButtonGroup>
  );
};

export default LikeButton;
