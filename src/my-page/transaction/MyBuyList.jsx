import React, { useCallback, useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import Pagination from "react-js-pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { getTradeBuyList } from "../../util/axios/my/trade";
import { useUserStore } from "../../model/user.store";

/**
 * 구매 목록 화면
 */
const MyBuyList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let page = parseInt(params.get("page")) || 1;
  const loginUserNickname = useUserStore((state) => state.loginUserNickname);
  const [buyList, setBuyList] = useState(["aaa"]);
  const [buyListTotal, setBuyListTotal] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchBuyList = useCallback(async () => {
    setLoading(true);

    //구매 목록
    const result = (await getTradeBuyList(loginUserNickname, page)).data;
    setBuyList(result.buyList);
    setBuyListTotal(result.buyListTotal);
    setLoading(false);
  }, [loginUserNickname, page]);

  useEffect(() => {
    fetchBuyList();
  }, [fetchBuyList, page]);

  if (loading)
    return (
      <Spinner
        animation="border"
        variant="primary"
        style={{ width: "20rem", height: "20rem", marginTop: "220px" }}
      />
    );

  const handlePageChange = (e) => {
    navigate(`/my/buy?page=${e}`);
    window.scrollTo({
      top: 0,
      left: 150,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <button
        style={{ marginTop: 30, float: "left" }}
        onClick={() => navigate(`/my/buyChart`)}
      >
        구매내역 차트로 확인
      </button>
      <Table striped className="mt-5">
        <thead>
          <tr>
            <th>판매가격</th>
            <th>판매일자</th>
            <th>후기쓰기</th>
          </tr>
        </thead>
        <tbody>
          {buyList.map((list) => (
            <>
              <tr key={list.payCode}>
                <td>{list.payPrice}</td>
                <td>{list.regDate}</td>
                {list.payBuyerReview === 0 ? (
                  <td>
                    <Button
                      onClick={() =>
                        navigate(
                          `/my/review/insert/${list.payCode}?buyer=${list.buyer}&seller=${list.seller}&productCode=${list.productCode}`
                        )
                      }
                    >
                      후기쓰러가기
                    </Button>
                  </td>
                ) : (
                  <td>후기 작성완료</td>
                )}
              </tr>
            </>
          ))}
        </tbody>
      </Table>

      {buyList.length !== 0 ? (
        <div style={{ marginLeft: 605 }}>
          <Pagination
            activePage={page}
            itemsCountPerPage={6}
            totalItemsCount={buyListTotal}
            pageRangeDisplayed={10}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={(e) => handlePageChange(e)}
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

export default MyBuyList;
