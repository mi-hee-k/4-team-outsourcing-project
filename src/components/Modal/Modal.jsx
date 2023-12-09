import React, {useEffect} from 'react';
import styled from 'styled-components';
import WriteNewFix from './WriteNewFix';
import WriteNewFixTest from './WriteNewFix_test';
import {useDispatch, useSelector} from 'react-redux';
import {showPublicModal} from '../../redux/modules/publicModalSlice';
import PublicModal from './PublicModal';

function Modal() {
  const publicModal = useSelector(state => state.publicModal);
  const dispatch = useDispatch();

  //외부화면 스크롤 방지
  useEffect(() => {
    if (publicModal.isUse) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [publicModal.isUse]);

  //메인모달 외부영역 클릭시 > 공용모달 오픈
  const closeModalOutside = event => {
    if (event.target === event.currentTarget) {
      openPublicModal();
    }
  };

  const openPublicModal = () => {
    dispatch(
      showPublicModal({
        isUse: true,
        title: '😯 정말 나가시겠어요?',
        message: '저장하지 않은 내용은 사라져요.',
        btnMsg: '계속 작성',
        btnType: 'continue',
        btnMsg2: '나가기',
        btnType2: 'exit', // 함수 대신 타입 지정
      }),
    );
  };

  return (
    <>
      {publicModal.isUse && <PublicModal />}

      <ScDiv
        onClick={event => {
          closeModalOutside(event);
        }}
      >
        <ScDivContainer>
          <WriteNewFix />
        </ScDivContainer>
      </ScDiv>
    </>
  );
}

const ScDiv = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: saturate(180%) blur(8px);
  z-index: 1;
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  border: none;
`;

const ScDivContainer = styled.div`
  width: 560px;
  height: auto;
  z-index: 100;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--white);
  border-radius: 12px;
`;

export default Modal;
