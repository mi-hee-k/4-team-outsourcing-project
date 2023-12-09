import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {auth, db, storage} from '../../shared/firebase';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {addDoc, collection} from 'firebase/firestore';
import {closeAddModal} from '../../redux/modules/modalSlice';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import pinImg from '../../asset/pin.png';
import {showPublicModal} from '../../redux/modules/publicModalSlice';
import {addList} from '../../redux/modules/fixList';
import bonobono from '../../asset/bonobono.jpg';
function WriteNewFix() {
  //지도
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [latitude, seLatitude] = useState(''); //위도
  const [longitude, setLongitude] = useState(''); //경도

  // 1) 카카오맵 불러오기
  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 초기 중심 좌표
        level: 3, // 초기 줌 레벨
      };

      const map = new window.kakao.maps.Map(container, options);
      const marker = new window.kakao.maps.Marker();

      // 맵과 마커를 상태에 저장
      setMap(map);
      setMarker(marker);
    });
  }, []);

  const searchAddress = () => {
    // Kakao Maps에서 제공하는 주소 검색 대화상자 열기

    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: function (addrData) {
          const geocoder = new window.kakao.maps.services.Geocoder();

          // 주소로 상세 정보를 검색
          geocoder.addressSearch(addrData.address, function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === window.kakao.maps.services.Status.OK) {
              //첫번째 결과의 값을 활용
              // 해당 주소에 대한 좌표를 받아서
              const currentPos = new window.kakao.maps.LatLng(result[0].y, result[0].x);

              seLatitude(currentPos.Ma);
              setLongitude(currentPos.La);

              // 최종 주소 변수-> 주소 정보를 해당 필드에 넣는다.
              // 선택한 주소로 입력 필드 업데이트
              setAddrInput(addrData.address);

              // 맵을 선택한 위치로 이동하고 마커 표시
              map.panTo(currentPos);
              marker.setMap(null);
              // 마커를 결과값으로 받은 위치로 옮긴다.
              marker.setPosition(currentPos);
              marker.setMap(map);
            }
          });
        },
      }).open();
    } else {
      alert('카카오map 로드가 안됨');
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState('');
  const [previewFile, setPreviewFile] = useState('');

  const {email, displayName, uid, photoURL} = auth.currentUser;
  const [addrInput, setAddrInput] = useState('');
  const [formState, setFormState] = useState({
    title: '',
    content: '',
  });

  const {title, content} = formState;
  //공용 함수
  const onChangeHandler = event => {
    const {name, value} = event.target;
    setFormState(prev => ({...prev, [name]: value}));
  };

  //파일 삭제
  const handleFileDelete = event => {
    setPreviewFile('');
    return;
  };

  //파일 선택
  const handleFileSelect = event => {
    setSelectedFile(event.target.files[0]);
    setPreviewFile(URL.createObjectURL(event.target.files[0]));
  };

  //이미지 파일 업로드
  const handleUpload = async () => {
    //[파일선택] 버튼 안눌러서 선택한 파일 없는경우
    if (selectedFile === '') {
      return '';
    }

    const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
    //const imageRef = ref(storage, `${userUid}/${selectedFile.name}`);
    try {
      await uploadBytes(imageRef, selectedFile);
      return await getDownloadURL(imageRef);
    } catch (error) {
      console.log('WriteNewFix.jsx (handleUpload): ', error);
      throw error;
    }
  };

  let formattedDate = new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(new Date());

  let cancelBtn = () => {
    dispatch(
      showPublicModal({
        isUse: true,
        title: '😯 정말 나가시겠어요?',
        message: '저장하지 않은 내용은 사라져요.',
        btnMsg: '계속 작성',
        btnType: 'continue',
        btnMsg2: '나가기',
        btnType2: 'exit', // 함수 대신 타입 지정
      }),
    );

    //dispatch(closeAddModal()); // 새글작성모달 닫기
    navigate('/');
  };

  const formOnSubmit = async event => {
    {
      event.preventDefault();

      try {
        //1. 이미지 파일 업로드
        const uploadImageUrl = await handleUpload();

        //2. 모달창에 입력된 새로운 데이터
        const newData = {
          title,
          content,
          date: formattedDate,
          createdAt: new Date(),
          image_url: uploadImageUrl ? uploadImageUrl : bonobono,
          uid,
          displayName,
          email,
          photoURL: photoURL ? photoURL : pinImg,
          addrInput,
          latitude,
          longitude,
        };

        //3. 파이어스토어에 데이터 저장
        const collectionRef = collection(db, 'fixs');
        const res = await addDoc(collectionRef, newData);
        console.log(res.id);
        //4. 모달닫기
        dispatch(addList({...newData, id: res.id}));
        dispatch(closeAddModal());
        toast.success('저장되었습니다.');
      } catch (Error) {
        console.log('[form Error] (WriteNewFix.jsx): ', Error);
      }
    }
  };

  return (
    <>
      <form onSubmit={formOnSubmit}>
        <ScDiv>
          <h1>어디로 '픽스' 할까요?</h1>
          <div>
            <ScInputTitle
              name="title"
              value={title}
              onChange={onChangeHandler}
              placeholder=" 제목을 입력해주세요."
              maxLength={30}
            ></ScInputTitle>
          </div>
          <div>
            <ScTextareaContent
              name="content"
              placeholder=" 내용을 입력해주세요"
              value={content}
              onChange={onChangeHandler}
            ></ScTextareaContent>
          </div>
          {!previewFile && (
            <ScDivFileUpload>
              <input type="file" name="selectedFile" id="fileAttach" onChange={handleFileSelect}></input>
              <label htmlFor="fileAttach">사진 선택</label>
            </ScDivFileUpload>
          )}
          {previewFile && (
            <>
              <ScDivPreview>
                <img name="previewFile" size="large" src={previewFile} />

                <ScButtonDelete type="button" id="fileDelete" onClick={handleFileDelete}></ScButtonDelete>
                <label htmlFor="fileDelete">사진 삭제</label>
              </ScDivPreview>
            </>
          )}

          <ScDivMapSearch>
            <div onClick={searchAddress}>
              <input
                id="addr"
                placeholder=" 📍 장소 검색"
                value={addrInput}
                onChange={event => setAddrInput(event.target.value)}
              />
              <button type="button">장소 검색</button>
            </div>

            <div id="map" style={{width: '100%', height: '250px'}}></div>
          </ScDivMapSearch>

          <ScDivButton>
            <ScButtonFix type="submit">Fix하기</ScButtonFix>
            <ScButtonFix type="button" onClick={cancelBtn}>
              취소
            </ScButtonFix>
          </ScDivButton>
        </ScDiv>
      </form>
    </>
  );
}

