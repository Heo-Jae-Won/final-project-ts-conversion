import React from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../Carousel.css";
import BestList from "./BestList";
import "animate.css";
/**
 * 약간의 animation이 담긴 homepage 화면
 */
const HomePage = () => {
  return (
    <div className="sql">
      <img
        sizes="100vw"
        className="d-block w-100"
        src="/image/image17.png"
        alt="빈 이미지"
      />

      <div className="img5">
        <img
          sizes="10px"
          className="d-block w-100"
          src="/image/image16.jpg"
          alt="빈 이미지"
        />
      </div>

      <div className="animate__animated">
        <img
          sizes="10px"
          className="d-block w-100"
          src="/image/image19.jpg"
          alt="빈 이미지"
        />
      </div>

      <h3>인기상품</h3>
      <hr />
      <BestList />
    </div>
  );
};

export default HomePage;
