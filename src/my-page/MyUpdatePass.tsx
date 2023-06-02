import { Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Button, Card, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../model/user.store";
import { updatePassword } from "../util/axios/my/user";
import { checkPasswordValid } from "../util/regex/regex";
import { confirmUpdate } from "../util/swal/confirmation";
import {
  informEqualPassword,
  informNotEqualPassword,
  informSuccess,
} from "../util/swal/information";
import {
  requireEqualityPassword,
  requireInput,
  requireValidationPass,
} from "../util/swal/requirement";

/**
 * 내 비밀번호 수정 화면
 */
const MyUpdatePass = () => {
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const loginUserId = useUserStore((state) => state.loginUserId);
  const [form, setForm] = useState({
    userId: loginUserId,
    userPass: "",
  });
  const { userId, userPass } = form;
  let isChecked = false;

  const handleFormChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //비밀번호 유효성 검증
  const handlePassValidate = async (e) => {
    e.preventDefault();
    if (!confirmPassword) {
      requireInput();
    } else if (!checkPasswordValid(userPass)) {
      requireValidationPass();
    } else if (userPass !== confirmPassword) {
      informNotEqualPassword();
    } else if (userPass === confirmPassword) {
      informEqualPassword();
      isChecked = true;
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    const result = await confirmUpdate();
    if (result.isConfirmed) {
      const data = {
        userId,
        userPass,
      };

      //비밀번호 수정
      await updatePassword(data);
      informSuccess();
      navigate(`/my/info/${loginUserId}`);
    }
    //취소 click.
    else if (result.isDismissed) {
      isChecked = false;
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <Row className="mt-3">
        <Card style={{ width: "30rem" }} className="p-3">
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
          <Button onClick={handlePassValidate} className="mt-3">
            패스워드 일치 확인
          </Button>

          <Button
            onClick={
              isChecked === true
                ? handlePasswordUpdate
                : requireEqualityPassword
            }
            className="mt-3"
          >
            비밀번호 변경
          </Button>
        </Card>
      </Row>
    </div>
  );
};

export default MyUpdatePass;
