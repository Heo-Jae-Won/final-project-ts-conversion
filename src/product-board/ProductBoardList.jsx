import { MenuItem, TextField } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { Row, Spinner } from "react-bootstrap";
import Pagination from "react-js-pagination";
import { useLocation, useNavigate } from "react-router-dom";
import "../Pagination.css";
import { getProductBoardList } from "../util/axios/product.board";
import ProductBoardItem from "./ProductBoardItem";

/**
 * 상품 게시판 목록
 */
const ProductBoardList = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let page = parseInt(params.get("page")) || 1;
  const navigate = useNavigate();
  const [postList, setPostList] = useState(["aaa"]);
  const [productListTotal, setProductListTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("제목");
  const num = 6;
  const fetchProductBoardList = useCallback(async () => {
    setLoading(true);

    //상품 게시판 목록
    const result = (await getProductBoardList(page, num, searchType, query))
      .data;
    setPostList(result.productList);
    setProductListTotal(result.productListTotal);
    setLoading(false);
  }, [page, query]);

  const fetchFilteredProductBoardList = (e) => {
    if (e.keyCode === 13) {
      fetchProductBoardList();
    }
  };

  useEffect(() => {
    fetchProductBoardList();
  }, []);

  if (loading)
    return (
      <Spinner
        animation="border"
        variant="primary"
        style={{ width: "20rem", height: "20rem", marginTop: "220px" }}
      />
    );

  const onPageChange = (e) => {
    navigate(`/productBoard/list?page=${e}`);
    window.scrollTo({
      top: 0,
      left: 150,
      behavior: "smooth",
    });
  };

  return (
    <div style={{ marginLeft: 100 }}>
      <div className="img4">
        <img
          sizes="100vw"
          className="d-block w-100"
          src="/image/image.9.jpg"
          alt="빈 이미지"
        />
      </div>
      <div className="img10">
        <img
          sizes="100vw"
          className="d-block w-100"
          src="/image/image18.jpg"
          alt="빈 이미지"
        />
      </div>

      <TextField
        className="search"
        style={{ marginLeft: 970, marginBottom: 50, width: 120 }}
        select
        value={searchType}
        name="searchType"
        onChange={(e) => setSearchType(e.target.value)}
      >
        <MenuItem className="ppp" value="제목">
          제목
        </MenuItem>
        <MenuItem value="내용">내용</MenuItem>
        <MenuItem value="제목과 내용">제목과 내용</MenuItem>
        <MenuItem value="작성자">작성자</MenuItem>
      </TextField>

      <TextField
        className="search2"
        value={query}
        style={{ marginLeft: 15, marginBottom: 50, width: 200 }}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={fetchFilteredProductBoardList}
      ></TextField>

      <Row style={{ marginLeft: 55 }}>
        {postList?.map((postList) => (
          <ProductBoardItem key={postList.productCode} postList={postList} />
        ))}
      </Row>

      <br />
      <br />

      {postList.length !== 0 ? (
        <div style={{ marginLeft: 640 }}>
          <Pagination
            activePage={page}
            itemsCountPerPage={6}
            totalItemsCount={productListTotal}
            pageRangeDisplayed={10}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={(e) => onPageChange(e)}
          />{" "}
        </div>
      ) : (
        <div style={{ marginTop: 200 }}>
          <h1 style={{ fontSize: 60, color: "red", marginBottom: 200 }}>
            해당 검색 결과가 존재하지 않습니다.
          </h1>
        </div>
      )}
    </div>
  );
};

export default ProductBoardList;
