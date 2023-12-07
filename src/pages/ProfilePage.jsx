import React, {useRef, useState} from 'react';
import Header from './Header';
import styled from 'styled-components';
import Button from '../components/UI/Button';
import {useDispatch, useSelector} from 'react-redux';
import {getAuth, updateProfile} from '@firebase/auth';
import {updateNickname} from '../redux/modules/Auth';

const ProfilePage = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.auth);
  const {displayName, photoURL} = userInfo;
  const [nickNameEditShown, setNickNameEditShown] = useState(false);
  const [photoEditShown, setPhotoEditShown] = useState(false);
  const [nickname, setNickname] = useState('');
  const [imgFile, setImgFile] = useState('');
  const imgRef = useRef();

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
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
  };

  // 이미지 수정
  const handleEditPhoto = async () => {
    alert('1');
  };

  // 프로필 수정하기
  const handleUpdateNickname = () => {
    setNickNameEditShown(true);
  };

  // 프로필 수정 취소
  const cancelUpdateNickname = () => {
    setNickNameEditShown(false);
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
      await updateProfile(auth.currentUser, {displayName: nickname});
      setNickNameEditShown(false);
      setNickname('');
      dispatch(updateNickname(nickname));
      console.log(auth.currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScMyPageWrapper>
      <Header />
      <section>
        <h2>마이페이지</h2>
        <ScProfileWrapper>
          <div>
            <ScImgWrapper>
              <img src={imgFile ? imgFile : photoURL} alt="" />
            </ScImgWrapper>
            {photoEditShown ? (
              <div>
                <input type="file" accept="image/*" id="profileImg" onChange={saveImgFile} ref={imgRef} />
                <ScBtnWrapper>
                  <Button onClick={handleEditPhoto}>수정</Button>
                  <Button onClick={cancelUpdatePhoto}>취소</Button>
                </ScBtnWrapper>
              </div>
            ) : (
              <label htmlFor="profileImg" onClick={handleUpdatePhoto}>
                프로필 이미지 변경
              </label>
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
        <div>지도</div>
      </section>
    </ScMyPageWrapper>
  );
};

const ScMyPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  text-align: center;

  nav {
    position: fixed;
    top: 0;
    left: 0;
  }

  h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 50px;
  }

  hr {
    width: 80%;
    background-color: #eee;
    margin-bottom: 50px;
  }

  section {
    width: 80%;
  }

  section:nth-child(2) {
    margin-bottom: 50px;
  }

  input {
    border: 1px solid #868686;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
  }
`;

const ScProfileWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  figure {
    margin-right: 20px;
  }

  label {
    font-weight: bold;
    cursor: pointer;
    color: var(--deep-blue);
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

  img {
    width: 200px;
    height: 200px;
  }
`;

const ScBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  button {
    width: 30%;
  }
`;

export default ProfilePage;
