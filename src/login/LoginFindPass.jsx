import { Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Alert, Button, Card, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { sendTempPassword } from "../util/axios/login";
import { checkEmailValid } from "../util/regex/regex";
import {
  informNotValid,
  informSendingTempPassword
} from "../util/swal/information";
import { requireInput, requireValidationPass } from "../util/swal/requirement";

/**
 * 비밀번호 찾는 화면
 */

const LoginFindPass = () => {
  const message = "비밀번호를 재발급하는 데 약 7-8초의 시간이 소요됩니다.";
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userId: "",
    userEmail: "",
  });

  const { userId, userEmail } = form;

  const handleFormChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTempPasswordSend = async (e) => {
    e.preventDefault();

    if (!userId || !userEmail) {
      requireInput();
      return;
    }

    if (!checkEmailValid(userEmail)) {
      requireValidationPass();
      return;
    }

    //임시비밀번호 발송
    const result = (await sendTempPassword(form)).data;

    if (result === 0) {
      informNotValid();
    } else if (result === 1) {
      informSendingTempPassword();
      navigate("/login/form");
    }
  };

  return (
    <div>
      <Row className="d-flex justify-content-center my-5">
        <Card style={{ width: "30rem" }} className="p-3">
          <Form onSubmit={handleTempPasswordSend}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="id"
                value={userId}
                name="userId"
                onChange={handleFormChange}
              />
            </Grid>
            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="email"
                value={userEmail}
                name="userEmail"
                onChange={handleFormChange}
              />
            </Grid>
            <hr />
            <Button type="submit" style={{ width: "50%" }}>
              임시비밀번호 발급
            </Button>
            <Alert>{message}</Alert>
          </Form>
        </Card>
      </Row>
    </div>
  );
};

export default LoginFindPass;
