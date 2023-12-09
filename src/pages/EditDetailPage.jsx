import styled from 'styled-components';
import {SubButton} from '../components/UI/Button';
import {useState} from 'react';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {db} from '../shared/firebase';
// import Map from '../components/Map';
import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {storage} from '../shared/firebase';
import {ref} from 'firebase/storage';
import {getDownloadURL, uploadBytes} from 'firebase/storage';
import {toast} from 'react-toastify';
import {useDispatch} from 'react-redux';

function EditDetailPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [uploadImg, setUploadImg] = useState(null);
  const [detailPost, setDetailPost] = useState({});
  const [previewImg, setPreviewImg] = useState(null);
  const {id} = useParams();
  const navigate = useNavigate();
  //  데이터 가져오는 속도가 느림으로 인한 오류해결 필요
  //  수정하지 않으면 넘어갈 수 없게 벨리데이션 체크 필요

  useEffect(() => {
    const getFix = async () => {
      const postRef = doc(db, 'fixs', id);
      const post = await getDoc(postRef);
      const postData = post.data();
      setTitle(postData.title);
      setContent(postData.content);
      setDetailPost(postData);
      setPreviewImg(postData.image_url);
      setUploadImg(postData.image_url);
      console.log('포스트다', postData);
    };
    getFix();
  }, []);

  const imgOnclickHandler = e => {
    setUploadImg(e.target.files[0]);
    setPreviewImg(URL.createObjectURL(e.target.files[0]));
  };

  const titleOnchangeHandler = e => {
    setTitle(e.target.value);
  };

  const contentOnchangeHandler = e => {
    setContent(e.target.value);
  };
  console.log({uploadImg});
  // 수정함수
  const postUpdateHandler = async e => {
    e.preventDefault();

    try {
      const imageRef = ref(storage, `test/${uploadImg.name}`);
      await uploadBytes(imageRef, uploadImg);

      const downloadUrl = await getDownloadURL(imageRef);

      const newPost = {
        title,
        content,
        image_url: downloadUrl,
      };
      console.log('뉴포스트다', newPost);
      const postRef = doc(db, 'fixs', id);
      await updateDoc(postRef, {newPost});
      toast.success('저장되었습니다.');
      navigate(`/detail/${id}`);
    } catch (err) {
      console.log('수정 에러메세지다', err);
    }
  };

  return (
    <div>
      <ScContainer>
        <ScMain onSubmit={postUpdateHandler}>
          <ScLabel htmlFor="postImg" type="button">
            <ScImgInput type="file" accept="image/*" id="postImg" onChange={imgOnclickHandler} />
            <ScImg src={previewImg} alt="" accept="image/*" />
          </ScLabel>
          <ScTitleBox>
            <ScTitleInput autoFocus value={title} onChange={titleOnchangeHandler} />
          </ScTitleBox>
          <ScContentTextarea value={content} onChange={contentOnchangeHandler} />
          {/* <Map>지도</Map> */}
          <ScBtnBox>
            <SubButton type="submit">수정완료</SubButton>
          </ScBtnBox>
        </ScMain>
      </ScContainer>
    </div>
  );
}
const ScContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 200vh;
`;
const ScMain = styled.form`
  width: 60%;
  height: 170vh;
  border: 2px solid #f6f6f6;
`;
const ScImg = styled.img`
  height: 350px;
  width: 100%;
  object-fit: cover;
`;
const ScLabel = styled.label`
  height: 350px;
  width: 100%;
`;
const ScImgInput = styled.input`
  display: none;
`;
const ScTitleInput = styled.input`
  margin-left: 30px;
  font-size: 30px;
  width: 100%;
  background: none;
  outline: none;
  border-width: 0 0 0px;
`;
const ScTitleBox = styled.div`
  height: 70px;
  border-bottom: 1px lightgray solid;
  display: flex;
  align-items: center;
  background: none;
  outline: none;
`;

const ScContentTextarea = styled.textarea`
  display: flex;
  justify-content: center;
  width: 760px;
  height: 300px;
  margin: 50px 40px 0 40px;
  font-size: 15px;
  line-height: 35px;
  resize: none;
  background: none;
  border-width: 0 0 0px;
  outline: none;
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
  margin: 30px auto 0px auto;
  width: 70%;
  height: 230px;
  background-color: var(--blue);
`;
export default EditDetailPage;
