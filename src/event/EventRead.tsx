import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import "../Pagination.css";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getEventRead } from "../util/axios/event";
import { useCallback } from "react";
import EventReplyList from "./EventReplyList";

/**
 * Event 조회 화면
 */

const EventRead = () => {
  const navigate = useNavigate();
  const { eventCode } = useParams();
  const [loading, setLoading] = useState(false);

  const [eventRead, setEventRead] = useState({
    eventTitle: "",
    eventContent: "",
    eventWriter: "",
    eventRegDate: "",
  });

  //이벤트 조회
  const fetchEventRead = useCallback(async () => {
    setLoading(true);
    const result = (await getEventRead(eventCode)).data;
    setEventRead(result);
    setLoading(false);
  }, [eventCode]);

  useEffect(() => {
    fetchEventRead();
  }, [fetchEventRead]);

  const { eventTitle, eventContent, eventWriter, eventRegDate } = eventRead;

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
      <h2 className="title">이벤트</h2>
      <div className="event_article">
        <article className="article event_article" style={{ height: "272px" }}>
          <div className="article_title">
            <h2 style={{ border: "none" }}>제목ㅡ{eventTitle}</h2>
            <div style={{ width: "100%", borderBottom: "3px solid #000" }}>
              <span style={{ float: "left" }} aria-label="등록일">
                작성자: {eventWriter}
              </span>
              <h5
                className="article_date"
                style={{ float: "right" }}
                aria-label="등록일"
              >
                {eventRegDate}
              </h5>
            </div>
          </div>

          <section className="article_data">
            <div className="fr_view">내용ㅡ {eventContent}</div>
          </section>
        </article>
      </div>

      {/* 댓글정보는 bno가 필요하기 때문에 bno를 가져가야 함. */}
      <EventReplyList eventCode={eventCode} />
      <Button
        style={{ marginTop: 100 }}
        onClick={() => {
          navigate(-1);
        }}
      >
        목록으로
      </Button>
    </div>
  );
};

export default EventRead;
