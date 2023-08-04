import React from 'react';
import myImage from './Image/no_image.png'; // 이미지 파일 임포트

function MyComponent() {
  return (
    <div className="image">
      <img src={myImage} style={{ width: '170px', height: 'auto'}}/>
    </div>
  );
}

export default MyComponent;