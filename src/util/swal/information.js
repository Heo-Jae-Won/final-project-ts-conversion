import Swal from "sweetalert2";
export const informSuccess = () => {
  return Swal.fire({
    text: "요청하신 작업이 완료되었습니다",
    icon: "success",
    confirmButtonColor: "#3085d6",
  });
};

export const informDuplicationUserNicknamePass = () => {
  return Swal.fire({
    text: "해당 닉네임은 사용가능한 닉네임입니다.",
    icon: "success",
    confirmButtonColor: "#3085d6",
  });
};

export const informServerError = () => {
  return Swal.fire({
    text: "예상치 못한 오류가 발생하였습니다",
    icon: "error",
    confirmButtonColor: "#3085d6",
  });
};
export const informNoPayment = () => {
  return Swal.fire({
    text: "결제 내역이 없습니다!",
    icon: "error",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  });
};

export const informNotEqualPassword = () => {
  return Swal.fire({
    text: "비밀번호가 서로 일치하지 않습니다!",
    icon: "warning",
    confirmButtonColor: "#3085d6",
  });
};

export const informEqualPassword = () => {
  return Swal.fire({
    text: "비밀번호가 일치합니다!",
    icon: "info",
    confirmButtonColor: "#3085d6",
  });
};

export const informUseableUserId = () => {
  return Swal.fire({
    text: "사용 가능한 아이디입니다",
    icon: "info",
    confirmButtonColor: "#3085d6",
  });
};

export const informNotValid = () => {
  return Swal.fire({
    text: "입력한 아이디나 이메일이 존재하지 않습니다.",
    icon: "info",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  });
};

export const informFailedAuthentication = () => {
  return Swal.fire({
    text: "인증번호가 올바르지 않습니다.",
    icon: "error",
    confirmButtonColor: "#3085d6",
  });
};

export const informFailedPayment = (msg) => {
  return Swal.fire({
    text: `결제가 실패하였습니다 : ${msg}`,
    icon: "error",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  });
};

export const informSendingTempPassword = () => {
  return Swal.fire({
    text: "가입된 메일 주소로 임시 재발급 비밀번호가 발급되었습니다!",
    icon: "success",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  });
};

export const informNoData = () => {
  return Swal.fire({
    text: "계정 정보가 존재하지 않습니다.",
    icon: "info",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  });
};
