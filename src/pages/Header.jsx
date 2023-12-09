import React from 'react';
import styled from 'styled-components';
import PinImage from '../asset/pin.png';
import {useNavigate} from 'react-router-dom';
import Button from '../components/UI/Button';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/modules/Auth';
import {getAuth, signOut} from 'firebase/auth';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {displayName, uid, photoURL, email, isLogin} = useSelector(state => state.auth);
  const auth = getAuth();
  //   useEffect(() => {
  //     console.log(isLogin, displayName);
  //   }, []);

  return (
    <>
      <Nav>
        <Left
          onClick={() => {
            navigate('/');
          }}
        >
          <img src={PinImage} alt="" />
          <h1>Let's Fix</h1>
        </Left>

        <Right>
          {isLogin ? (
            <>
              <Button
                onClick={() => {
                  navigate('/profile');
                }}
              >
                {displayName}님의 마이페이지
              </Button>
              <Button
                onClick={() => {
                  dispatch(logout());
                  navigate('/');
                  auth.signOut();
                }}
              >
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  navigate('/register');
                }}
              >
                회원가입
              </Button>
              <Button
                onClick={() => {
                  navigate('/login');
                }}
              >
                로그인
              </Button>
            </>
          )}
        </Right>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  height: 100px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--deep-blue);
  font-size: 40px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  padding: 0px 100px;
`;

const Left = styled.div`
  width: 15vw;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  & img {
    height: 100%;
    width: 100px;
  }
  &:hover {
    cursor: pointer;
    transform: scale(1.02);
    transition: all 0.2s;
    background-color: var(--blue);
  }
`;

const Right = styled.div`
  width: 15vw;
  display: flex;
  justify-content: space-around;
  margin-right: 50px;
`;
