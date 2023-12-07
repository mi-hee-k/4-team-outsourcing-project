import React from 'react';
import styled from 'styled-components';
import {CancelButton, SubButton} from '../components/UI/Button';
import {useNavigate} from 'react-router-dom';

function DetailPage() {
  // firebase 더미데이터 구축
  // 불러와서 붙여넣기

  const navigate = useNavigate();

  const navegateAddEdetail = () => {
    navigate('/adddetail/:id');
  };

  // 파이어베이스 userPost 데이터 받아오기

  return (
    <ScContainer>
      <ScMain>
        <ScImg></ScImg>
        <ScTitleBox>
          <ScH1> 행궁동 힐릿 스팟(받아온 title) </ScH1>
        </ScTitleBox>
        <ScP>
          흐르는 개천에 커피 한잔 들고 앉아서 쉬기에 좋아요.
          <br />
          <br />
          앞에 적당히 카페들도 있고 조금만 더 걸으면 행궁동이라서 식사하고 산책 겸 걷다가
          <br />
          카페에서 커피한잔 테이크 아웃해서 들고 앉아서 여유즐기면 딱입니다.
        </ScP>
        <ScMap>지도</ScMap>
        <ScBtnBox>
          <SubButton onClick={navegateAddEdetail}>수정</SubButton>
          <CancelButton>삭제</CancelButton>
        </ScBtnBox>
      </ScMain>
    </ScContainer>
  );
}

const ScContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 200vh;
`;

const ScMain = styled.div`
  width: 80vw;
  height: 170vh;
  border: 2px solid #f6f6f6;
`;

const ScImg = styled.img`
  height: 350px;
  width: 80vw;
  background-color: var(--blue);
`;

const ScH1 = styled.p`
  margin-left: 30px;
  font-size: 30px;
  background: none;
`;

const ScTitleBox = styled.div`
  height: 70px;
  border-bottom: 1px lightgray solid;
  display: flex;
  align-items: center;
`;

const ScP = styled.p`
  display: flex;
  align-items: center;
  margin: 50px 40px 0px 40px;
  font-size: 15px;
`;

const ScBtnBox = styled.div`
  width: 75vw;
  height: 70px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 10px;
`;

const ScMap = styled.div`
  margin: 50px auto 0px auto;
  width: 70%;
  height: 230px;
  background-color: var(--light-blue);
`;

export default DetailPage;
