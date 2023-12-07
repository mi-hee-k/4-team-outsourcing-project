import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import PublicHook from './PublicHook';

function PublicModal() {
  const {title, message, btnMsg, btnType, btnMsg2, btnType2} = useSelector(state => state.publicModal);

  const {handleContinueWriting, handleExit} = PublicHook();
  const btnFn = btnType === 'continue' ? handleContinueWriting : null;
  const btnFn2 = btnType2 === 'exit' ? handleExit : null;

  return (
    <>
      <ScDiv>
        <ScDivContainer>
          <ScDivTitleAndContent>
            <h2>{title}</h2>
            <p>{message}</p>
          </ScDivTitleAndContent>
          <ScDivButton>
            {btnMsg && <ScButtonFirst onClick={btnFn}>{btnMsg} </ScButtonFirst>}
            {btnMsg2 && <ScButtonSecond onClick={btnFn2}>{btnMsg2} </ScButtonSecond>}
          </ScDivButton>
        </ScDivContainer>
      </ScDiv>
    </>
  );
}

const ScDiv = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: saturate(180%) blur(8px);
  z-index: 100;
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  border: none;
`;

const ScDivContainer = styled.div`
  width: 400px;
  height: 200px;
  padding: 20px;
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--white);
  border-radius: 8px;
`;

const ScDivTitleAndContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  gap: 10px;
  & h2 {
    font-weight: 600;
    font-size: 19px;
    padding-bottom: 10px;
  }
  & p {
    font-size: 14px;
    white-space: pre-wrap;
    min-height: 30px;
  }
`;

const ScDivButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ScButtonFirst = styled.button`
  width: calc(50% - 5px);
  height: 40px;
  border: 1px solid var(--deep-blue);
  background-color: var(--white);
  color: var(--deep-blue);
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;
const ScButtonSecond = styled.button`
  width: calc(50% - 5px);
  height: 40px;
  background-color: var(--deep-blue);
  background-color: var(--white);
  color: var(--deep-blue);
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

export default PublicModal;
