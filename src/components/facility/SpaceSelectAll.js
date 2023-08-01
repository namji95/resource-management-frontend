import { useState,useEffect } from "react";
import axios from "axios";
import {Table} from "react-bootstrap";
import SpaceSelectAllStyle from "./css/SpaceSelectAll.module.css";
import SpaceModifyModal from "./SpaceModifyModal";

function SpaceSelectAll(props) {

    const [spaceObj, setSpaceObj] = useState([]);
    const [updateModal, setUpdateModal] = useState(false);
    const [selectSpace, setSelectSpace] = useState(null);

    const openModal = () => {
      setUpdateModal(updateModal => !updateModal);
    }

    const handleInfoClick = (space) => {
      setSelectSpace(space);
      setUpdateModal(true);
    }

    const closeModifyModal = () => {
      setUpdateModal(false);
    }

    useEffect(() => {
        axios
          .get("http://localhost:8080/api/space")
          .then((response) => {
            console.log(response.data);
            setSpaceObj(response.data.spaceList);
          })
          .catch((error) => {
            console.error("기기 정보를 가져오는데 실패했습니다.", error);
          });
      }, []);

      const handleCheckboxChange = (index) => {
        const updateSpaceObj = [...spaceObj];
        updateSpaceObj[index].checked = !updateSpaceObj[index].checked;
        setSpaceObj(updateSpaceObj);
      }

      return (
        <div>
            <Table className={SpaceSelectAllStyle.resourceListTable}>
                <div className={SpaceSelectAllStyle.resourceTable}>
                    <thead>
                      <tr>
                        <th className={SpaceSelectAllStyle.check}><input type="checkbox" /></th>
                        <th className={SpaceSelectAllStyle.name}>공간자원명</th>
                        <th className={SpaceSelectAllStyle.number}>공간자원 수용인원</th>
                        <th className={SpaceSelectAllStyle.year}>공간자원 설명</th>
                        <th className={SpaceSelectAllStyle.explain}>공간자원 이미지</th>
                      </tr>
                    </thead>
                    <tbody>
                        {spaceObj.map((space, index) => (
                            <tr key={index} onClick={() => handleInfoClick(space)}>
                               <td className={SpaceSelectAllStyle.check}>
                                <input type="checkbox"
                                checked={space.checked || false}
                                onChange={() => handleCheckboxChange(index)} 
                                /></td>
                               <td className={SpaceSelectAllStyle.name} onClick={openModal}>{space.spcName}</td>
                               <td className={SpaceSelectAllStyle.number} onClick={openModal}>{space.spcCap}</td>
                               <td className={SpaceSelectAllStyle.explain} onClick={openModal}>{space.spcExplain}</td>
                               <td><img src={space.spcImage} className={SpaceSelectAllStyle.image} onClick={openModal}></img></td>
                            </tr> 
                        ))}
                        {updateModal && (
                          <SpaceModifyModal
                          // 모달창 열림 상태일 때 CarModifyModal 컴포넌트 렌더링
                          updateModal={updateModal}
                          setUpdateModal={setUpdateModal}
                          selectSpace={selectSpace}
                          setSelectSpace={setSelectSpace}
                          closeModifyModal={closeModifyModal}
                          //setSelectCar 함수를 CarModifyModal 컴포넌트로 전달
                          // 선택한 자원 정보를 CarModifyModal 컴포넌트로 전달
                          />
                        )}
                    </tbody>
                </div>
            </Table>
        </div>
      );
    }

export default SpaceSelectAll;