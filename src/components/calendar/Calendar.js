import React, { Fragment, useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'
//import timelinePlugin from '@fullcalendar/timeline'
import listPlugin from '@fullcalendar/list'
import * as bootstrap from 'bootstrap';
import momentTimezone from '@fullcalendar/moment-timezone'
import dayjs from 'dayjs'
import axios from 'axios'

import './Calendar.css';

import CalendarModal from './CalendarModal';

export default function Calendar() {

    // test event 객체가 들어있음...
    // const [events, setEvents] = useState([
    //     { id: 'a', title: 'Mock Data 1', content: "Rio's Data", date: '2023-07-10', backgroundColor: 'gold', color: 'gold'}, // bootStrap.css 때문인지 textColor option 이 동작하지 않음
    //     { id: 'b', title: 'Mock Data 2', date: '2023-07-13', backgroundColor: 'purple' ,color: 'purple'},
    //     { id: 'c', title: 'Mock Data 3', start: '2023-07-18', end: '2023-07-20', backgroundColor: 'red', color: 'red'},
    //     { id: 'd', title: 'Mock Data 3', start: '2023-07-11T13:00:00', end: '2023-07-12T15:00:00', backgroundColor: 'green', color: 'green'},
    //     { id: 'e', title: 'Mock Data 4', start: '2023-07-11', },
    // ]);

    const [events, setEvents] = useState([
    ]);

    const eventUpdate = (event) => {
        setEvents((prevEvents) => [...prevEvents, event]);
    }

    useEffect(() => {
        axios.get('http://localhost:9000/api/calendar/events')
        .then((response) => {
            const result = {
                title: response.data.title,
                content: response.data.content,
                start: response.data.start,
                end: response.data.end,
                }
            eventUpdate(result)
        })
        .catch((Error) => {console.log(Error)})
    },[])

    const calendarTitleFormat = (date) => {
        // 7월인데 month가 6월로 나옴
        return date.date.year + '.' + (((parseInt(date.date.month) + 1) + 100) % 10);
    }
    
    const HeaderToolbar = {
        start: "dayGridMonth timeGridWeek timeGridDay today prev next",
        center: "title",
        end: "prevYear nextYear listMonth",
    }

    const [showModal, setShowModal] = useState(false);
    const [calendarTimeStart, setCalendarTimeStart] = useState('');
    const [calendarTimeEnd, setCalendarTimeEnd] = useState('');

    const handleSelectTimeGrid = (arg) => {

        const today = dayjs().startOf('day'); // 오늘 날짜

        if (dayjs(arg.start).isBefore(today)) { // 오늘 날짜보다 이전 날짜의 클릭 이벤트 안되게..
            return;
        }

        const {start, end} = arg;

        setCalendarTimeStart(dayjs(start).format('YYYY-MM-DD HH:mm:ss'));
        setCalendarTimeEnd(dayjs(end).format('YYYY-MM-DD HH:mm:ss'));
        setShowModal(true);
    }

    // 모달 창 닫기
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // events 객체 클릭시 테스트
    const handleEventClick = (arg) => {
        // 데이터 출력 성공
        console.log('Event : ', arg.event);
    }

    // 화면 이벤트에 마우스 올려둘 때 간략하게 보여주기
    const eventDidMount = (info) => {
        return new bootstrap.Popover(info.el, {
            title: info.event.title,
            placement: 'auto',
            trigger: 'hover',
            customClass: 'popoverStyle',
            content: 
            `
            <p>${info.event.extendedProps.content.message}</p>
            <hr>
            <p>${info.event.extendedProps.content.message}</p>
            `,
            html: true,
        })
    }


        
    return (
        <Fragment>
            <FullCalendar
                contentHeight={500}
                plugins={[momentTimezone, dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                initialView={'dayGridMonth'}
                headerToolbar={HeaderToolbar}
                titleFormat={calendarTitleFormat}
                locale={'ko'} // script한 locale을 'en'으로 해야 일자가 뜨지 않음, 일자를 띄우고 싶다면 설정을 변경해주어야함.
                buttonText={
                    {
                        today:    '오늘',
                        month:    '월',
                        week:     '주',
                        day:      '일',
                        list:     '일정목록'
                    }
                }
                events={events}
                selectable={true}
                nowIndicator={true}
                eventClick={handleEventClick}
                eventDidMount={eventDidMount}
                select={handleSelectTimeGrid}
                timeZone={'Asia/seoul'}
            />
            <CalendarModal 
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                setEvents={setEvents} 
                events={events}
                calendarTimeStart={calendarTimeStart} // 예 ) 형식 : Thu Jul 06 2023 09:00:00 GMT+9000 (한국 표준 시)
                calendarTimeEnd={calendarTimeEnd} // 예 ) 형식 : Thu Jul 07 2023 09:00:00 GMT+9000 (한국 표준 시)
                eventUpdate={eventUpdate}
            />
        </Fragment>
    );
}