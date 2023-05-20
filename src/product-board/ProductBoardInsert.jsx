import { Card, Grid, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../model/user.store";
import { insertProductBoard } from "../util/axios/product.board";
import { confirmInsert } from "../util/swal/confirmation";
import { informSuccess } from "../util/swal/information";
import { requireInput } from "../util/swal/requirement";

/**
 * 상품 게시판 등록
 */
const ProductBoardInsert = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const loginUserNickname = useUserStore((state) => state.loginUserNickname);
  const [form, setForm] = useState({
    productWriter: loginUserNickname,
    productPrice: "",
    productTitle: "",
    productContent: "",
    productName: "",
    file: null,
    productImage: "",
  });
  const {
    productName,
    productPrice,
    productTitle,
    productContent,
    productImage,
    file,
    productWriter,
  } = form;

  const handleFormChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
    if (typeof e.target.files[0] !== "undefined") {
      const url = URL.createObjectURL(e.target.files[0]);
      setImage(url);
    }
  };

  const handleProductBoardInsert = async () => {
    if (!file) {
      requireInput();
      return;
    }

    if (!["image/jpeg", "image/png"].includes(file["type"])) {
      alert("이미지는 jpeg, png만 가능합니다.");
      return;
    }

    const data = {
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

    const isConfirmed = (await confirmInsert()).isConfirmed;
    if (isConfirmed) {
      //상품게시판 등록
      await insertProductBoard(formData);
      informSuccess();
      navigate("/productBoard/list");
    }
  };

  // 새로고침 막기(조건 부여 가능)
  useEffect(() => {
    window.onbeforeunload = function () {
      return true;
    };
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <div>
      <Row className="d-flex justify-content-center my-5">
        <Card style={{ width: "60rem" }} className="p-3">
          <Form>
            <Grid item xs={12}>
              <p style={{ width: "100%" }}>이미지</p>
              <img
                src={image || "https://dummyimage.com/300x300"}
                alt="빈이미지"
                title="메인이미지"
                width={300}
                height={300}
              />
            </Grid>
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
                value={productTitle}
                onChange={handleFormChange}
                label="제목"
                name="productTitle"
                autoComplete="productTitle"
              />
            </Grid>
            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="상품명"
                value={productName}
                onChange={handleFormChange}
                name="productName"
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
                onChange={handleFormChange}
                label="내용은 300자 제한"
                name="productContent"
                autoComplete="productContent"
              />

              <hr />
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="가격"
                  value={productPrice}
                  onChange={handleFormChange}
                  name="productPrice"
                  type="number"
                  autoComplete="productPrice"
                />
              </Grid>
              <hr />
            </Grid>
            <div style={{ marginTop: 30 }}>
              <Button
                onClick={handleProductBoardInsert}
                style={{ width: "20%", marginTop: 100 }}
              >
                상품 등록
              </Button>
              <Button
                onClick={() => navigate(-1)}
                style={{ width: "20%", marginLeft: 200 }}
              >
                뒤로가기
              </Button>
            </div>
          </Form>
        </Card>
      </Row>
    </div>
  );
};

export default ProductBoardInsert;
