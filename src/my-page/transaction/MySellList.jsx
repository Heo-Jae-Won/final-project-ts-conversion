import React, { useCallback, useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import Pagination from "react-js-pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { getTradeSellList } from "../../util/axios/my/trade";
import { useUserStore } from "../../model/user.store";

/**
 * 판매 화면 목록
 */
const MySellList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let page = parseInt(params.get("page")) || 1;
  const loginUserNickname = useUserStore((state) => state.loginUserNickname);
  const [sellList, setSellList] = useState(["aaa"]);
  const [sellListTotal, setSellListTotal] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchSellList = useCallback(async () => {
    setLoading(true);

    //판매 목록
    const result = (await getTradeSellList(loginUserNickname, page)).data;
    setSellList(result.sellList);
    setSellListTotal(result.sellListTotal);
    setLoading(false);
  }, [page, loginUserNickname]);

  useEffect(() => {
    fetchSellList();
  }, [fetchSellList, page]);

  const handlePageChange = (e) => {
    navigate(`/my/sell?page=${e}`);
    window.scrollTo({
      top: 0,
      left: 150,
      behavior: "smooth",
    });
  };

  if (loading)
    return (
      <Spinner
        animation="border"
        variant="primary"
        style={{ width: "20rem", height: "20rem", marginTop: "220px" }}
      />
    );

  return (
    <div>
      <button
        style={{ marginTop: 30, float: "left" }}
        onClick={() => navigate(`/my/sellChart`)}
      >
        판매내역 차트로 확인
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
          {sellList?.map((sellList) => (
            <>
              <tr key={sellList.payCode}>
                <td>{sellList.payPrice}</td>
                <td>{sellList.payRegDate}</td>
                {sellList.paySellerReview === 0 ? (
                  <td>
                    <Button
                      onClick={() =>
                        navigate(
                          `/my/review/insert/${sellList.payCode}?buyer=${sellList.seller}&seller=${sellList.buyer}&productCode=${sellList.productCode}`
                        )
                      }
                    >
                      후기쓰러가기
                    </Button>
                  </td>
                ) : (
                  <td>후기 작성 완료</td>
                )}
              </tr>
            </>
          ))}
        </tbody>
      </Table>

      {sellList.length !== 0 ? (
        <div style={{ marginLeft: 720 }}>
          <Pagination
            activePage={page}
            itemsCountPerPage={6}
            totalItemsCount={sellListTotal}
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

export default MySellList;
