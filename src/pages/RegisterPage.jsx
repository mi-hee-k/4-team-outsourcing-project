import React, {useState} from 'react';
import Button from '../components/UI/Button';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {auth} from '../shared/firebase';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    nickname: '',
    password: '',
  });

  // input 변경
  const changeInputs = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  // input 비우기
  const clearInputs = () => {
    setInputs({
      email: '',
      nickname: '',
      password: '',
    });
  };

  // 유효성 검사
  const checkInputs = () => {
    // 빈칸
    if (inputs.email.trim().length === 0 || inputs.email.trim().length === 0 || inputs.nickname.trim().length === 0) {
      toast.error('정보를 모두 입력해주세요', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'colored',
      });
      clearInputs();
      return;
    }
    // 닉네임 2~6자 사이
    if (inputs.nickname.length < 2 || inputs.nickname.length > 6) {
      toast.error('닉네임은 2~6자 사이로 만들어주세요', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'colored',
      });
      clearInputs();
      return;
    }
    return true;
  };

  // 오류메시지
  const errorMsg = code => {
    switch (code) {
      case 'auth/user-not-found' || 'auth/wrong-password':
        return '이메일 혹은 비밀번호가 일치하지 않습니다.';
      case 'auth/email-already-in-use':
        return '이미 사용 중인 이메일입니다.';
      case 'auth/weak-password':
        return '비밀번호는 6글자 이상이어야 합니다.';
      case 'auth/network-request-failed':
        return '네트워크 연결에 실패 하였습니다.';
      case 'auth/invalid-email':
        return '잘못된 이메일 형식입니다.';
      case 'auth/internal-error':
        return '잘못된 요청입니다.';
      default:
        return '로그인에 실패 하였습니다.';
    }
  };

  // 회원가입
  const registerUser = async e => {
    e.preventDefault();

    if (!checkInputs()) {
      return;
    }

    const defaultPhotoUrl = 'https://picpac.kr/common/img/default_profile.png';
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, inputs.email, inputs.password);
      await updateProfile(userCredential.user, {displayName: inputs.nickname, photoURL: defaultPhotoUrl});
      console.log(userCredential);
      toast.success('회원가입 성공!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'colored',
      });
      navigate('/login');
    } catch (error) {
      toast.error(errorMsg(error.code), {
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

    setInputs({
      email: '',
      nickname: '',
      password: '',
    });
  };

  const moveToLoginPage = e => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <ScWrapper>
      <ScForm>
        <h1>회원가입</h1>
        <input type="email" placeholder="이메일" name="email" value={inputs.email} onChange={changeInputs} />
        <input type="text" placeholder="닉네임" name="nickname" value={inputs.nickname} onChange={changeInputs} />
        <input type="password" placeholder="비밀번호" name="password" value={inputs.password} onChange={changeInputs} />
        <Button onClick={registerUser}>회원가입</Button>
        <span onClick={moveToLoginPage}>로그인 하러가기</span>
      </ScForm>
    </ScWrapper>
  );
};

const ScWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const ScForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 50%;
  padding: 30px;
  border-radius: 10px;
  background-color: var(--light-blue);

  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 30px;
  }

  input {
    width: 50%;
    border: none;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
  }

  input:nth-child(4) {
    margin-bottom: 20px;
  }

  button {
    width: 50%;
    margin-bottom: 10px;
  }

  span {
    margin-top: 10px;
    cursor: pointer;
    color: var(--deep-blue);
    font-weight: bold;
  }
`;

export default Register;
