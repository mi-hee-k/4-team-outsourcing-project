import {CancelButton, SubButton} from '../components/UI/Button';
import {useNavigate, useParams} from 'react-router-dom';
import {auth} from '../shared/firebase';
import styled from 'styled-components';
import React from 'react';
import {useEffect} from 'react';
import {toast} from 'react-toastify';
import {useDispatch} from 'react-redux';
import {__deleteFix, __getFix} from '../redux/modules/DetailSlice';
import {useSelector} from 'react-redux';
import DetailMap from '../components/DetailMap';
import FadeLoader from 'react-spinners/FadeLoader';

function DetailPage() {
  // const [user, setUser] = useState;
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLoading, isError, fix} = useSelector(state => state.fix);

  const navigateEditdetail = () => {
    navigate(`/editdetail/${id}`);
  };

  useEffect(() => {
    dispatch(__getFix(id));
  }, []);

  const user = auth.currentUser;

  const deletePost = async post => {
    const deleteCheck = window.confirm('삭제하시겠습니까?');
    if (deleteCheck) {
      await dispatch(__deleteFix(id));
      toast.success('삭제되었습니다');
      navigate('/');
    } else {
      return;
    }
  };

  if (isLoading) {
    return (
      <ScLoding>
        <FadeLoader color="#3693d6" />
      </ScLoding>
    );
  }

  if (isError) {
    toast.success('오류가 발생했습니다. 다시 시도해주세요');
    navigate('/');
  }

  return (
    <>
      <ScContainer>
        <ScMain>
          <ScTitleBox>
            <ScH1>{fix.title} </ScH1>
          </ScTitleBox>
          <ScImg src={fix.image_url}></ScImg>
          <ScP>{fix.content}</ScP>
          {}
          <DetailMap />
          <ScBtnBox>
            {user ? (
              user.email !== fix.email ? (
                <></>
              ) : (
                <>
                  <SubButton onClick={navigateEditdetail}>수정</SubButton>
                  <CancelButton onClick={() => deletePost()}>삭제</CancelButton>
                </>
              )
            ) : (
              <></>
            )}
          </ScBtnBox>
        </ScMain>
      </ScContainer>
    </>
  );
}

const ScContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 150vh;
`;

const ScMain = styled.div`
  width: 60%;
  height: 150vh;
  border: 2px solid #f6f6f6;
  border-radius: 5px;
`;

const ScImg = styled.img`
  height: 30%;
  width: 100%;
`;

const ScH1 = styled.h1`
  height: max-content;
  margin-left: 30px;
  font-size: 2rem;
  background: none;
  white-space: break-spaces;
  @media only screen and (min-width: 1500px) {
    font-size: 300%;
  }
`;

const ScTitleBox = styled.div`
  height: max-content;
  border-bottom: 2px solid var(--light-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px;
`;

const ScP = styled.p`
  display: flex;
  align-items: center;
  /* margin: 50px 40px 0px 40px; */
  padding: 30px;
  font-size: 18px;
  white-space: break-spaces;
  /* overflow: hidden;
    text-overflow: ellipsis; */
  @media only screen and (min-width: 1500px) {
    font-size: 150%;
  }
`;

const ScBtnBox = styled.div`
  width: 93%;
  height: 70px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin: 30px 50px 0px 0px;
  gap: 10px;
`;

const ScLoding = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default DetailPage;
