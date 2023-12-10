import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {closePublicModal} from '../../redux/modules/publicModalSlice';
import {closeAddModal} from '../../redux/modules/modalSlice';

function PublicHook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleContinueWriting = () => {
    dispatch(closePublicModal());
  };

  const handleExit = () => {
    dispatch(closePublicModal());
    dispatch(closeAddModal()); // 새글작성모달 닫기
    navigate('/');
  };

  return {handleContinueWriting, handleExit};
}

export default PublicHook;
