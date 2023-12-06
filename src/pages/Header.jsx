import React from 'react';
import styled from 'styled-components';
import PinImage from '../asset/pin.png';
import {useNavigate} from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  return (
    <>
      <Nav>
        <Left>
          <img src={PinImage} alt="" />
          <h1>Let`s Fix</h1>
        </Left>

        <Right>
          <div
            onclick={() => {
              navigate('/');
            }}
          >
            마이페이지
          </div>
          <span>로그아웃</span>
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
