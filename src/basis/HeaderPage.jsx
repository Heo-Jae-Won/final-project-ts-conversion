import React from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../model/user.store";

/**
 * header 화면
 * 상품 등록은 loginUser만 접근 가능. dropdown 메뉴 구성
 */
const HeaderPage = () => {
  const navigate = useNavigate();
  const loginUserNickname = useUserStore((state) => state.loginUserNickname);
  const resetLoginUser = useUserStore((state) => state.resetLoginUser);

  const handleClick = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute("href");
    navigate(href);
  };

  const handleLogoutClick = async (e) => {
    resetLoginUser();
    navigate("/");
  };

  return (
    <div className="fixed">
      <Navbar
        className="fixed-top"
        bg="secondary"
        variant="dark"
        collapseOnSelect
        expand="lg"
      >
        <Container>
          <Navbar.Brand
            className="box13"
            onClick={(e) => handleClick(e)}
            href="/"
          >
            물론마켓
          </Navbar.Brand>
          <Nav className="me-auto" navbarScroll>
            <Nav.Link
              className="box13"
              onClick={(e) => handleClick(e)}
              href="/about"
            >
              회사소개
            </Nav.Link>
            <NavDropdown title="상품" id="navbarScrollingDropdown">
              <NavDropdown.Item
                onClick={(e) => handleClick(e)}
                href="/productBoard/list"
              >
                상품 목록
              </NavDropdown.Item>
              {loginUserNickname && (
                <NavDropdown.Item
                  onClick={(e) => handleClick(e)}
                  href={`/productBoard/insert`}
                >
                  상품 등록
                </NavDropdown.Item>
              )}
            </NavDropdown>

            <Nav.Link
              className="box13"
              href={`/notice/list`}
              onClick={(e) => handleClick(e)}
            >
              공지사항
            </Nav.Link>
            <Nav.Link
              className="box13"
              href={`/event/list`}
              onClick={(e) => handleClick(e)}
            >
              이벤트
            </Nav.Link>
          </Nav>
          <Nav>
            {loginUserNickname ? (
              <>
                <Nav.Link href={`/my/menu`} onClick={(e) => handleClick(e)}>
                  {loginUserNickname}
                </Nav.Link>

                <Nav.Link onClick={handleLogoutClick}>로그아웃</Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={(e) => handleClick(e)} href="/login/form">
                로그인
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default HeaderPage;
