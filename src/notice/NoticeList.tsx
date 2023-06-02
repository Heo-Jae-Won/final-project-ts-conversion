import { MenuItem, TextField } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import Pagination from "react-js-pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { getNoticeList } from "../util/axios/notice";
import NoticeItem from "./NoticeItem";

/**
 * 공지사항 목록
 */
const NoticeList = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let page = parseInt(params.get("page")) || 1;
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("제목");
  const [noticeList, setNoticeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noticeListTotal, setNoticeListTotal] = useState(1);
  const num = 6;

  const fetchNoticeList = useCallback(async () => {
    setLoading(true);

    //공지사항 목록
    const result = (await getNoticeList(page, num, searchType, query)).data;
    setNoticeList(result.noticeList);
    setNoticeListTotal(result.noticeListTotal);
    setLoading(false);
  }, [page, query, searchType]);

  const fetchFilteredList = (e) => {
    if (e.keyCode === 13) {
      fetchNoticeList();
    }
  };

  useEffect(() => {
    fetchNoticeList();
  }, [fetchNoticeList, page]);

  if (loading)
    return (
      <Spinner
        animation="border"
        variant="primary"
        style={{ width: "20rem", height: "20rem", marginTop: "220px" }}
      />
    );

  const handlePageChange = (e) => {
    navigate(`/notice/noticeList?page=${e}`);
    window.scrollTo({
      top: 0,
      left: 150,
      behavior: "smooth",
    });
  };

  return (
    <div className="main">
      <TextField
        style={{
          marginTop: 100,
          marginLeft: 900,
          marginBottom: 50,
          width: 120,
        }}
        className="search"
        select
        value={searchType}
        name="searchType"
        onChange={(e) => setSearchType(e.target.value)}
      >
        <MenuItem value="제목" style={{}}>
          제목
        </MenuItem>
        <MenuItem value="내용">내용</MenuItem>
        <MenuItem value="작성자">작성자</MenuItem>
        <MenuItem value="작성날짜">등록날짜</MenuItem>
      </TextField>

      <TextField
        value={query}
        className="search2"
        style={{ marginLeft: 15, marginBottom: 50, width: 200, marginTop: 100 }}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={fetchFilteredList}
      ></TextField>

      <Table striped>
        <thead>
          <tr>
            <th>관리자 이름</th>
            <th>제목</th>
            <th>작성일자</th>
          </tr>
        </thead>
        <tbody>
          {noticeList.map((noticeList) => (
            <>
              <NoticeItem key={noticeList.noticeCode} noticeList={noticeList} />
            </>
          ))}
        </tbody>
      </Table>
      <br />
      <br />

      <div style={{ marginLeft: 630 }}>
        <Pagination
          activePage={page}
          itemsCountPerPage={6}
          totalItemsCount={noticeListTotal}
          pageRangeDisplayed={10}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={(e) => handlePageChange(e)}
        />{" "}
      </div>
    </div>
  );
};
export default NoticeList;
