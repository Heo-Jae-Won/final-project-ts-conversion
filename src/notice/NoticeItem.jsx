import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * NoticeList의 실제 화면
 */
const NoticeItem = ({ noticeList }) => {
  const navigate=useNavigate();
  const { noticeCode, noticeTitle,  noticeWriter, noticeRegDate } = noticeList;

  return (
    <tr style={{ cursor: 'pointer' }} onClick={() => navigate(`/notice/read/${noticeCode}`)}>
      <td>{noticeWriter}</td>
      <td>{noticeTitle}</td>
      <td>{noticeRegDate}</td>
    </tr>
  )
}

export default NoticeItem;