import { React} from "react";
import { useEffect, useState } from 'react';
import { Container } from "react-bootstrap";
import '../../css/Car.css';
import { propTypes } from "react-bootstrap/esm/Image";
import axios from "axios";
import { Link } from "react-router-dom";
import Car from "./Car";

export default function View() {
    return (
        <div>
            <h1 align="center">
                
            </h1>
            <button>
            <Link to="/Car" align="center">예약 화면으로 돌아가기</Link>
            </button>
        </div>
    )
}
