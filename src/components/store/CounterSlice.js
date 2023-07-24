import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token : '', // jwt accessToken 정보
    event : '', // 캘린더에 적용될 event 객체
    info : {
        name : '',
        email : '',
        company : '',
    },
};

const infoSlice = createSlice({
    name : "info",
    initialState,
    // 리듀서
    reducers : {
            // 액션 
            saveToken : (state, action) => {
                state.token = action.payload; // 서버에서 받아온 데이터를 저장
            },
            saveEvent : (state, action) => {
                state.event = action.payload; // 서버에서 받아온 데이터를 저장
            },
            saveInfo : (state, action) => { // 서버에서 받아온 유저 데이터를 저장
                state.info =  {
                    name : action.payload.name,
                    email : action.payload.email,
                }
            }, 
        }
    }
);

export const { saveToken, saveEvent, saveInfo } = infoSlice.actions;

export default infoSlice.reducer;

