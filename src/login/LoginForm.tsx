import { Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Button, Card, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../model/user.store";
import { login } from "../util/axios/login";
import { confirmRestore } from "../util/swal/confirmation";
import { informNoData } from "../util/swal/information";

/**
 * 로그인 화면
 */
const LoginForm = () => {
  const navigate = useNavigate();
  const { fetchLoginUser } = useUserStore();
  const [form, setForm] = useState({
    userId: "hjw",
    userPass: "a1234567",
  });

  const { userId, userPass } = form;

  const onChangeForm = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    //로그인
    const result = (await login(form)).data;

    //db에 정보가 없거나 비밀번호가 틀림
    if (result === 0) {
      informNoData();
      setForm({
        userId: "",
        userPass: "",
      });

      //회원 탈퇴 상태
    } else if (result === 2) {
      const isConfirmed = (await confirmRestore()).isConfirmed;
      if (isConfirmed) {
        navigate(`/login/restore/${userId}`);
      }

      //로그인 성공
    } else {
      fetchLoginUser(userId);
      navigate("/");
    }
  };

  return (
    <div>
      <Row className="d-flex justify-content-center my-5">
        <Card style={{ width: "30rem" }} className="p-3">
          <Form onSubmit={handleLogin}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="id"
                value={userId}
                name="userId"
                onChange={onChangeForm}
              />
            </Grid>

            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="password"
                value={userPass}
                name="userPass"
                type="password"
                onChange={onChangeForm}
              />
            </Grid>

            <hr />
            <Button type="submit" style={{ width: "30%" }}>
              로그인
            </Button>
          </Form>

          <div className="my-3">
            <Link style={{ marginRight: 110 }} to="/login/register">
              회원가입
            </Link>
            <Link style={{ marginRight: 80 }} to="/login/findId">
              아이디 찾기
            </Link>
            <Link to="/login/findPass">비밀번호 찾기</Link>
          </div>
        </Card>
      </Row>
    </div>
  );
};

export default LoginForm;
