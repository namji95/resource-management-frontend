import React, { useState } from 'react';
import axios from 'axios';
import { LegendToggleSharp } from '@mui/icons-material';

export default function Test() {
    // const [testData1, setTestData1] = useState("");
    // const [testData2, setTestData2] = useState("");
    // const [testData3, setTestData3] = useState("");
    const [image, setImage] = useState(null);

    let data = {
        testData1 : '정보1',
        testData2 : '정보2',
        testData3 : '정보3',
    }

    const onChangeImageInput = e => {
        setImage(e.target.files[0]);
        console.log(e.target.files)
        console.log(image)
    };

    const formData = new FormData();

    formData.append("image", image);
    formData.append("data", new Blob([JSON.stringify(data)], {
      type: "application/json"
  }));




    return(
        <React.Fragment>
            <div>
                <input type="file" accept="image/jpg,image/png,image/jpeg,image/gif"  multiple onChange={onChangeImageInput}/>
                <button onClick={() => {
                    console.log(formData)
                    axios.post('http://localhost:8080/api/test', formData, {
                        headers: {'Content-Type': 'multipart/form-data', charset: 'utf-8'},
                    })
                    .then((result) => {
                        data = result.data; 
                        console.log(data)
                        alert("전송 완료")
                    })
                    .catch((error) => {
                        console.log('요청실패');
                        console.log(error);
                        alert("전송 실패")
                    })
                }}>전송하기</button>

            </div>
        </React.Fragment>
    )
}