import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {closePublicModal} from '../../redux/modules/publicModalSlice';
import {closeAddModal} from '../../redux/modules/modalSlice';

function PublicHook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleContinueWriting = () => {
    dispatch(closePublicModal());
    console.log('계속');
  };

  const handleExit = () => {
    console.log('나가기');
    dispatch(closePublicModal());
    dispatch(closeAddModal()); // 새글작성모달 닫기
    navigate('/');
  };

  return {handleContinueWriting, handleExit};
}

export default PublicHook;
