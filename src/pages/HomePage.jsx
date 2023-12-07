import React, {useEffect} from 'react';
import Header from './Header';
import styled, {css} from 'styled-components';

import fakedata from '../fakedata.json';
import AddNew from '../components/AddNew';

import {useNavigate} from 'react-router';

export default function Homepage() {
  const navigate = useNavigate();
  const user = localStorage.getItem('uid');

  return (
    <Body>
      <Header />
      <Fixbar>
        <span>최근Fix한곳</span>
        {user ? <AddNew /> : ''}
      </Fixbar>
      <ListWrapper>
        {fakedata.map(item => {
          return (
            <List key={item.id} onClick={() => navigate(`/detail/${item.id}`)}>
              <PhotoWrapper></PhotoWrapper>
              <UserInfo>
                <Avatar>
                  {' '}
                  <img src={item.avatar} alt="아바타이미지" />
                </Avatar>
                <NicknameAndDate>
                  <p>{item.nickname}</p>
                  <time>{item.createdAt}</time>
                </NicknameAndDate>
              </UserInfo>
              <Content>{item.content}</Content>
            </List>
          );
        })}
      </ListWrapper>
    </Body>
  );
}
const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Fixbar = styled.div`
  height: 100px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 50px;
`;

const ListWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  height: 100%;
`;

const PhotoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 100%;
  background-color: white;
  border-radius: 10px;
`;
const List = styled.div`
  display: flex;
  flex-direction: column;

  width: 25vw;
  height: 300px;
  border-radius: 10px;
  margin: 0 10px;
  background-color: lightgray;
  margin: 20px;
  padding: 10px;

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
    transition: all 0.2s;
  }
`;

const UserInfo = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const NicknameAndDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Content = styled.p`
  background-color: gray;
  border-radius: 12px;
  padding: 12px;
  height: 30%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Avatar = styled.figure`
  ${props => {
    switch (props.size) {
      case 'large':
        return css`
          width: 75px;
          height: 75px;
        `;
      default:
        return css`
          width: 50px;
          height: 50px;
        `;
    }
  }}

  border-radius: 50%;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
