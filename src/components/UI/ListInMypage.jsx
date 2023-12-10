import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {auth, db} from '../../shared/firebase';
import styled, {css} from 'styled-components';
import {useNavigate} from 'react-router';

import {useDispatch} from 'react-redux';
import {useReadFirestore} from './CustomHook';

export default function ListInMypage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const list = useSelector(state => state.fixList);
  useReadFirestore();
  const filteredList = list.filter(item => {
    // console.log(item.uid, '유아이디들', auth.currentUser);
    return item.uid == auth.currentUser.uid;
  });

  return (
    <>
      <ListWrapper>
        {filteredList.map(item => {
          return (
            <List key={item.id} onClick={() => navigate(`/detail/${item.id}`)}>
              <PhotoWrapper>
                <img src={item.image_url} alt="" />
              </PhotoWrapper>
              <UserInfo>
                <Avatar>
                  {' '}
                  <img src={item.photoURL} alt="" />
                </Avatar>
                <NicknameAndDate>
                  <p>{item.displayName}</p>

                  <time>{item.date}</time>
                </NicknameAndDate>
              </UserInfo>
              <Content>
                <h1>{item.title}</h1>
                <h3>{item.addrInput}</h3>
                <h2>{item.content}</h2>
              </Content>
            </List>
          );
        })}
      </ListWrapper>
    </>
  );
}

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 80%;
  height: 100%;
  gap: 10px;
  text-align: start;
`;

const PhotoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 100%;
  background-color: white;
  border-radius: 10px;

  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const List = styled.div`
  display: flex;
  flex-direction: column;

  width: 300px;
  height: 400px;
  border-radius: 10px;
  margin: 0 10px;
  background-color: var(--light-blue);
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
  margin: 10px auto;
`;

const NicknameAndDate = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 3px;
  gap: 6px;
  & p {
    font-size: 20px;
  }
  & time {
    font-size: 12px;
    color: gray;
  }
`;

const Content = styled.div`
  background-color: var(--beige);
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 10px;
  height: 30%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  gap: 5px;
  font-size: 10px;
  & h1 {
    font-size: 20px;
    border-bottom: 1px solid gray;
    padding-bottom: 5px;
  }
  & h2 {
    font-size: 15px;

    padding-bottom: 5px;
    height: 40%;
  }
  & h3 {
    font-size: 10px;
    color: gray;
  }
`;

const Avatar = styled.figure`
  background-color: white;
  ${props => {
    switch (props.size) {
      case 'large':
        return css`
          width: 75px;
          height: 75px;
        `;
      default:
        return css`
          width: 55px;
          height: 55px;
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
