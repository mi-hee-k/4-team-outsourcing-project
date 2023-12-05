import React, {useState} from 'react';
import Button from '../components/UI/Button';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {auth} from '../shared/firebase';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    nickname: '',
    password: '',
  });

  const changeInputs = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async e => {
    e.preventDefault();
    const defaultPhotoUrl = 'https://picpac.kr/common/img/default_profile.png';
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, inputs.email, inputs.password);
      await updateProfile(userCredential.user, {displayName: inputs.nickname, photoURL: defaultPhotoUrl});
      console.log(userCredential);
    } catch (error) {
      console.log(error.message);
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
        <input type="text" placeholder="이메일" name="email" value={inputs.email} onChange={changeInputs} />
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
