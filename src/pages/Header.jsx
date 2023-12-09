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
          <ScHomeBtn>
            <img src={PinImage} alt="" />
            <h1>Let's Fix</h1>
          </ScHomeBtn>
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--deep-blue);
  font-size: 40px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  padding: 0px 20px;
`;

const Left = styled.div`
  width: 50%;
  height: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  padding: 0 10px;
`;

const ScHomeBtn = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  cursor: pointer;

  @media only screen and (max-width: 980px) {
    width: 70%;
  }

  img {
    width: 68px;
    height: auto;
    margin-right: 10px;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: all 0.2s;
  }
`;

const Right = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;

  button:last-child {
    width: 20%;
  }
`;
