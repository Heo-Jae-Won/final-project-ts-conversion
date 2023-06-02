import { MenuItem, TextField } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import Pagination from "react-js-pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { getEventList } from "../util/axios/event";
import EventItem from "./EventItem";

/**
 * Event 목록 기능
 */

const EventList = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let page = parseInt(params.get("page")) || 1;
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("제목");
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventListTotal, setEventListTotal] = useState(1);

  const num = 6;

  //이벤트 목록
  const fetchEventList = useCallback(async () => {
    setLoading(true);
    const result = await getEventList(page, num, searchType, query);
    setEventList(result.data.eventList);
    setEventListTotal(result.data.eventListTotal);
    setLoading(false);
  }, [page, query, searchType]);

  //요구조건에 따라 다시 이벤트 목록 검색
  const fetchFilteredEventList = (e) => {
    if (e.keyCode === 13) {
      fetchEventList();
    }
  };

  useEffect(() => {
    fetchEventList();
  }, [fetchEventList]);

  if (loading) {
    return (
      <Spinner
        animation="border"
        variant="primary"
        style={{ width: "20rem", height: "20rem", marginTop: "220px" }}
      />
    );
  }

  const handlePageChange = (e) => {
    navigate(`/event/list?page=${e}`);
    window.scrollTo({
      top: 0,
      left: 150,
      behavior: "smooth",
    });
  };

  return (
    <div className="main">
      <TextField
        className="search"
        style={{
          marginTop: 100,
          marginLeft: 900,
          marginBottom: 50,
          width: 120,
        }}
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
        <MenuItem value="작성날짜">작성날짜</MenuItem>
      </TextField>

      <TextField
        value={query}
        className="search2"
        style={{ marginLeft: 15, marginBottom: 50, width: 200, marginTop: 100 }}
        onChange={(e) => setQuery(e.target.value)}
        fetchFilteredEventList={fetchFilteredEventList}
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
          {eventList.map((eventList) => (
            <>
              <EventItem key={eventList.eventCode} eventList={eventList} />
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
          totalItemsCount={eventListTotal}
          pageRangeDisplayed={10}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={(e) => handlePageChange(e)}
        />{" "}
      </div>
    </div>
  );
};
export default EventList;
