import React, { useRef, useState } from 'react';
// import Avatar from 'react-avatar';

function ProfileImage() {
  const fileInput = useRef(null);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");

  const handleAvatarClick = () => {
    fileInput.current.click();
  };

  const handleFileInputChange = (event) => {
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
    } else { // 업로드 취소할 시
      setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
      return;
    }

    // 화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <div>
    
      <Avatar
        src={image}
        style={{ margin: '20px' }}
        size={200}
        onClick={handleAvatarClick}
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInput}
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default ProfileImage;