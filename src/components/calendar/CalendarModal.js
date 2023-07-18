import React, {useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';

import dayjs from 'dayjs'

function CalendarModal ({ showModal, handleCloseModal, calendarTimeStart, calendarTimeEnd, eventUpdate }) {

  ////// ======== 아래 코드부터 로직 다시 재작성 ========= ///////

  // 저장될 내용은 추후에 Reducer로 변경해서 사용하자.
  const [title, setTitle] = useState('');
  const [resource, setReousrce] = useState('');
  const [message, setMessage] = useState(''); 

  const [calendarStartChanged, setCalendarStartChanged] = useState('');
  const [calendarEndChanged, setCalednarEndChanged] = useState('');
  const [dateClickCheck, setDateClickCheck] = useState(false);

  const content = {
    message : message,
    resource : resource,
  }

  //  모달 제목 타이틀의 변경을 감지해서 state에 반영해줄 handle function
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

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
      eventUpdate(event);
      handleCloseModal();
      setDateClickCheck(false);
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
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">예약</Modal.Title>
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
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style={{ height: "100px", resize: "none" }}
            onChange={handleContentChange}
          ></textarea>
          <label htmlFor="floatingTextarea2">내용</label>
        </div>
        <div className="d-flex">
          <div className="form-group col-md-5">
            <label htmlFor="startDate">시작 날짜:</label>
            <input
              type="datetime-local"
              className="form-control"
              id="startDate"
              defaultValue={calendarTimeStart} // 어떻게 해야하지?
              //defaultValue={modalStartDateInitial(timeGridStart)}
              onChange={handleStartDateTime}
            />
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="endDate">종료 날짜:</label>
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