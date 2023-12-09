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

function DetailPage() {
  // const [user, setUser] = useState;
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLoading, isError, fix} = useSelector(state => state.fix);
  const navegateAddEdetail = () => {
    navigate(`/editdetail/${id}`);
  };
  console.log(fix);
  useEffect(() => {
    dispatch(__getFix(id));
  }, []);

  const user = auth.currentUser;
  console.log({user});

  const deletePost = async post => {
    const deleteCheck = window.confirm('삭제하시겠습니까?');
    if (deleteCheck) {
      dispatch(__deleteFix(id));
      toast.success('삭제되었습니다');
      navigate('/');
    } else {
      return;
    }
  };
  //
  if (isLoading) {
    <h1>Loding..</h1>;
  }

  if (isError) {
    toast.success('오류가 발생했습니다. 다시 시도해주세요');
    navigate('/');
  }

  return (
    <>
      <ScContainer>
        <ScMain>
          <ScImg src={fix.image_url}></ScImg>
          <ScTitleBox>
            <ScH1>{fix.title} </ScH1>
          </ScTitleBox>
          <ScP>{fix.content}</ScP>
          <DetailMap />
          <ScBtnBox>
            {user ? (
              user.email !== fix.email ? (
                <></>
              ) : (
                <>
                  <SubButton onClick={navegateAddEdetail}>수정</SubButton>
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
  height: 200vh;
`;

const ScMain = styled.div`
  width: 60%;
  height: 170vh;
  border: 2px solid #f6f6f6;
`;

const ScImg = styled.img`
  height: 450px;
  width: 100%;
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
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin: 30px 50px 0px 0px;
  gap: 10px;
`;

export default DetailPage;
