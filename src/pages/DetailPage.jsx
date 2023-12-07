import {collection, deleteDoc, getDocs} from 'firebase/firestore';
import {CancelButton, SubButton} from '../components/UI/Button';
import {useNavigate, useParams} from 'react-router-dom';
import {auth} from '../shared/firebase';
import styled from 'styled-components';
import React, {useState} from 'react';
import {db} from '../shared/firebase';
import Map from '../components/Map';
import {useEffect} from 'react';
import {toast} from 'react-toastify';
import {doc, getDoc} from 'firebase/firestore';

function DetailPage() {
  const [detailPost, setDetailPost] = useState({});
  const [allPost, setAllPost] = useState();
  const {id} = useParams();
  const navigate = useNavigate();
  const navegateAddEdetail = () => {
    navigate(`/editdetail/${id}`);
  };

  useEffect(() => {
    const getFix = async () => {
      const postRef = doc(db, 'fixs', id);
      const post = await getDoc(postRef);
      setDetailPost(post.data());
    };
    getFix();
  }, []);

  console.log('포스트다', detailPost);

  useEffect(() => {
    const fetchFixs = async () => {
      const allPost = await getDocs(collection(db, 'fixs'));
      const Posts = allPost.docs.map(doc => doc.data());
      setAllPost(Posts);
    };
    fetchFixs();
  }, []);
  console.log('불러온 데이터 모두다', allPost);

  const deletePost = async post => {
    const deleteCheck = window.confirm('삭제하시겠습니까?');
    if (deleteCheck) {
      await deleteDoc(doc(db, 'fixs', id));
      const deleted = allPost.filter(data => {
        return data.id !== post.id;
      });
      setAllPost(deleted);
      toast.success('삭제되었습니다');
      navigate('/');
    } else {
      return;
    }
  };

  return (
    <ScContainer>
      <ScMain>
        <ScImg src={detailPost.image_url}></ScImg>
        <ScTitleBox>
          <ScH1>{detailPost.title} </ScH1>
        </ScTitleBox>
        <ScP>{detailPost.content}</ScP>
        <Map />
        <ScBtnBox>
          <SubButton onClick={navegateAddEdetail}>수정</SubButton>
          <CancelButton onClick={() => deletePost(detailPost)}>삭제</CancelButton>
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
  width: 75vw;
  height: 70px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 10px;
`;

export default DetailPage;
