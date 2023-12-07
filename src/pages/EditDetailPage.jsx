import React, {useRef} from 'react';
import styled from 'styled-components';
import {SubButton} from '../components/UI/Button';
import {useState} from 'react';

function EditDetailPage() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [uploadImg, setUploadImg] = useState();
  const [previewImg, setPreviewImg] = useState();
  const fileInput = useRef(null);

  const imgOnclickHandler = e => {
    // setUploadImg(e.target.files[0]);
    // setPreviewImg(fileInput.current.click());
    setPreviewImg(window.URL.createObjectURL(e.target.files[0]));
  };
  console.log('이미지다', previewImg);
  const titleOnchangeHandler = e => {
    setTitle(e.target.value);
  };

  const contentOnchangeHandler = e => {
    setContent(e.target.value);
  };
  console.log('제목이다', title);
  console.log('내용입니다', content);

  return (
    <div>
      <ScContainer>
        <ScMain>
          <ScLabel htmlFor="postImg" type="button">
            <ScImgInput type="file" accept="image/*" id="postImg" onChange={imgOnclickHandler} />
            <ScImg src="" alt="" accept="image/*" />
          </ScLabel>
          <ScTitleBox>
            <ScTitleInput onChange={titleOnchangeHandler} />
          </ScTitleBox>
          <ScContentTextarea onChange={contentOnchangeHandler} />
          <ScMap>지도</ScMap>
          <ScBtnBox>
            <SubButton>수정완료</SubButton>
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
const ScMain = styled.div`
  width: 80vw;
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
