import React, {useState} from 'react';
import Button from '../components/UI/Button';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {auth} from '../shared/firebase';

const Register = () => {
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

  const submitHandler = async e => {
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

  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="이메일" name="email" value={inputs.email} onChange={changeInputs} />
        <input type="text" placeholder="닉네임" name="nickname" value={inputs.nickname} onChange={changeInputs} />
        <input type="password" placeholder="비밀번호" name="password" value={inputs.password} onChange={changeInputs} />
        <Button>회원가입</Button>
      </form>
    </>
  );
};

export default Register;
