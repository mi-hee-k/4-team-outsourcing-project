import React from 'react';
import styled from 'styled-components';
import WriteNewFix from './WriteNewFix';

import {useDispatch, useSelector} from 'react-redux';
import {showPublicModal, closePublicModal} from '../../redux/modules/publicModalSlice';
import {closeAddModal} from '../../redux/modules/modalSlice';
import PublicModal from './PublicModal';
function Modal() {
  const publicModal = useSelector(state => state.publicModal);

  console.log('publicModal', publicModal);
  console.log('publicModal22', publicModal.isUse);

  const dispatch = useDispatch();

  //메인모달 외부영역 클릭시 > 공용모달 오픈
  const closeModalOutside = event => {
    if (event.target === event.currentTarget) {
      openPublicModal();
    }
  };

  const openPublicModal = () => {
    const goOut = () => {
      dispatch(closePublicModal());
      dispatch(closeAddModal()); //새글작성모달 닫기
      navigator('/');
    };

    dispatch(
      showPublicModal({
        isUse: true,
        title: '😯 정말 나가시겠어요?',
        message: '저장하지 않은 내용은 사라져요.',
        btnMsg: '계속 작성',
        btnFn: () => dispatch(closePublicModal()),
        btnMsg2: '나가기',
        btnFn2: goOut,
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
          <button onClick={openPublicModal}>닫기</button>
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
`;

export default Modal;
