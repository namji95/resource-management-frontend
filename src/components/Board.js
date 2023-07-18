import { React} from "react";
import { useEffect, useState } from 'react';
import { Container } from "react-bootstrap";
import '../css/Card.css'
import { propTypes } from "react-bootstrap/esm/Image";

function Board(props){
    return (
        <Container>
            <p> itx 탑승 시각 : {props.name}</p>    
        </Container>
    )
}

export default Board;