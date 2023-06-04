import { Grid, TextField } from "@material-ui/core";
import { Rating } from "@mui/material";
import { useUserStore } from "module/module.user";
import React, { useState } from "react";
import { Button, ButtonGroup, Card, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { insertReview } from "../../util/axios/my/review";
import {
  informNoPayment,
  informSuccess
} from "../../util/swal/information";

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

  const onChangeForm: React.ChangeEventHandler<HTMLElement> = ($event) => {
    const target = $event.target as HTMLFormElement;
    setForm((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleReviewInsert = async () => {
    //HACK: Java에서는 int type과 double type으로 point, productCode를 받고 있다. 하지만 formData는 string으로 보낸다. 여태까진 잘 됐는데, 이제 어떻게 될지는 봐야알 것 같다.
    const formData = new FormData();
    formData.append("reviewContent", reviewContent);
    formData.append("reviewSender", reviewSender);
    formData.append("reviewReceiver", reviewReceiver as string);
    formData.append("point", String(point));
    formData.append("payCode", payCode as string);
    formData.append("productCode", String(productCode));

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
            defaultValue={5}
            value={point}
            onChange={(event, newValue) => {
              setPoint(newValue as number);
            }}
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