const ScBody = styled.body`
  background-color: var(--light-blue);
`;

const ScDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 7px;
  margin: 20px auto;

  & h1 {
    font-size: 25px;
    margin: 15px auto;
    text-align: center;
    font-weight: 600;
  }
  & div {
    width: 100%;
    padding-right: 20px;
    padding-left: 30px;

    display: flex;
    gap: 20px;
    align-items: center;
  }

  & img {
    object-fit: cover;
    width: 200px;
    height: 150px;
  }
`;

const ScImageLogo = styled.image`
  z-index: 999;
  width: 100px;
  height: 100px;
`;

const ScDivMapSearch = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin: 0;
  padding-left: 0;

  & div {
    padding: 0;
  }

  & button {
    display: none;
  }
  & input {
    width: 100%;
    border: 1px solid var(--deep-blue);
    border-radius: 8px;
    cursor: pointer;
    height: 30px;
    &:hover {
      border: 1px solid var(--deep-blue);
      box-shadow: rgba(57, 167, 255, 0.4) 0px 0px 0px 3px;
    }
  }
`;

const ScDivMapShow = styled.div`
  width: 100%;
  height: 250px;
`;

const ScDivFileUpload = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  padding-left: 10px;
  & input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  & label {
    border: 1px solid var(--deep-blue);
    background-color: #fff;
    color: var(--deep-blue);
    border-radius: 8px;
    padding: 6px 14px;
    font-weight: 500;
    font-size: 14px;
    outline: none;
    cursor: pointer;
    &:hover {
      border: 1px solid var(--deep-blue);
      box-shadow: rgba(57, 167, 255, 0.4) 0px 0px 0px 3px;
    }
  }
`;

const ScDivButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ScButtonDelete = styled.button`
  display: none;
`;

const ScDivPreview = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  & label {
    border: 1px solid var(--deep-blue);
    background-color: #fff;
    color: var(--deep-blue);
    border-radius: 8px;
    padding: 6px 14px;
    font-weight: 500;
    font-size: 14px;
    outline: none;
    cursor: pointer;
    &:hover {
      border: 1px solid var(--deep-blue);
      box-shadow: rgba(57, 167, 255, 0.4) 0px 0px 0px 3px;
    }
  }
`;

const ScInputTitle = styled.input`
  width: 100%;
  outline: none;
  font-size: 19px;
  margin-top: 8px;
  margin-bottom: 8px;
  //padding-bottom: 10px;
  border: none;
  font-weight: 500;
  border: 1px solid var(--deep-blue);
  border-radius: 8px;
  //background-color: var(--light-blue);
  //padding: 20px auto;
  padding-left: 10px;
  &::placeholder {
    color: #bbb;
  }
`;

const ScTextareaContent = styled.textarea`
  min-height: 14vh;
  max-height: 30vh;
  overflow-y: auto;
  box-sizing: content-box;
  outline: none;
  line-height: 1.6em;
  margin-bottom: 20px;
  font-size: 15px;
  word-break: keep-all;
  border: none;
  resize: none;
  width: 100%;
  padding-top: 10px;
  color: var(--black);
  //background-color: var(--light-blue);
  border: 1px solid var(--deep-blue);
  border-radius: 8px;
  padding-left: 13px;
  &::placeholder {
    color: #bbb;
  }
`;

const ScButtonFix = styled.button`
  width: 20%;
  height: 34px;
  margin-top: 10px;
  font-weight: 600;
  border-radius: 8px;
  font-size: 15px;
  background-color: var(--deep-blue);
  color: white;

  &:hover {
    border: 1px solid var(--deep-blue);
    box-shadow: rgb(57, 167, 255, 0.4) 0px 0px 0px 3px;
    cursor: pointer;
  }
  border: none;
`;

export default WriteNewFix;
