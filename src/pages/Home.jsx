import React from 'react';
import Header from './Header';
import styled from 'styled-components';
import Button from '../components/UI/Button';
import fakedata from '../fakedata.json';

export default function Home() {
  //   createdAt
  // nickname
  // avatar
  // content
  // writedTo
  // id

  return (
    <Body>
      <Header />
      <Fixbar>
        <span>최근Fix한곳</span>
        <Button>Fix하러가기</Button>
      </Fixbar>
      <ListWrapper>
        {fakedata.map(item => {
          return (
            <>
              <List key={item.id}>
                {item.createdAt}
                {item.nickname}
                {item.avatar}
                {item.content}
              </List>
            </>
          );
        })}
      </ListWrapper>
    </Body>
  );
}
const Body = styled.body`
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

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 25vw;
  height: 300px;
  border-radius: 10px;
  margin: 0 10px;
  background-color: lightgray;
  margin: 20px;
  padding: 10px;
`;
