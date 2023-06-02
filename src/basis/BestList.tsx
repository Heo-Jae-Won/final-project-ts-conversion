import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../Carousel.css";
import BestItem from "./BestItem";
import { getProductBoardBest } from "../util/axios/basis";

/**
 * 최다 좋아요 상품 소개 기능
 */

const BestList = () => {
  const [bestList, setBestList] = useState([]);

  const fetchProductBoardBest = async () => {
    const result = (await getProductBoardBest()).data;
    setBestList(result);
  };

  useEffect(() => {
    fetchProductBoardBest();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoPlaySpeed: 500,
    nextArrow: (
      <img
        src="../image/nextbutton_80863.png"
        alt="빈 이미지"
        width={50}
        height={50}
      />
    ),
    prevArrow: (
      <img
        src="../image/backarrow1_80790.png"
        alt="빈 이미지"
        width={50}
        height={50}
      />
    ),
  };

  if (!bestList) return <h1>로딩중</h1>;

  return (
    <Slider {...settings}>
      {bestList.map((bestList) => (
        <BestItem key={bestList.productCode} bestList={bestList} />
      ))}
    </Slider>
  );
};

export default BestList;
