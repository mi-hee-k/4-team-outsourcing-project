import React from 'react';
import styled, {css} from 'styled-components';
import AddNew from '../components/AddNew';
import {useNavigate} from 'react-router';
import {useSelector} from 'react-redux';
import {useReadFirestore} from '../components/UI/CustomHook';

export default function Homepage() {
  const navigate = useNavigate();
  const {isLogin} = useSelector(state => state.auth);
  useReadFirestore();
  const list = useSelector(state => state.fixList);

  return (
    <ScBody>
      <ScFixbar>
        <span>최근 Fix 한 곳</span>
        {isLogin ? <AddNew /> : <></>}
      </ScFixbar>
      <ScListWrapper>
        {list.map(item => {
          return (
            <ScList key={item.id} onClick={() => navigate(`/detail/${item.id}`)}>
              <ScPhotoWrapper>
                <img src={item.image_url} alt="" />
              </ScPhotoWrapper>
              <ScUserInfo>
                <ScAvatar>
                  {' '}
                  <img src={item.photoURL} alt="" />
                </ScAvatar>
                <ScNicknameAndDate>
                  <p>{item.displayName}</p>

                  <time>{item.date}</time>
                </ScNicknameAndDate>
              </ScUserInfo>
              <ScContent>
                <h1>{item.title}</h1>
                <h3>{item.addrInput}</h3>
                <h2>{item.content}</h2>
              </ScContent>
            </ScList>
          );
        })}
      </ScListWrapper>
    </ScBody>
  );
}
const ScBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 70px;
`;

const ScFixbar = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
  & span {
    font-weight: 600;
  }
`;

const ScListWrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(25%, auto));
  width: 100%;

  @media (max-width: 1420px) {
    grid-template-columns: repeat(auto-fill, minmax(30%, auto));
  }

  @media (max-width: 1060px) {
    grid-template-columns: repeat(auto-fill, minmax(40%, auto));
  }

  @media (max-width: 770px) {
    grid-template-columns: repeat(auto-fill, minmax(55%, auto));
  }

  @media (min-width: 1700px) {
    grid-template-columns: repeat(auto-fill, minmax(25%, auto));
  }
`;

const ScPhotoWrapper = styled.div`
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
const ScList = styled.div`
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

const ScUserInfo = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin: 10px auto;
`;

const ScNicknameAndDate = styled.div`
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

const ScContent = styled.div`
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

const ScAvatar = styled.figure`
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
