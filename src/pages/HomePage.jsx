import React, {useEffect, useState} from 'react';
import Header from './Header';
import styled, {css} from 'styled-components';
import AddNew from '../components/AddNew';
import {useNavigate} from 'react-router';
import {db} from '../shared/firebase';
import {collection, getDocs} from '@firebase/firestore';
import {getApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';

const firebaseApp = getApp();

export default function Homepage() {
  const navigate = useNavigate();
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    const dataReading = async () => {
      const querySnapshot = await getDocs(collection(db, 'fixs'));
      let dataArr = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        // console.log(data, '이게 데이타 ');
        // console.log(doc.id, ' 이게 독 아이디');
        dataArr.push({...data, id: doc.id});
      });

      setDocs(dataArr);
    };

    dataReading();

    // console.log(storage, '이게 스토리지 어레이');
  }, []);
  const {content, date, id, image_url, title} = docs;
  // 가운데 정렬 타이틀 하고 css다듬고 아이디 빼고 지도 하기 아웃렛 하기
  return (
    <Body>
      <Fixbar>
        <span>최근Fix한곳</span>
        <AddNew isLoggedIn={true} />
      </Fixbar>
      <ListWrapper>
        {docs.map(item => {
          return (
            <List key={item.id} onClick={() => navigate(`/detail/${item.id}`)}>
              <PhotoWrapper>
                <img src={item.image_url} alt="" />
              </PhotoWrapper>
              <UserInfo>
                <Avatar>
                  {' '}
                  <img src="메롱" alt="" />
                </Avatar>
                <NicknameAndDate>
                  <p>{item.title}</p>
                  <time>{item.date}</time>
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
  font-size: 30px;
`;

const ListWrapper = styled.div`
  display: flex;
  justify-content: center;
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
// :root {
//   --deep-blue: #39a7ff;
//   --blue: #87c4ff;
//   --light-blue: #e0f4ff;
//   --beige: #ffeed9;
//   --black: #000;
//   --white: #fff;
// }
