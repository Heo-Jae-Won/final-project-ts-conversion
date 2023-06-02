import React, { useCallback, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getNoticeRead } from "../util/axios/notice";

/**
 * 공지사항 조회
 */

const NoticeRead = () => {
  const { noticeCode } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [noticeRead, setNoticeRead] = useState({
    noticeTitle: "",
    noticeContent: "",
    noticeWriter: "",
    noticeRegDate: "",
    noticeCode: "",
  });

  const fetchNoticeRead = useCallback(async () => {
    setLoading(true);

    //공지사항 조회
    const result = (await getNoticeRead(noticeCode)).data;
    setNoticeRead(result);
    setLoading(false);
  }, [noticeCode]);

  const { noticeTitle, noticeContent, noticeWriter, noticeRegDate } =
    noticeRead;

  useEffect(() => {
    fetchNoticeRead();
  }, [fetchNoticeRead]);

  if (loading)
    return (
      <Spinner
        animation="border"
        variant="primary"
        style={{ width: "20rem", height: "20rem", marginTop: "220px" }}
      />
    );

  return (
    <div className="event_notice">
      <h2 className="title">공지사항</h2>
      <div>
        <article className="article event_article" style={{ height: "272px" }}>
          <div className="article_title">
            <h2 style={{ border: "none" }}>제목ㅡ{noticeTitle}</h2>
            <div style={{ width: "100%", borderBottom: "3px solid #000" }}>
              <span style={{ float: "left" }} aria-label="등록일">
                작성자: {noticeWriter}
              </span>
              <h5
                className="article_date"
                style={{ float: "right" }}
                aria-label="등록일"
              >
                {noticeRegDate}
              </h5>
            </div>
          </div>

          <section className="article_data">
            <div className="fr_view">내용ㅡ{noticeContent}</div>
          </section>
        </article>
      </div>
      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        목록으로
      </Button>
    </div>
  );
};

export default NoticeRead;
