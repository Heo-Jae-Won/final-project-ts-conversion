import { Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Alert, Button, Card, Form, Row } from "react-bootstrap";
import { requireInput } from "../util/swal/requirement";
import { findUserId } from "../util/axios/login";
import { informServerError } from "../util/swal/information";

/**
 * 아이디를 찾는 화면
 */

const LoginFindId = () => {
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    userEmail: "",
    userName: "",
  });
  const { userEmail, userName } = form;

  const handleFormChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUserIdFind = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      requireInput();
      return;
    }

    //아이디 찾기
    const result = (await findUserId(userEmail, userName)).data;

    if (!result) {
      setForm({
        userName: "",
        userEmail: "",
      });
      setMessage("검색된 아이디가 없습니다");
    } else {
      setMessage("아이디는 " + result + "입니다");
    }
  };

  return (
    <div>
      <Row className="d-flex justify-content-center my-5">
        <Card style={{ width: "30rem" }} className="p-3">
          <Form onSubmit={handleUserIdFind}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="이름"
                value={userName}
                name="userName"
                onChange={handleFormChange}
              />
            </Grid>
            <hr />

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="이메일"
                value={userEmail}
                name="userEmail"
                onChange={handleFormChange}
              />
            </Grid>

            <hr />

            <Button type="submit" style={{ width: "40%" }}>
              아이디 찾기
            </Button>
            {message && <Alert>{message}</Alert>}
          </Form>
        </Card>
      </Row>
    </div>
  );
};

export default LoginFindId;
