import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Pagination from "react-js-pagination";
import "../Pagination.css";
import { deleteReply, getReplyList, insertReply } from "../util/axios/event";
import { confirmDelete } from "../util/swal/confirmation";
import { informSuccess } from "../util/swal/information";
import { useUserStore } from "module/module.user";
import { EventReply } from "model/model.event.reply";

const EventReplyList = ({ eventCode }: { eventCode: string }) => {
  const [eventReplyList, setEventReplyList] = useState<Array<EventReply>>([]);
  const [eventReplyTotal, setEventReplyTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [eventReplyContent, setEventReplyContent] = useState("");
  const loginUserNickname = useUserStore((state) => state.loginUserNickname);
  const num = 6;

  const fetchEventReplyList = useCallback(async () => {
    const result = (await getReplyList(eventCode, page, num)).data;
    setEventReplyList(result.eventReplyList);
    setEventReplyTotal(result.eventReplyTotal);
  }, [eventCode, page]);

  useEffect(() => {
    fetchEventReplyList();
  }, [fetchEventReplyList, page]);

  const handleReplyInsert: React.KeyboardEventHandler<HTMLElement> = async (
    $event
  ) => {
    if ($event.key === "Enter") {
      if (!eventReplyContent) {
        alert("내용을 입력해 주세요!");
        return;
      }

      //ctrl enter
      if ($event.ctrlKey) {
        const target = $event.target as HTMLInputElement;
        const val = target.value;
        const start = target.selectionStart as number;
        const end = target.selectionEnd as number;
        target.value = val.substring(0, start) + "\n" + val.substring(end);
        setEventReplyContent(target.value);
        return false;
      }

      const data = {
        eventCode,
        eventReplyWriter: loginUserNickname,
        eventReplyContent,
      };

      //댓글 등록
      await insertReply(data);
      setPage(page);
      fetchEventReplyList();
      setEventReplyContent("");
    }
  };

  const handleReplyDelete = async (eventReplyCode: number) => {
    const isConfirmed = (await confirmDelete()).isConfirmed;
    if (isConfirmed) {
      //댓글 삭제
      await deleteReply(eventReplyCode);
      informSuccess();
      fetchEventReplyList();
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    window.scrollTo({
      top: 400,
      left: 150,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {loginUserNickname && (
        <Form>
          <Form.Label
            classNameName="d-flex justify-content-left"
            style={{ fontSize: 20 }}
          >
            댓글 입력
          </Form.Label>
          <Form.Control
            as="textarea"
            className="ereply_content"
            value={eventReplyContent}
            onKeyDown={handleReplyInsert}
            onChange={(e) => setEventReplyContent(e.target.value)}
            placeholder="내용을 입력하세요..."
          />
        </Form>
      )}

      <hr />
      {eventReplyList?.map((reply: EventReply) => (
        <div
          className="u_cbox_comment_box u_cbox_type_profile"
          key={reply.eventReplyCode}
        >
          <div className="u_cbox_area">
            <div className="u_cbox_info">
              <span>작성자- {reply.eventReplyWriter}</span>
            </div>
            <div className="u_cbox_text_wrap">
              <span className="u_cbox_contents">{reply.eventReplyContent}</span>
            </div>
            <div className="u_cbox_info_base">
              <span className="u_cbox_date">{reply.eventReplyRegDate}</span>
              <span className="u_cbox_recomm_set">
                {reply.eventReplyWriter === loginUserNickname &&
                reply.adminDeleted !== 1 &&
                reply.userDeleted !== 1 ? (
                  <Button
                    onClick={() => handleReplyDelete(reply.eventReplyCode)}
                  >
                    삭제
                  </Button>
                ) : null}
              </span>
            </div>
          </div>
        </div>
      ))}

      <div style={{ marginLeft: 440 }}>
        <Pagination
          activePage={page}
          itemsCountPerPage={num}
          totalItemsCount={eventReplyTotal}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={(pageNumber) => handlePageChange(pageNumber)}
        />
      </div>
    </div>
  );
};

export default EventReplyList;
