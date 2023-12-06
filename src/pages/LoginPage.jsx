import React, {useState} from 'react';
import Button from '../components/UI/Button';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../shared/firebase';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const changeInputs = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const loginEmail = async e => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, inputs.email, inputs.password);
      console.log(userCredential.user);
      toast.success('로그인 성공!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }

    setInputs({
      email: '',
      password: '',
    });
  };

  const loginGoogle = e => {
    e.preventDefault();
  };

  const moveToRegisterPage = e => {
    e.preventDefault();
    navigate('/register');
  };

  return (
    <ScWrapper>
      <ScForm>
        <h1>로그인</h1>
        <input type="text" placeholder="이메일" name="email" value={inputs.email} onChange={changeInputs} />
        <input type="password" placeholder="비밀번호" name="password" value={inputs.password} onChange={changeInputs} />
        <Button onClick={loginEmail}>로그인</Button>
        <Button onClick={loginGoogle}>구글로 로그인</Button>
        <span onClick={moveToRegisterPage}>회원가입 하러가기</span>
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

  input:nth-child(3) {
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

export default Login;
