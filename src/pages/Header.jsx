import React, {useEffect} from 'react';
import styled from 'styled-components';
import PinImage from '../asset/pin.png';
import {useNavigate} from 'react-router-dom';
import Button from '../components/UI/Button';
import {useSelector} from 'react-redux';

export default function Header() {
  const navigate = useNavigate();
  const {accessToken, displayName, uid, photoURL, email} = useSelector(state => state.auth);
  const isLogIned = accessToken ? true : false;
  useEffect(() => {
    console.log(displayName);
  }, []);

  return (
    <>
      <Nav>
        <Left>
          <img src={PinImage} alt="" />
          <h1>Let`s Fix</h1>
        </Left>

        <Right>
          {isLogIned ? (
            <>
              <Button
                onClick={() => {
                  navigate('/');
                }}
              >
                {displayName}님의 마이페이지
              </Button>
              <Button>로그아웃</Button>
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
`;

const Left = styled.div`
  width: 30vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  & img {
    height: 30%;
    width: 30%;
  }
`;

const Right = styled.div`
  width: 30vw;
  display: flex;
  justify-content: space-around;
`;
