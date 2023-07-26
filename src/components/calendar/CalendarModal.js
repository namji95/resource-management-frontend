import React, {useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import dayjs from 'dayjs'

function CalendarModal ({ showModal, handleCloseModal, calendarTimeStart, calendarTimeEnd, eventUpdate }) {

  ////// ======== 아래 코드부터 로직 다시 재작성 ========= ///////

  // 저장될 내용은 추후에 Reducer로 변경해서 사용하자.
  const [title, setTitle] = useState('');

  const [resource, setReousrce] = useState(''); // 나중에 삭제할거..
  const [message, setMessage] = useState(''); // 나중에 삭제할거..

  // 나중에 reducer로 수정해야하나..?
  const [rsvName, setRsvName] = useState(''); // 디비 예약자명
  const [rsvSeq, setRsvSeq] = useState(0); // 디비 자원 일련번호
  const [rsvDetail, setRsvDetail] = useState(0); // 디비 세부 일련번호
  const [rsvParti, setRsvParti] = useState(0); // 디비 예약 사용 인원
  const [rsvExplan, setRsvExplan] = useState(''); // 디비 예약 내역 설명
  const [rsvPrivate, setRsvPrivate] = useState(true); // 디비 예약 현황 공개

  const [selectedValue, setSelectedValue] = useState(''); // 모달 창 설비 예약

  const [rsvArray, setRsvArray] = useState([]); // 자원 종류 가져올 거 (지금은 더미데이터 적용)

  const [calendarStartChanged, setCalendarStartChanged] = useState('');
  const [calendarEndChanged, setCalednarEndChanged] = useState('');
  const [dateClickCheck, setDateClickCheck] = useState(false);

  // 캘린더 등록시 사용할 거..
  const content = {

    message : message,
    resource : resource,

    rsv_name : rsvName,
    rsv_seq : rsvSeq,
    rsv_detail : rsvDetail,
    rsv_parti : rsvParti,
    rsv_explan : rsvExplan,
    rsv_private : rsvPrivate,
  }

  //  모달 제목 타이틀의 변경을 감지해서 state에 반영해줄 handle function
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // 모달 설비 예약 dropdown Menu 의 정보를 반영해줄 handle function
  const handleRsvSeq = (value) => {
    console.log(value);
  }

  // 모달 내용의 변경을 감지해서 State에 반영해줄 handle function
  const handleContentChange = (e) => {
    setMessage(e.target.value);
  };

  // 모달 : 예약 시작날짜 변경 시
  const handleStartDateTime = (e) => {
    setDateClickCheck(true);
    let timeChanged = dayjs(e.target.value).format("YYYY-MM-DD HH:mm:ss")
    setCalendarStartChanged(timeChanged);
    if (timeChanged >= calendarEndChanged) {
      setCalednarEndChanged(dayjs(Date.parse(dayjs(e.target.value).format("YYYY-MM-DD HH:mm:ss"))
       - new Date().getTimezoneOffset() * 160000).format("YYYY-MM-DD HH:mm:ss"));
    }
    if (timeChanged < calendarTimeEnd) {
      if (calendarEndChanged === '') {
        setCalednarEndChanged(calendarTimeEnd);
      } else {
        setCalednarEndChanged(calendarEndChanged);
      }
    }
  };

  // 모달 : 예약 종료날짜 변경 시
  const handleEndDateTime = (e) => {
    setDateClickCheck(true);
    let timeChanged = dayjs(e.target.value).format("YYYY-MM-DD HH:mm:ss")
    setCalednarEndChanged(timeChanged);
    if (timeChanged <= calendarStartChanged) {
      setCalendarStartChanged(dayjs(Date.parse(dayjs(e.target.value).format("YYYY-MM-DD HH:mm:ss"))
       + new Date().getTimezoneOffset() * 160000).format("YYYY-MM-DD HH:mm:ss"));
    }
    if (timeChanged > calendarStartChanged) {
      setCalendarStartChanged(calendarStartChanged);
    }
  }

  useEffect(() => {
    setCalendarStartChanged(calendarTimeStart);
    setCalednarEndChanged(calendarTimeEnd);
  },[calendarTimeStart, calendarTimeEnd])

  // 모달 등록버튼 이벤트
  const handleSave = () => {
    // calendar에 useState events 객체에 담을 modal의 event 객체
    if (dateClickCheck) {
      const event = {
        title: title,
        content: content,
        start: calendarStartChanged, // 데이터가 잘 전달되는지 확인하기 위해 잠시 넣어둔 initalStartTime
        end: calendarEndChanged, // 데이터가 잘 전달되는지 확인하기 위해 잠시 넣어둔 initalEndTime
      };

      

      // eventUpdate(event);
      // handleCloseModal();
      // setDateClickCheck(false);
    } else {
      const event = {
        title: title,
        content: content,
        start: calendarTimeStart,
        end: calendarTimeEnd,
      };
      eventUpdate(event);
      handleCloseModal();
      setDateClickCheck(false);
    }
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">설비 예약</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">
            제목
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            onChange={handleTitleChange}
          ></input>
        </div>

        <div className="d-flex">
          <div className="form-group col-md-1">
            <label htmlFor="startDate" style={{paddingTop : '0.4rem', paddingLeft : '0.8rem'}}>일시</label>
          </div>
          <div className="form-group col-md-1"></div>
          <div className='form-group col-md-4'>
            <input
              type="datetime-local"
              className="form-control"
              id="startDate"
              defaultValue={calendarTimeStart} // 어떻게 해야하지?
              //defaultValue={modalStartDateInitial(timeGridStart)}
              onChange={handleStartDateTime}
            />
          </div>
          <div className="form-group col-md-1"></div>
          <div className="form-group col-md-4">
            <input
              type="datetime-local"
              className="form-control"
              id="endDate"
              defaultValue={calendarTimeEnd}
              //defaultValue={modalEndDateInitial(timeGridEnd)}
              onChange={handleEndDateTime}
            />
          </div>
        </div>

        <div className="d-flex" style={{marginTop : '1em'}}>
          <div className="form-group col-md-2">
            <label htmlFor="startDate" style={{paddingTop : '0.4rem', paddingLeft : '0.8rem'}}>설비</label>
          </div>
          
          <div className='form-group col-md-2'>
            <div className="dropdown-center">
              <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{border : '1px solid #dee2e6', margin : '0px'}}>
                설비 예약
              </button>
              <ul className="dropdown-menu">
                {rsvArray.map((item, index) => (
                  <li key={index}>
                    <a className='dropdown-item' onClick={() => handleRsvSeq(item)}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className='form-group col-md-2'>
            <label style={{maring: '0px'}}></label>
          </div>
        </div>

        <div className="form-floating" style={{marginTop : '1em'}}>
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style={{ height: "100px", resize: "none" }}
            onChange={handleContentChange}
          ></textarea>
          <label htmlFor="floatingTextarea2">예약 내용</label>
        </div>

        <div className="d-flex" style={{marginTop : '1em'}}>
          <div className="form-group col-md-1">
            <label htmlFor="startDate" style={{paddingTop : '0.4rem', paddingLeft : '0.8rem'}}>공개</label>
          </div>
          <div className='form-group col-md-1'></div>
          <div className="form-check form-check-inline" style={{paddingTop : '0.4rem'}}>
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" defaultChecked="checked" />
            <label className="form-check-label" htmlFor="inlineRadio1">공개</label>
          </div>
          <div className="form-check form-check-inline" style={{paddingTop : '0.4rem'}}>
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
            <label className="form-check-label" htmlFor="inlineRadio2">비공개</label>
          </div>
        </div>
        
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={handleCloseModal}>
          닫기
        </Button>
        <Button variant="primary" onClick={handleSave}>
          등록
        </Button>
      </Modal.Footer>

    </Modal>
  );
};

export default CalendarModal;