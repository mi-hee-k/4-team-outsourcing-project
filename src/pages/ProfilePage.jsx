import React, {useState} from 'react';
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

  const [isEditShown, setIsEditShown] = useState(false);
  const [nickname, setNickname] = useState('');

  // input 변경
  const changeNickName = e => {
    setNickname(e.target.value);
  };

  // 프로필 수정하기
  const handleUpdateProfile = () => {
    setIsEditShown(true);
  };

  // 프로필 수정 취소
  const cancelUpdate = () => {
    setIsEditShown(false);
  };

  // 수정
  const handleEditProfile = async () => {
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
      setIsEditShown(false);
      setNickname('');
      dispatch(updateNickname(nickname));
      console.log(auth.currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScMyPageWrapper>
      <section>
        <h2>마이페이지</h2>
        <ScProfileWrapper>
          <ScImgWrapper>
            <img src={photoURL} alt="" />
          </ScImgWrapper>
          <div>
            <h3>
              <span>{displayName}</span> 님 반갑습니다!
            </h3>
            {isEditShown ? (
              <>
                <div>
                  <input type="text" value={nickname} onChange={changeNickName} />
                </div>
                <ScBtnWrapper>
                  <Button onClick={handleEditProfile}>수정</Button>
                  <Button onClick={cancelUpdate}>취소</Button>
                </ScBtnWrapper>
              </>
            ) : (
              <Button onClick={handleUpdateProfile}>프로필 수정하기</Button>
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
