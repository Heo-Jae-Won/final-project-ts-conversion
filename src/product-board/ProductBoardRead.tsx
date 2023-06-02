import { Card, Grid, TextField } from "@material-ui/core";
import { Rating } from "@mui/material";
import { collection, getFirestore } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { Button, ButtonGroup, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { app } from "../fireStore";
import { useUserStore } from "../model/user.store";
import {
  deleteProductBoard,
  getProductBoardRead,
  updateProductBoard,
} from "../util/axios/product.board";
import {
  addFirebaseChatRoom,
  getFirebaseQuery,
  getOnSnapShotProductCode,
} from "../util/firebase/util";
import { confirmDelete } from "../util/swal/confirmation";
import { informSuccess } from "../util/swal/information";
import { DeleteAlready } from "../util/swal/service.exception";

/**
 * 상품 조회
 */
const ProductBoardRead = () => {
  const { productCode } = useParams();
  const navigate = useNavigate();
  const db = getFirestore(app);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [comparisonProductCode, setComparisonProductCode] = useState([]);
  const loginUserNickname = useUserStore((state) => state.loginUserNickname);
  const loginUserId = useUserStore((state) => state.loginUserId);
  const [postRead, setPostRead] = useState({
    productTitle: "",
    productContent: "",
    productWriter: "",
    productLikecnt: "",
    productImage: "",
    productViewcnt: "",
    productRegDate: "",
    productName: "",
    userPoint: "",
    file: null,
    userId: "",
  });
  const {
    userId,
    productTitle,
    userPoint,
    productContent,
    productWriter,
    productImage,
    productPrice,
    productName,
    file,
  } = postRead;

  const fetchProductBoard = useCallback(async () => {
    setLoading(true);

    //실제 존재하는 상품 여부 확인
    const result = (await getProductBoardRead(productCode)).data;

    const q = getFirebaseQuery(db, loginUserId);

    let rows = [];

    //productCode를 query에 추가
    getOnSnapShotProductCode(q, rows);
    setComparisonProductCode(rows);

    //팔리거나 삭제되면 접근 불가 조치
    if (result.productStatus === 0) {
      setPostRead(result);
      setImage(result.productImage);
    } else {
      DeleteAlready();
      let seconds_ms = 1000;
      setTimeout(() => navigate("/productBoard/list"), seconds_ms);
    }
    setLoading(false);
  }, [db, loginUserId, navigate, productCode]);

  const handleFormChange = (e) => {
    setPostRead((postRead) => ({
      ...postRead,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setPostRead((postRead) => ({
      ...postRead,
      file: e.target.files[0],
    }));
    if (typeof e.target.files[0] !== "undefined") {
      const url = URL.createObjectURL(e.target.files[0]);
      setImage(url);
    }
  };

  const handleProductBoardUpdate = async (e) => {
    e.preventDefault();

    const isConfirmed = await informSuccess();
    if (isConfirmed) {
      const data = {
        productCode,
        productContent,
        productTitle,
        productPrice,
        productWriter,
        productImage,
        productName,
      };
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "data",
        new Blob([JSON.stringify(data)], {
          type: "application/json",
        })
      );

      // //data 확인
      // const myBlob = formData.get("data");
      // myBlob.text().then((text) => {
      //   console.log(text);
      // });

      //상품 정보 수정
      await updateProductBoard(formData);
    }
  };

  const handleProductBoardDelete = async (e) => {
    e.preventDefault();
    const isConfirmed = await confirmDelete();
    if (isConfirmed) {
      //상품 정보 삭제
      await deleteProductBoard(productCode);
      informSuccess();
      navigate("/productBoard/list");
    }
  };

  const setChatRoomList = async () => {
    if (!comparisonProductCode.includes(productCode)) {
      const docRef = collection(db, "chatroom");

      //상품 채팅방 추가
      addFirebaseChatRoom(
        docRef,
        loginUserId,
        userId,
        productCode,
        productImage
      );
    }
    navigate(`/my/chat`);
  };

  useEffect(() => {
    fetchProductBoard();
  }, [fetchProductBoard]);

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
      <Row className="d-flex justify-content-center my-5">
        <Card style={{ width: "50rem" }} className="p-3">
          <Form>
            <img
              src={image || "https://dummyimage.com/100x100"}
              alt="빈이미지"
              width={300}
              height={300}
            />
            <Form.Control
              className="my-3"
              type="file"
              onChange={handleFileChange}
            />

            <hr />

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={productWriter}
                readOnly
                label="작성자"
                name="productWriter"
                autoComplete="productWriter"
              />
            </Grid>

            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={productTitle}
                onChange={
                  loginUserNickname === productWriter && handleFormChange
                }
                label="제목"
                helperText="제목은 50까지로 제한"
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                name="productTitle"
                autoComplete="productTitle"
              />
            </Grid>
            <hr />
            <Grid item xs={12}>
              <TextField
                multiline
                minRows={12}
                variant="outlined"
                required
                fullWidth
                value={productContent}
                onChange={
                  loginUserNickname === productWriter && handleFormChange
                }
                label="내용"
                helperText="내용은 300자까지로 제한"
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                name="productContent"
                autoComplete="productContent"
              />
            </Grid>

            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                helperText="원하는 가격을 입력하세요"
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                value={productPrice}
                onChange={
                  loginUserNickname === productWriter && handleFormChange
                }
                name="productPrice"
                type="number"
                autoComplete="productPrice"
              />
            </Grid>
            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                helperText="상품명은 30자까지로 제한"
                label="상품명"
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                value={productName}
                onChange={
                  loginUserNickname === productWriter && handleFormChange
                }
                name="productName"
              />
            </Grid>
            <hr />

            {userPoint ? (
              <>
                <span style={{ marginRight: 50, fontSize: 20 }}>
                  판매자 별점
                </span>
                <Rating
                  emptySymbol="fa fa-star-o fa-2x"
                  fullSymbol="fa fa-star fa-2x"
                  value={userPoint}
                  readOnly
                  fractions={5}
                  precision={0.5}
                  max={5}
                />
                ({userPoint})
              </>
            ) : (
              <h1>거래 이력이 없습니다.</h1>
            )}
            <div style={{ marginTop: 30 }}>
              <ButtonGroup>
                {loginUserNickname === productWriter && (
                  <>
                    <Button
                      onClick={handleProductBoardUpdate}
                      style={{ marginRight: 90 }}
                    >
                      상품 수정
                    </Button>
                    <Button
                      style={{ marginRight: 90 }}
                      onClick={handleProductBoardDelete}
                    >
                      상품 삭제
                    </Button>
                  </>
                )}
                {loginUserNickname !== productWriter && (
                  <Button
                    style={{ marginRight: 90 }}
                    onClick={() => setChatRoomList()}
                  >
                    채팅하기
                  </Button>
                )}
                <Button onClick={() => navigate("/productBoard/list")}>
                  상품 목록으로
                </Button>
              </ButtonGroup>
            </div>
          </Form>
        </Card>
      </Row>
    </div>
  );
};

export default ProductBoardRead;
