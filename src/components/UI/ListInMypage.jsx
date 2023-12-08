import React from 'react';
import {useSelector} from 'react-redux';
import {auth} from '../../shared/firebase';
import styled, {css} from 'styled-components';
import {useNavigate} from 'react-router-dom';
export default function ListInMypage() {
  const navigate = useNavigate();
  const list = useSelector(state => state.fixList);

  console.log('리스트', list);

  const filteredList = list.filter(item => {
    // console.log(item.uid, '유아이디들', auth.currentUser);
    return item.uid == auth.currentUser.uid;
  });
  //   console.log(filteredList, '필털드');
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
                <span>제목:</span>
                {item.title}
                <br /> <span>내용:</span>
                {item.content}
                {/* {item.createdAt.seconds} */}
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
  grid-template-columns: repeat(auto-fill, minmax(25%, auto));
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  gap: 10px;
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

  width: 25vw;
  height: 300px;
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
`;

const NicknameAndDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Content = styled.p`
  background-color: var(--beige);
  border-radius: 12px;
  padding: 12px;
  height: 30%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
