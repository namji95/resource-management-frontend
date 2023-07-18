import React, { useState } from "react";
import { Container} from "react-bootstrap";
import '../css/room.css'
import axios from "axios";
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Button from '@mui/joy/Button';
import { TextField } from "@mui/material";


function Room(props) {
  const [date, setDate] = useState(new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()));
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [count, setCount] = useState(0);
  const times = Array(17).fill(8).map((value, index) => value + index);

	const [inputs,setInputs] = useState({
		name : '',
		title : '',
		room : '',
		people : '',
		description : '',
	});

	const {name,title,room,people,description} = inputs;

	const validation =()=>{
		let check = /^[0-9]+$/;
		return check.test(people);
}

	const onChange = (e) => {
		const {value,name} = e.target;
		setInputs({
			...inputs,
			[name] : value
		});
	};

	const resverseRoom = (e) => {
		e.preventDefault();
		axios.post("http://localhost:9000/reserve",{
			reserveName : name,
			// 나중에 회의실 해당 pk id 받아오는걸로 수정
			roomNumber : 1,
			// 나중에 카테고리 선택 추가
			resource : "meeting",
			// reserveStartTime : date.concat(" ",startTime),
			// reserveEndTime : date.concat(" ",endTime),
			// reserveStartTime : (date),
			// reserveEndTime : (date),
			participant : people,
			description : description

		}).then((res)=>{
			console.log(res.data)
		}).catch((error) => {
			console.log("전송 실패")
		})
		
	}


  function mouseLocation(event) {
    if (count === 0) {
      setStartTime(event.target.getAttribute('data-index'));
      setCount(count + 1);
    } else if (count === 1) {
      setEndTime(event.target.getAttribute('data-index'));
      setCount(count + 1);
    
    } else if (count == 2) {
        setStartTime(event.target.getAttribute('data-index'));
        setCount(1);
        setEndTime(0);
        return ;
    }
  }

  return (
    <Container>
      <strong>설비 예약</strong>
			<p>{date}</p>

      <form onSubmit={resverseRoom}>
				<FormLabel>제목</FormLabel>
				<Input id="title" type = "text" name = "title" value = {title} onChange={onChange} placeholder="제목을 입력하세요"/>
				<br/>
				
				<FormLabel>예약자</FormLabel>
				<Input type = "text" name = "name" value = {name} onChange={onChange} placeholder="예약자 이름을 입력하세요"/>
				<br/>
				
				<TextField
              autoFocus
              error={!validation()}
							value = {people}
              helperText={!validation() ? "특수기호나 한글은 입력 하실 수 없습니다.":""}
              label="사용인원"
              type="text"
              variant="outlined"
							onChange={onChange} 
              name="people"
				/>

				<FormLabel>회의실</FormLabel>
				<Input type = "text" name = "room" value = {room} onChange={onChange} placeholder =  "예약할 회의실을 입력하세요"/>
				<br/>

				<div className="timeTable" onClick={mouseLocation}>
        {times.map((elem, idx) => (
          <span
            className={`hour ${elem >= startTime && elem <= endTime ? 'highlight' : ''}`}
            data-index={elem}
            key={elem}
          >
            {elem}
          </span>
        ))}
      </div>
				
			<div>
        <p>예약 시작 시간 {startTime} ~ 예약 종료 시간 {endTime}</p>
     </div>

			<FormLabel>메모</FormLabel>
				<Input size = "lg" type = "text" name = "description" value = {description} onChange={onChange} placeholder =  "메모"/>
				<br/>

     


        <Button type = "submit">제출</Button>
      </form>
      
      
      <div>
        
      </div>
      
    </Container>
  )
}

export default Room;
