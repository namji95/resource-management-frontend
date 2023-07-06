import './App.css';
import { useEffect, useState } from 'react';
import Board from './compontents/Board.js';
import Input from './compontents/Input.js';
import { Container } from 'react-bootstrap';
import { Route,Routes } from 'react-router-dom';


function App() {
  
  return (
    <Container>
      <h1>메인페이지입니다.</h1>
      <Routes>
        <Route path="/input" element ={<Input></Input>}></Route>
        <Route path='/board' element = {<Board></Board>}></Route>
      </Routes>

    </Container>
  );
}

export default App;
