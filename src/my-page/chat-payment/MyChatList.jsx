import { collection, deleteDoc, doc, getFirestore } from "firebase/firestore";
import { default as React, useCallback, useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { app } from "../../fireStore";
import { useUserStore } from "../../model/user.store";
import { extractProductBoardRead } from "../../util/axios/product.board";
import {
  addFireBaseChatMessage,
  getFirebaseQuery,
  getFirebaseSubQuery,
  getOnSnapShotChatMessage,
  getOnSnapShotChatRoom,
} from "../../util/firebase/util";
import { confirmDelete, confirmLeave } from "../../util/swal/confirmation";
import MyChatItem from "./MyChatItem";
import "./MyChatList.css";
import "./MyChatList.scss";

/**
 * 채팅 목록
 */

const MyChatList = () => {
  const db = getFirestore(app);
  const navigate = useNavigate();
  const location = useLocation();
  let params = new URLSearchParams(location.search);
  const [productCode, setProductCode] = useState(
    params.get("productCode") || "ab"
  );
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [chatId, setChatId] = useState("init");
  const [productBoardInfo, setProductBoardInfo] = useState({});
  const loginUserId = useUserStore((state) => state.loginUserId);
  const loginUserNickname = useUserStore((state) => state.loginUserNickname);
  const loginUserProfile = useUserStore((state) => state.loginUserProfile);

  const fetchRoomList = useCallback(async () => {
    const q = getFirebaseQuery(db, loginUserId);

    //채팅방의 동적 DOM 형성
    getOnSnapShotChatRoom(q, loginUserId, chatId);

    //상품 정보 즉시호출 함수
    (async () => {
      const result = await extractProductBoardRead(productCode);
      setProductBoardInfo(result.data);
    })();
  }, [chatId, db, loginUserId, productCode]);

  const nonClick = document.querySelectorAll(".non-click");

  //채팅방 클릭 시 UI 변화시키는 함수
  const onClick = async (e) => {
    if (
      e.target.tagName === "LI" ||
      e.target.tagName === "H6" ||
      e.target.tagName === "IMG"
    ) {
      // dom 요소에서 모든 "click" 클래스 제거
      nonClick.forEach((e) => {
        e.classList.remove("click");
      });
      // 클릭한 dom의 최상위요소만 "click"클래스 추가.
      e.currentTarget.classList.add("click");
    }
  };

  nonClick.forEach((e) => {
    e.addEventListener("click", onClick);
  });

  //Doc element를 최초 생성
  const sendMessage = async (e) => {
    if (e.keyCode === 13) {
      if (e.ctrlKey) {
        let val = e.target.value;
        let start = e.target.selectionStart;
        let end = e.target.selectionEnd;
        e.target.value = val.substring(0, start) + "\n" + val.substring(end);
        setMessage(e.target.value);
        return false; //  pre focus
      }

      if (!message) {
        alert("메시지를 입력하세요");
        return;
      }

      const docRef = doc(db, "chatRoom", `${chatId}`);
      const colRef = collection(docRef, "messageList");
      //
      addFireBaseChatMessage(
        colRef,
        message,
        loginUserId,
        loginUserNickname,
        loginUserProfile
      );
      setMessage("");
      window.scrollTo({
        top: 200,
        left: 150,
        behavior: "smooth",
      });
    }
  };

  const fetchMessageList = useCallback(() => {
    const q = getFirebaseSubQuery(db, chatId);
    let rows = [];

    //chatting message를 firebase db에 추가
    getOnSnapShotChatMessage(q, rows);
    setMessageList(rows);
  }, [chatId, db]);

  const handleMessageDelete = async (id) => {
    const isConfirmed = await confirmDelete();
    if (isConfirmed) {
      //삭제
      await deleteDoc(doc(db, `chatRoom/${chatId}/messageList`, id));
    }
  };

  const handleChatRoomDelete = async (id) => {
    const isConfirmed = await confirmLeave();
    if (isConfirmed) {
      //HACK : setTimeout설정 안하면 채팅방이 중복돼서 다시 만들어지는 것이 눈에 보이게 됨.
      setTimeout(() => deleteDoc(doc(db, `chatRoom`, id)), 1000);
      document
        .getElementsByClassName("list-group-item non-click click")[0]
        .remove();
      navigate("/productBoard/list");
    }
  };

  useEffect(() => {
    fetchRoomList();
    fetchMessageList();
  }, [chatId, fetchMessageList, fetchRoomList]);

  return (
    <li className="container" style={{ marginTop: 100 }}>
      <li className="row" style={{ margin: "150px 0px" }}>
        <li className="col-3 p-0">
          <ul className="list-group chat-list"></ul>
        </li>
        <li className="col-9 p-0">
          {chatId.length > 5 && (
            <li className="chat-room">
              <div className="wrap">
                {messageList?.map((message) => (
                  <div
                    className={
                      message.uid === sessionStorage.uid
                        ? "chat ch2"
                        : "chat ch1"
                    }
                  >
                    <MyChatItem
                      key={message.id}
                      message={message}
                      handleMessageDelete={handleMessageDelete}
                    />
                  </div>
                ))}
              </div>

              <Row className="mt-5 justify-content-center">
                <Form className="d-flex my-3" style={{ width: "52rem" }}>
                  <Form.Control
                    as="textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={sendMessage}
                    placeholder="enter를 누르세요"
                    className="mx-2"
                  />
                </Form>
                <div>
                  {loginUserId !== productBoardInfo.userId &&
                    productBoardInfo.productStatus === 0 && (
                      <Button
                        Button
                        onClick={() => navigate(`/my/pay/${productCode}`)}
                      >
                        결제창 이동
                      </Button>
                    )}
                  <Button
                    style={{ marginLeft: 80 }}
                    onClick={() => navigate(-1)}
                  >
                    뒤로가기
                  </Button>
                  <Button
                    style={{ marginLeft: 80 }}
                    onClick={() => handleChatRoomDelete(chatId)}
                  >
                    채팅방 나가기
                  </Button>
                </div>
              </Row>
            </li>
          )}
        </li>
      </li>
    </li>
  );
};

export default MyChatList;
