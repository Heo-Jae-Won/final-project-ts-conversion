import Swal from 'sweetalert2';

export const confirmInsert = () => {
   return Swal.fire({
        text: "등록하시겠습니까?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '등록',
        cancelButtonText: '취소'
    })
}

export const confirmUpdate = () => {
    return Swal.fire({
         text: "수정하시겠습니까?",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: '수정',
         cancelButtonText: '취소'
     })
 }
 
 export const confirmDelete = () => {
    return Swal.fire({
         text: "삭제하시겠습니까?",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: '삭제',
         cancelButtonText: '취소'
     })
 }

export const confirmLeave = () => {
    return Swal.fire({
         text: "채팅방을 나가시겠습니까?",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: '퇴장',
         cancelButtonText: '취소'
     })
 }

 export const confirmDeactivate = () => {
    return Swal.fire({
         text: "회원을 탈퇴하시겠습니까?",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: '수정',
         cancelButtonText: '취소'
     })
 }

 export const confirmWriterReview = () => {
    return Swal.fire({
         title: '결제 완료!',
         text: "리뷰를 쓰러 가시겠습니까?",
         icon: 'info',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: '이동',
         cancelButtonText: '취소'
     })
 }

 export const confirmRestore = () => {
    return Swal.fire({
         text: "아이디를 복원하시겠습니까?",
         icon: 'info',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: '복원',
         cancelButtonText: '취소'
     })
 }

 export const confirmMoveRestore = () => {
    return Swal.fire({
         text: "이미 탈퇴한 회원입니다. 아이디 복원 페이지로 이동하시겠습니까?",
         icon: 'info',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: '이동',
         cancelButtonText: '취소'
     })
 }




