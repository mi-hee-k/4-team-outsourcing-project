import styled from 'styled-components';
import {SubButton} from '../components/UI/Button';
import {useState} from 'react';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {db} from '../shared/firebase';
import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {storage} from '../shared/firebase';
import {ref} from 'firebase/storage';
import {getDownloadURL, uploadBytes} from 'firebase/storage';
import {toast} from 'react-toastify';
import {useDispatch} from 'react-redux';
import {CustomOverlayMap, Map, MapMarker} from 'react-kakao-maps-sdk';

function EditDetailPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [uploadImg, setUploadImg] = useState(null);
  const [detailPost, setDetailPost] = useState({});
  const [previewImg, setPreviewImg] = useState(null);
  const [addrInput, setAddrInput] = useState('');
  const [latitude, setLatitude] = useState(''); //위도
  const [longitude, setLongitude] = useState(''); //경도
  const [buildingName, setBuildingName] = useState(''); //빌딩네임
  const {id} = useParams();
  const navigate = useNavigate();
  //  데이터 가져오는 속도가 느림으로 인한 오류해결 필요
  //  수정하지 않으면 넘어갈 수 없게 벨리데이션 체크 필요

  useEffect(() => {
    const getFix = async () => {
      const postRef = doc(db, 'fixs', id);
      const post = await getDoc(postRef);
      const postData = post.data();
      setTitle(postData.title);
      setContent(postData.content);
      setDetailPost(postData);
      setPreviewImg(postData.image_url);
      setUploadImg(postData.image_url);
      setLatitude(postData.latitude);
      setLongitude(postData.longitude);
      setBuildingName(postData.buildingName);
    };
    getFix();
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
              setLatitude(currentPos.Ma);
              setLongitude(currentPos.La);
              // 최종 주소 변수-> 주소 정보를 해당 필드에 넣는다.
              // 선택한 주소로 입력 필드 업데이트

              setAddrInput(addrData.address);
              setBuildingName(addrData.buildingName);
            }
          });
        },
      }).open();
    } else {
      alert('카카오map 로드가 안됨');
    }
  };
  const imgOnclickHandler = e => {
    setUploadImg(e.target.files[0]);
    setPreviewImg(URL.createObjectURL(e.target.files[0]));
  };

  const titleOnchangeHandler = e => {
    setTitle(e.target.value);
  };

  const contentOnchangeHandler = e => {
    setContent(e.target.value);
  };
  // 수정함수
  const postUpdateHandler = async e => {
    e.preventDefault();

    try {
      const imageRef = ref(storage, `test/${uploadImg.name}`);
      await uploadBytes(imageRef, uploadImg);

      const downloadUrl = await getDownloadURL(imageRef);
      // const imgUlr = {image_url: downloadUrl};
      // 사진 수정 안되어도 값 안날라가게 고치기 필요
      const newPost = {
        title,
        content,
        image_url: downloadUrl,
        buildingName,
        latitude,
        longitude,
      };

      const postRef = doc(db, 'fixs', id);
      await updateDoc(postRef, newPost);
      toast.success('저장되었습니다.');
      navigate(`/detail/${id}`);
    } catch (err) {}
  };

  return (
    <div>
      <ScContainer>
        <ScMain onSubmit={postUpdateHandler}>
          <ScTitleBox>
            <ScTitleInput autoFocus value={title} onChange={titleOnchangeHandler} />
          </ScTitleBox>
          <ScLabel htmlFor="postImg" type="button">
            <ScImgInput type="file" accept="image/*" id="postImg" onChange={imgOnclickHandler} />
            <ScImg src={previewImg} alt="" accept="image/*" />
          </ScLabel>
          <ScContentTextarea value={content} onChange={contentOnchangeHandler} />
          {/* <EditMap /> */}
          <div>
            <ScDivMapSearch>
              <div required onClick={searchAddress}>
                <input
                  id="addr"
                  placeholder=" 📍 장소 검색"
                  value={addrInput}
                  onChange={event => setAddrInput(event.target.value)}
                />
                <button type="button">장소 검색</button>
              </div>
              <Map center={{lat: latitude, lng: longitude}} style={{width: '100%', height: '400px'}}>
                <MapMarker
                  position={{lat: latitude, lng: longitude}}
                  image={{
                    src: 'https://velog.velcdn.com/images/jetiiin/post/6eff67e2-349b-4fe4-854f-12d1e384536a/image.png', // 마커이미지의 주소입니다
                    size: {
                      width: 64,
                      height: 69,
                    },
                    options: {
                      offset: {
                        x: 27,
                        y: 69,
                      }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                    },
                  }}
                ></MapMarker>
              </Map>
            </ScDivMapSearch>
          </div>
          <ScBtnBox>
            <SubButton type="submit">수정완료</SubButton>
          </ScBtnBox>
        </ScMain>
      </ScContainer>
    </div>
  );
}
const ScContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 200vh;
`;
const ScMain = styled.form`
  width: 60%;
  height: 170vh;
  border: 2px solid #f6f6f6;
`;
const ScImg = styled.img`
  height: 30%;
  width: 100%;
  object-fit: cover;
`;
const ScLabel = styled.label`
  height: 350px;
  width: 100%;
`;
const ScImgInput = styled.input`
  display: none;
  height: max-content;
`;
const ScTitleInput = styled.input`
  margin-left: 30px;
  font-size: 30px;
  width: 100%;
  background: none;
  outline: none;
  border-width: 0 0 0px;
`;
const ScTitleBox = styled.div`
  height: max-content;
  border-bottom: 1px lightgray solid;
  display: flex;
  align-items: center;
  background: none;
  outline: none;
`;

const ScContentTextarea = styled.textarea`
  display: flex;
  justify-content: center;
  width: 760px;
  height: 300px;
  margin: 50px 40px 0 40px;
  font-size: 15px;
  line-height: 35px;
  resize: none;
  background: none;
  border-width: 0 0 0px;
  outline: none;
`;
const ScBtnBox = styled.div`
  width: 93%;
  height: 70px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin: 30px 50px 0px 0px;
`;

const ScDivMapSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto 0 auto;
  padding-left: 0;
  width: 70%;
  height: 24%;

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

export default EditDetailPage;
