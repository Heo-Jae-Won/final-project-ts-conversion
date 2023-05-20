import React from "react";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/**
 * footer 화면
 */
const FooterPage = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute("href");
    navigate(href);
  };

  return (
    <div>
      <hr />
      <footer role="contentinfo" className="c-jApbnk c-hLzBpK">
        <div className="c-bxZDGf">
          <nav className="c-iCiDpy">
            <Nav>
              <ul className="c-fYLPMS" style={{ display: "flex" }}>
                <li className="c-jTOXZz">
                  <Nav.Link onClick={(e) => handleClick(e)} href="#">
                    개인정보 처리 방침
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link onClick={(e) => handleClick(e)} href="#">
                    브랜드 리소스
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link onClick={(e) => handleClick(e)} href="#">
                    자주 묻는 질문
                  </Nav.Link>
                </li>
              </ul>
            </Nav>
            <p>주소 : 인천광역시 미추홀구 매소홀로488번길 6-32 OO빌딩 5층</p>
          </nav>
        </div>
        <div className="c-gGLWxl">
          <p>
            <strong>CopyRight 2022. 물론마켓 All rights reserved</strong>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FooterPage;
