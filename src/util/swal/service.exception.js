import Swal from 'sweetalert2';


 //이 아래 메시지는 전부 backend ExceptionHandler로 보내주기
 export const failPaymentVerification = () => {
    return Swal.fire({
         text: "위변조 검증이 성공적으로 이뤄지지 않았습니다. 다시 결제를 시도해주세요",
         icon: 'error',
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
     })
 }

 export const failDuplicationCheckUserId = () => {
    return Swal.fire({
         text: "중복된 아이디라서 사용할 수 없습니다",
         icon: 'warning',
         confirmButtonColor: '#3085d6',
     })
 }

 export const failDuplicationCheckUserNickname = () => {
    return Swal.fire({
         text: "닉네임이 중복되었습니다",
         icon: 'warning',
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
     })
 }

export const DeleteAlready = () => {
   return Swal.fire({
        text: "해당 상품은 판매되었거나 삭제된 상품입니다",
        icon: 'error',
        confirmButtonColor: '#3085d6',
    })
}

export const failFileUploadBySize = () => {
   return Swal.fire({
        text: '파일의 용량이 250MB를 초과하여 업로드할 수 없습니다.',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    })
}

export const failFileUploadByType = () => {
   return Swal.fire({
        text: "이미지 파일의 확장자는 jpg와 png만 가능합니다.",
        icon: 'error',
        confirmButtonColor: '#3085d6',
    })
}

