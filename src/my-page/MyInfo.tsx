import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Address from "../login/Address";
import { useAddressStore } from "../module/module.address";
import {
  getUserId,
  getUserNickname,
  getUserStatus,
  updateUserInfo,
} from "../util/axios/my/user";
import { checkEmailValid, checkPhoneNumberValid } from "../util/regex/regex";
import { confirmDeactivate, confirmUpdate } from "../util/swal/confirmation";
import { informSuccess } from "../util/swal/information";
import { requireInput, requireValidationPass } from "../util/swal/requirement";
import { useUserStore } from "module/module.user";
import { User } from "model/model.user";

/**
 * 내 정보 화면
 */
const MyInfo = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { userId } = useParams();
  const address = useAddressStore((state) => state.address);
  const resetLoginUser = useUserStore((state) => state.resetLoginUser);
  const [form, setForm] = useState({} as User);
  const [file, setFile] = useState<string | Blob>();
  const { userNickname, userEmail, userAddress, userTel, userProfile } = form;

  const handleFormChange: React.ChangeEventHandler<HTMLElement> = ($event) => {
    const target = $event.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleUserNicknameCheck: React.MouseEventHandler<HTMLElement> = async (
    $event
  ) => {
    $event.preventDefault();
    if (!userNickname) {
      requireInput();
    }

    //닉네임 중복 확인
    const result = await getUserNickname(userNickname);
    result.data === 1
      ? setMessage("사용 가능한 닉네임입니다.")
      : setMessage("해당 닉네임은 사용할 수 없습니다");
  };

  const handleFileChange: React.ChangeEventHandler<HTMLElement> = ($event) => {
    const target = $event.target as HTMLFormElement;

    //files이 설정되지 않아 undefined가 되면 오류가 발생한다. 따라서 예외처리가 필요하다.
    if (typeof target.files[0] !== "undefined") {
      setFile(target.files[0]);
      const url = URL.createObjectURL(target.files[0]);
      setImage(url);
    }
  };

  const fetchUserInfo = useCallback(async () => {
    setLoading(true);

    //내 정보 조회
    const result = (await getUserId(userId as string)).data;
    setImage(result.userProfile);
    setForm(result);
    setLoading(false);
  }, [userId]);

  //update myInfo
  const handleUserInfoUpdate = async () => {
    if (!checkPhoneNumberValid(userTel) || !checkEmailValid(userEmail)) {
      requireValidationPass();
      return;
    }

    const isConfirmed = (await confirmUpdate()).isConfirmed;
    if (isConfirmed) {
      //HACK: file을 넣어서 보내면 @RequestBody는 한 개 class만 받을 수 있어 dto에도 file을 넣어야 한다. 그럼 file type을 어떻게 넣어야할까? 아니면 base64encoding을 해야한다.
      const data = {
        userId: userId,
        userNickname: userNickname,
        userProfile: userProfile,
        userAddress: address,
        userEmail: userEmail,
        userTel: userTel,
        file: file,
      };

      //내 정보 수정
      await updateUserInfo(data);
      informSuccess();
    }
  };

  const handleUserDeactivate = async () => {
    const isConfirmed = (await confirmDeactivate()).isConfirmed;
    if (isConfirmed) {
      //회원 탈퇴
      await getUserStatus(userId as string);
      informSuccess();
      resetLoginUser();
      navigate("/");
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo, userId]);

  if (loading)
    return (
      <Spinner
        animation="border"
        variant="primary"
        style={{ width: "20rem", height: "20rem", marginTop: "220px" }}
      />
    );

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <Row className="mt-3">
          <Form style={{ marginLeft: "70px" }}>
            <Form.Group className="mb-3" style={{ width: "300px" }}>
              <Form.Label>NickName</Form.Label>
              <Form.Control
                placeholder="닉네임"
                name="userNickname"
                value={userNickname}
                onChange={handleFormChange}
              />
              {message && <Alert>{message}</Alert>}
              <Button className="mt-3" onClick={handleUserNicknameCheck}>
                닉네임 중복확인
              </Button>
            </Form.Group>

            <Form.Group className="mb-3" style={{ width: "300px" }}>
              <Form.Label>Tel</Form.Label>
              <Form.Control
                name="userTel"
                placeholder="전화번호"
                value={userTel}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3"></Form.Group>

            <Form.Group className="mb-3" style={{ width: "300px" }}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="userEmail"
                placeholder="이메일"
                value={userEmail}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Address userAddress={userAddress} />

            <Form.Control
              className="my-3"
              style={{ width: "300px" }}
              type="file"
              onChange={handleFileChange}
            />
            <img
              src={image}
              style={{ width: "300px", height: "350px", marginLeft: "-150px" }}
              alt="빈 이미지"
            />

            <div style={{ marginTop: 20, marginLeft: "-100px" }}>
              <Button
                className="ff"
                style={{ marginLeft: "-10px" }}
                onClick={handleUserInfoUpdate}
              >
                정보 변경하기
              </Button>
              <Button className="ff1" onClick={handleUserDeactivate}>
                회원탈퇴
              </Button>
              <Button
                className="mx-5"
                onClick={() => navigate(`/my/pass/update`)}
              >
                비밀번호 변경
              </Button>
            </div>
          </Form>
        </Row>
      </div>
    </>
  );
};

export default MyInfo;
