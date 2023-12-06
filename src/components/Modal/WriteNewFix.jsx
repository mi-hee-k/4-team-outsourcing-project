import React, {useState} from 'react';
import styled from 'styled-components';
import {auth, db, storage} from '../../shared/firebase';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {addDoc, collection} from 'firebase/firestore';
import {closeAddModal} from '../../redux/modules/modalSlice';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';

function WriteNewFix() {
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState('');
  const [previewFile, setPreviewFile] = useState('');

  const [formState, setFormState] = useState({
    title: '',
    content: '',
    // previewFile: '',
  });

  const {title, content} = formState;
  //공용 함수
  const onChangeHandler = event => {
    const {name, value} = event.target;
    setFormState(prev => ({...prev, [name]: value}));
  };

  //파일 선택
  const handleFileSelect = event => {
    setSelectedFile(event.target.files[0]);
    setPreviewFile(URL.createObjectURL(event.target.files[0]));
  };

  //이미지 파일 업로드
  const handleUpload = async () => {
    //[파일선택] 버튼 안눌러서 선택한 파일 없는경우
    if (selectedFile === '') {
      return '';
    }

    const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
    //const imageRef = ref(storage, `test/${selectedFile.name}`);
    try {
      await uploadBytes(imageRef, selectedFile);
      return await getDownloadURL(imageRef);
    } catch (error) {
      console.log('WriteNewFix.jsx (handleUpload): ', error);
      throw error;
    }
  };

  let formattedDate = new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(new Date());

  return (
    <>
      <form
        onSubmit={async event => {
          event.preventDefault();

          try {
            //1. 이미지 파일 업로드
            const uploadImageUrl = await handleUpload();

            //2. 모달창에 입력된 새로운 데이터
            const newData = {
              title,
              content,
              date: formattedDate,
              image_url: uploadImageUrl,
              //2가지 추가하기....
              //user: currentEmail
              //displayname (닉네임?)
            };

            //3. 파이어스토어에 데이터 저장
            const collectionRef = collection(db, 'fixs');
            await addDoc(collectionRef, newData);

            //4. 모달닫기
            dispatch(closeAddModal());
            toast.success('저장되었습니다.');
          } catch (Error) {
            console.log('[form Error] (WriteNewFix.jsx): ', Error);
          }
        }}
      >
        <ScDiv>
          <h1>어디로 '픽스' 할까요?</h1>
          <div>
            <ScInputTitle
              name="title"
              value={title}
              onChange={onChangeHandler}
              placeholder="제목을 입력해주세요."
              maxLength={30}
            ></ScInputTitle>
          </div>
          <div>
            <ScTextareaContent
              name="content"
              placeholder="내용을 입력해주세요"
              value={content}
              onChange={onChangeHandler}
            ></ScTextareaContent>
          </div>

          <div>
            <p>이미지 미리보기</p>
            <label>
              <img name="previewFile" size="large" src={previewFile} />
            </label>
          </div>

          <div>
            <p>사진선택</p>
            <input type="file" name="selectedFile" id="fileAttach" onChange={handleFileSelect}></input>
          </div>
          <div>
            <p>위치</p>
          </div>
          <ScDivButton>
            <button type="submit">Fix하기</button>
            <button>취소</button>
          </ScDivButton>
        </ScDiv>
      </form>
    </>
  );
}

const ScDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
  & h1 {
    font-size: 30px;
    margin-bottom: 20px;
  }
  & div {
    width: 100%;
    padding-right: 20px;
    padding-left: 30px;
    display: flex;
    gap: 20px;
    align-items: center;
  }
`;

const ScDivButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const ScInputTitle = styled.input`
  width: 100%;
  outline: none;
  font-size: 20px;
  margin-top: 8px;
  margin-bottom: 8px;
  padding-bottom: 10px;
  border: none;
  font-weight: 500;
  border-bottom: 1px solid var(--black);

  &::placeholder {
    color: #bbb;
  }
`;

const ScTextareaContent = styled.textarea`
  min-height: 17vh;
  max-height: 30vh;
  overflow-y: auto;
  box-sizing: content-box;
  outline: none;
  line-height: 1.6em;
  margin-bottom: 20px;
  font-size: 15px;
  word-break: keep-all;

  resize: none;
  width: 100%;
  border: none;
  color: var(--black);
  border-bottom: 1px solid var(--black);
  &::placeholder {
    color: #bbb;
  }
`;

export default WriteNewFix;
