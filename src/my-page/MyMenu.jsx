import React, { useState } from 'react';
import { Button, Offcanvas, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../model/user.store';

/**
 * my-page를 구성하는 메뉴
 */
const MyMenu = () => {
    const navigate=useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const loginUserId = useUserStore(
        (state) => state.loginUserId
      );
    return (
        <div>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>my menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row>
                        <Button variant='secondary' className='my-5 ' onClick={() => navigate(`/my/info/${loginUserId}`)}>
                            내 정보
                        </Button>

                        <Button variant='secondary' className='my-5' onClick={() =>navigate(`/my/review`)}>
                            내가 받은 리뷰
                        </Button>

                        <Button variant='secondary' className='my-5' onClick={() =>navigate(`/my/chat`)}>
                            내 채팅
                        </Button>

                        <Button variant='secondary' className='my-5' onClick={() => navigate(`/my/sell`)}>
                            내 판매 내역
                        </Button>

                        <Button variant='secondary' className='my-5' onClick={() => navigate(`/my/buy`)}>
                            내 구매 내역
                        </Button>


                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className='img26'>
                <img
                    size='10px'
                    className="d-block w-100"
                    src="/image/image26.jpg"
                    alt="빈 이미지"
                />
            </div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <Button variant="warning" onClick={handleShow} className="ball">메뉴</Button>




        </div>
    )
}

export default MyMenu

