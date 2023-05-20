import { Grid, MenuItem, TextField } from "@material-ui/core";

import React, { useState } from "react";
import { Alert, Button, Card, Form, Row } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { useAddressStore } from "../model/address.store";
import { useBirthStore } from "../model/birth.store";
import {
  checkDuplicationUserId,
  checkDuplicationUserNickname,
  saveUser,
} from "../util/axios/login";
import {
  checkEmailValid,
  checkPasswordValid,
  checkPhoneNumberValid,
} from "../util/regex/regex";
import { confirmInsert } from "../util/swal/confirmation";
import {
  informDuplicationUserNicknamePass,
  informNotEqualPassword,
  informSuccess,
  informUseableUserId,
} from "../util/swal/information";
import { requireInput, requireValidationPass } from "../util/swal/requirement";
import {
  failDuplicationCheckUserId,
  failDuplicationCheckUserNickname,
} from "../util/swal/service.exception";
import Address from "./Address";
import Birth from "./Birth";

/**
 * 회원가입 화면
 */
const LoginRegister = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("https://dummyimage.com/300x300");
  const [confirmPassword, setConfirmPassword] = useState("");
  const address = useAddressStore((state) => state.address);
  const birth = useBirthStore((state) => state.birth);
  const [form, setForm] = useState({
    userId: "",
    userPass: "",
    userName: "",
    userNickname: "",
    userEmail: "",
    userTel: "",
    userAddress: "",
    userStatus: "1",
    userGender: "",
    file: null,
  });

  const {
    userId,
    userPass,
    userName,
    userNickname,
    userEmail,
    userStatus,
    userTel,
    userGender,
    file,
  } = form;

  const handleDuplicationUserNicknameCheck = async (e) => {
    e.preventDefault();

    if (!userNickname) {
      requireInput();
      return;
    }

    //닉네임 중복 확인
    const result = (await checkDuplicationUserNickname(userNickname)).data;
    result === 3
      ? informDuplicationUserNicknamePass()
      : failDuplicationCheckUserNickname();
  };

  const confirmEqualPassword = () => {
    userPass !== confirmPassword
      ? setMessage("비밀번호가 일치하지 않습니다.")
      : setMessage("비밀번호가 일치합니다.");
  };

  const handleDuplicationUserIdCheck = async (e) => {
    e.preventDefault();

    if (!userId) {
      requireInput();
      return;
    }

    //아이디 중복 확인
    const result = (await checkDuplicationUserId(userId)).data;
    !result ? informUseableUserId() : failDuplicationCheckUserId();
  };

  const handleFormChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUserSave = async (e) => {
    e.preventDefault();

    if (
      !userId ||
      !userPass ||
      !userGender ||
      userGender === "성별" ||
      !userName ||
      !confirmPassword
    ) {
      requireInput();
      return;
    } else if (userPass !== confirmPassword) {
      informNotEqualPassword();
      return;
    } else if (
      !checkPasswordValid(userPass) ||
      !checkPhoneNumberValid(userTel) ||
      !checkEmailValid(userEmail)
    ) {
      requireValidationPass();
      return;
    }

    if (!file) {
      requireInput();
      return;
    }

    if (!["image/jpeg", "image/png"].includes(file["type"])) {
      alert("이미지는 jpeg, png만 가능합니다.");
      return;
    }

    const isConfirmed = (await confirmInsert()).isConfirmed;
    if (isConfirmed) {
      //   //인증번호 확인
      // const result = await authenticateUser(userTel);

      // const authNumber = prompt("인증번호를 입력하세요.");

      // if (authNumber !== String(result.data)) {
      //   informFailedAuthentication();
      //   return;
      // }
      const data = {
        userId,
        userPass,
        userName,
        userNickname,
        userEmail,
        userTel,
        userAddress: address,
        userStatus,
        userGender,
        userBirth: birth,
      };

      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "data",
        new Blob([JSON.stringify(data)], {
          type: "application/json",
        })
      );

      //회원가입
      await saveUser(formData);
      informSuccess();
      navigate("/login/form");
    }
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));

    if (typeof e.target.files[0] !== "undefined") {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  //주소 받는 API

  return (
    <div>
      <Row className="d-flex justify-content-center my-5">
        <Card style={{ width: "30rem" }} className="p-3">
          <Form>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="아이디"
                value={userId}
                name="userId"
                helperText="15자 이하로 기입"
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                onChange={handleFormChange}
              />
            </Grid>
            <Button onClick={handleDuplicationUserIdCheck} className="mt-3">
              아이디 중복 확인
            </Button>
            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="비밀번호"
                helperText="8-10자 영문대소문자와 숫자를 조합"
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                value={userPass}
                name="userPass"
                autoComplete="userPass"
                type="password"
                onChange={handleFormChange}
              />
            </Grid>
            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userPass"
                label="비밀번호 확인"
                value={confirmPassword}
                name="userPass"
                autoComplete="userPass"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            {message && <Alert>{message}</Alert>}
            <Button onClick={confirmEqualPassword} className="mt-3">
              비밀번호 확인
            </Button>
            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="가입자 이름"
                value={userName}
                name="userName"
                autoComplete="userName"
                onChange={handleFormChange}
              />
            </Grid>
            <hr />
            <Birth />
            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={userNickname}
                name="userNickname"
                onChange={handleFormChange}
              />
            </Grid>
            <Button
              className="mt-3"
              onClick={handleDuplicationUserNicknameCheck}
            >
              닉네임 중복확인
            </Button>
            <hr />
            <Address />
            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="전화번호"
                value={userTel}
                helperText="010-0000-0000 or 010-000-0000"
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                name="userTel"
                autoComplete="userTel"
                onChange={handleFormChange}
              />
            </Grid>
            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="이메일 주소"
                helperText="실제 이메일과 다를 시 비밀번호를 재발급 받는 데 지장이 있습니다"
                value={userEmail}
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                name="userEmail"
                autoComplete="userEmail"
                onChange={handleFormChange}
              />
            </Grid>
            <hr />
            <TextField
              select
              label="성별을 선택하세요"
              fullWidth
              value={userGender}
              name="userGender"
              onChange={handleFormChange}
            >
              <MenuItem value="성별">성별</MenuItem>
              <MenuItem value="남자">남자</MenuItem>
              <MenuItem value="여자">여자</MenuItem>
            </TextField>
            프로필 사진등록
            <br />
            <img src={image} width={250} height={250} alt="빈 이미지" />
            <Form.Control
              className="my-3"
              onChange={handleFileChange}
              type="file"
            />
            <hr />
            <Button
              onClick={handleUserSave}
              type="submit"
              style={{ width: "100%" }}
            >
              회원가입
            </Button>
          </Form>
        </Card>
      </Row>
    </div>
  );
};

export default LoginRegister;
