import React from "react";
import { Button } from "react-bootstrap";
import { useUserStore } from "../../model/user.store";

/**
 * MyChatList.jsx의 실제 화면
 */
const MyChatItem = ({ message, handleMessageDelete }) => {
  const { text, date, userId, id, userNickname, userProfile } = message;
  const loginUserId = useUserStore((state) => state.loginUserId);
  return (
    <>
      <div>
        <p style={{ fontSize: 20 }}>{userNickname}</p>
        <img className="icon" src={userProfile} alt="빈 이미지" />

        <span className="chat_span">
          {JSON.stringify(
            new Intl.DateTimeFormat("kr", {
              dateStyle: "short",
              timeStyle: "short",
            }).format(date)
          )}
        </span>
      </div>
      <div className="textbox">
        <p style={{ textAlign: "left" }}>{text}</p>
        {userId === loginUserId && (
          <Button className="mt-3" onClick={() => handleMessageDelete(id)}>
            삭제
          </Button>
        )}
      </div>
    </>
  );
};

export default MyChatItem;
