import React, {useState} from 'react';
import Button from '../components/UI/Button';
import {signInWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {auth} from '../shared/firebase';

const Login = () => {
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

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, inputs.email, inputs.password);
      console.log(userCredential.user);
    } catch (error) {
      console.log(error.message);
    }

    setInputs({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="이메일" name="email" value={inputs.email} onChange={changeInputs} />
        <input type="password" placeholder="비밀번호" name="password" value={inputs.password} onChange={changeInputs} />
        <Button>로그인</Button>
      </form>
    </>
  );
};

export default Login;
