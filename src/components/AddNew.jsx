import React from 'react';
import Btn from '../components/UI/Button';
import {useDispatch, useSelector} from 'react-redux';
import {openAddmodal} from '../redux/modules/modalSlice';
import Modal from './Modal/Modal';

function AddNew() {
  const modal = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const openWriteModal = () => {
    dispatch(openAddmodal());
  };

  return (
    <>
      <Btn onClick={openWriteModal}>Fix 하러가기</Btn>
      {modal.isUseInput && <Modal />}
    </>
  );
}

export default AddNew;
