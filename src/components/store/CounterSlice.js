import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token : '', // jwt accessToken 정보
    event : '', // 캘린더에 적용될 event 객체
    info : {
        copSeq : '',
        copName : '',
        userSeq : '',
        userId : '',
        userName : '',
        userEmail : '',
        userImage : '',
        userState : '',
        empPosition : '',
        empImage : '',
        authLevel : '',
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
                    copSeq : action.payload.copSeq,
                    copName : action.payload.copName,
                    userSeq : action.payload.userSeq,
                    userId : action.payload.userId,
                    userName : action.payload.userName,
                    userEmail : action.payload.userEmail,
                    userState : action.payload.userState,
                    userImage : action.payload.userImage,
                    empPosition : action.payload.empPosition,
                    empImage : action.payload.empImage,
                    authLevel : action.payload.authLevel,
                }
            },
            
            // localStorage 가 제거되었을 때 redux 초기화를 위한 reducer
            clearToken : (state = initialState, action) => {
                return initialState;
            }
        }
    }
);

export const { saveToken, saveEvent, saveInfo } = infoSlice.actions;

export default infoSlice.reducer;

