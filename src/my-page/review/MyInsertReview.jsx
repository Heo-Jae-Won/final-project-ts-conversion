import { Grid, TextField } from "@material-ui/core";
import { Rating } from "@mui/material";
import React, { useState } from "react";
import { Button, ButtonGroup, Card, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "../../model/user.store";
import { insertReview } from "../../util/axios/my/review";
import {
  informNoPayment,
  informServerError,
  informSuccess,
} from "../../util/swal/information";
import { useLocation } from "react-router-dom";

/**
 * 리뷰 쓰기 화면
 */
const MyInsertReview = () => {
  const [point, setPoint] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const seller = params.get("seller");
  const productCode = params.get("productCode");
  const { payCode } = useParams();
  const loginUserNickname = useUserStore((state) => state.loginUserNickname);

  const [form, setForm] = useState({
    reviewContent: "",
    reviewSender: loginUserNickname, //myNickname
    reviewReceiver: seller, //otherNickname
  });

  const { reviewContent, reviewReceiver, reviewSender } = form;

  const onChangeForm = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReviewInsert = async () => {
    const formData = new FormData();
    formData.append("reviewContent", reviewContent);
    formData.append("reviewSender", reviewSender);
    formData.append("reviewReceiver", reviewReceiver);
    formData.append("point", point);
    formData.append("payCode", payCode);
    formData.append("productCode", productCode);

    //리뷰 등록
    const result = (await insertReview(formData)).data;

    if (result === 1) {
      informSuccess();
      navigate("/my/menu");
    } else {
      informNoPayment();
    }
  };

  return (
    <Row className="d-flex justify-content-center my-5">
      <Card style={{ width: "30rem" }} className="p-3">
        <Form>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              value={reviewSender}
              name="reviewSender"
              inputProps={{ readOnly: true }}
              onChange={onChangeForm}
            />
          </Grid>

          <hr />
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="내용"
              value={reviewContent}
              name="reviewContent"
              onChange={onChangeForm}
            />
          </Grid>

          <hr />
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="리뷰 대상자"
              value={reviewReceiver}
              name="reviewReceiver"
              onChange={onChangeForm}
              inputProps={{ readOnly: true }}
            />
          </Grid>

          <hr />
          <span style={{ marginRight: 50, fontSize: 20 }}>별점</span>
          <Rating
            emptySymbol="fa fa-star-o fa-2x"
            fullSymbol="fa fa-star fa-2x"
            defaultValue={5}
            value={point}
            onChange={(event, newValue) => {
              setPoint(newValue);
            }}
            fractions={5}
            precision={0.5}
            max={5}
          />

          <div style={{ marginTop: 30 }}>
            <ButtonGroup>
              <Button
                onClick={handleReviewInsert}
                style={{ width: "40%", marginTop: 300, marginRight: 90 }}
              >
                지금 <br />
                등록
              </Button>
              <Button
                onClick={() => navigate("/my/menu")}
                style={{ width: "40%", marginTop: 300 }}
              >
                나중에 등록
              </Button>
            </ButtonGroup>
          </div>
        </Form>
      </Card>
    </Row>
  );
};

export default MyInsertReview;
