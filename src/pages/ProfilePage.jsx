import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import Button from '../components/UI/Button';
import {useDispatch, useSelector} from 'react-redux';
import {getAuth, updateProfile} from '@firebase/auth';
import {updateNickname, updatePhoto} from '../redux/modules/Auth';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {db, storage} from '../shared/firebase';
import MapComponent from '../components/MapComponent';
import {collection, getDocs, setDoc, doc} from '@firebase/firestore';
import {setList} from '../redux/modules/fixList';
import {toast} from 'react-toastify';

const ProfilePage = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.auth);
  const {displayName, photoURL} = userInfo;
  const [nickNameEditShown, setNickNameEditShown] = useState(false);
  const [photoEditShown, setPhotoEditShown] = useState(false);
  const [nickname, setNickname] = useState(displayName);
  const [imgFile, setImgFile] = useState('');
  const [previewImage, setPreviewImage] = useState(photoURL);
  const imgRef = useRef();

  const list = useSelector(state => state.fixList);

  useEffect(() => {
    dataReading();
  }, [dispatch]);

  useEffect(() => {
    updatePhotoAndNickname();
  }, [displayName, photoURL]);

  // 데이터 읽어오기 (파이어베이스)
  const dataReading = async () => {
    const querySnapshot = await getDocs(collection(db, 'fixs'));
    let dataArr = [];
    querySnapshot.forEach(doc => {
      const data = doc.data();
      dataArr.push({...data, id: doc.id});
      dataArr = dataArr.sort((a, b) => b.createdAt - a.createdAt);
    });
    dispatch(setList(dataArr));
  };

  const filteredList = list.filter(item => {
    return item.uid == auth.currentUser.uid;
  });

  // 프로필 변경 후 바로 적용
  const updatePhotoAndNickname = () => {
    try {
      filteredList.map(async item => {
        await setDoc(doc(db, 'fixs', `${item.id}`), {
          ...item,
          displayName,
          photoURL,
        });
      });
    } catch (error) {
      toast.error('수정에 실패했습니다', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  // map에 정보 전달
  const coordinates = filteredList.map(item => {
    return {
      id: item.id,
      title: item.title,
      lat: item.latitude,
      lng: item.longitude,
      isOpen: false,
      image: item.image_url,
    };
  });

  // 이미지 저장
  const saveImgFile = e => {
    setImgFile(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  // input 변경
  const changeNickName = e => {
    setNickname(e.target.value);
  };

  // 이미지 수정하기
  const handleUpdatePhoto = () => {
    setPhotoEditShown(true);
  };

  // 이미지 수정취소
  const cancelUpdatePhoto = () => {
    setPhotoEditShown(false);
    setImgFile('');
    setPreviewImage(photoURL);
  };

  // 이미지 수정(업로드)
  const handleEditPhoto = async () => {
    try {
      const storageRef = ref(storage, `${auth.currentUser.uid}/profile`);
      await uploadBytes(storageRef, imgFile);
      const downloadURL = await getDownloadURL(storageRef);
      await updateProfile(auth.currentUser, {photoURL: downloadURL});
      dispatch(updatePhoto(downloadURL));
      setPhotoEditShown(false);
      toast.success('수정되었습니다');
    } catch (error) {
      toast.error('수정에 실패했습니다', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  // 프로필 수정하기
  const handleUpdateNickname = () => {
    setNickNameEditShown(true);
  };

  // 프로필 수정 취소
  const cancelUpdateNickname = () => {
    setNickNameEditShown(false);
    setNickname(displayName);
  };

  // 프로필 수정
  const handleEditNickname = async () => {
    if (nickname.trim().length < 1) {
      alert('내용을 입력해주세요');
      return;
    }

    if (nickname.trim().length < 2 || nickname.trim().length > 6) {
      alert('닉네임은 2~4글자 사이로 해주세요');
      return;
    }
    try {
      // firebase 저장
      await updateProfile(auth.currentUser, {displayName: nickname});
      setNickNameEditShown(false);
      setNickname('');
      // redux에 업데이트
      dispatch(updateNickname(nickname));

      // toast.success('수정되었습니다');
    } catch (error) {
      toast.error('수정에 실패했습니다', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  return (
    <ScMyPageWrapper>
      <section>
        <h2>마이페이지</h2>
        <ScProfileWrapper>
          <div>
            <label htmlFor="profileImg" onClick={handleUpdatePhoto}>
              <input
                type="file"
                accept="image/*"
                id="profileImg"
                style={{display: 'none'}}
                onChange={saveImgFile}
                ref={imgRef}
              />
              <ScImgWrapper>
                <img src={previewImage} alt="" />
              </ScImgWrapper>
            </label>

            {photoEditShown ? (
              <div>
                <ScBtnWrapper>
                  <Button onClick={handleEditPhoto}>수정</Button>
                  <Button onClick={cancelUpdatePhoto}>취소</Button>
                </ScBtnWrapper>
              </div>
            ) : (
              <ScLabel onClick={handleUpdatePhoto}>프로필 이미지 변경</ScLabel>
            )}
          </div>
          <div>
            <h3>
              <span>{displayName}</span> 님 반갑습니다!
            </h3>
            {nickNameEditShown ? (
              <>
                <div>
                  <input type="text" value={nickname} onChange={changeNickName} />
                </div>
                <ScBtnWrapper>
                  <Button onClick={handleEditNickname}>수정</Button>
                  <Button onClick={cancelUpdateNickname}>취소</Button>
                </ScBtnWrapper>
              </>
            ) : (
              <Button onClick={handleUpdateNickname}>프로필 수정하기</Button>
            )}
          </div>
        </ScProfileWrapper>
      </section>
      <hr />
      <section>
        <h2>내 Fix보기</h2>
      </section>
      <MapComponent coordinates={coordinates} />
    </ScMyPageWrapper>
  );
};

const ScMyPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 50px 0;
  text-align: center;

  h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 50px;
  }

  hr {
    width: 80%;
    background-color: #eee;
    margin-top: 50px;
    margin-bottom: 50px;
  }

  section {
    width: 80%;
  }

  input {
    border: 1px solid #868686;
    border-radius: 10px;
    padding: 10px;
  }
`;

const ScProfileWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  figure {
    margin-right: 20px;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 30px;
  }

  h3 span {
    color: var(--deep-blue);
    font-weight: bold;
  }
`;

const ScImgWrapper = styled.figure`
  border: 1px solid black;
  border-radius: 50%;
  overflow: hidden;
  width: 200px;
  height: 200px;

  cursor: pointer;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const ScLabel = styled.label`
  display: inline-block;
  font-weight: bold;
  cursor: pointer;
  color: var(--deep-blue);
  margin-top: 20px;
`;

const ScBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 10px;

  button {
    width: 30%;
  }
`;

export default ProfilePage;
