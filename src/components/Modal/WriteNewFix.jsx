import React, {useState} from 'react';
import styled from 'styled-components';
import {auth, db, storage} from '../../shared/firebase';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {addDoc, collection} from 'firebase/firestore';
import {closeAddModal} from '../../redux/modules/modalSlice';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import pinImg from '../../asset/pin.png';
import {showPublicModal} from '../../redux/modules/publicModalSlice';
function WriteNewFix() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState('');
  const [previewFile, setPreviewFile] = useState('');

  const {email, displayName, uid} = auth.currentUser;

  const [formState, setFormState] = useState({
    title: '',
    content: '',
  });

  const {title, content} = formState;
  //공용 함수
  const onChangeHandler = event => {
    const {name, value} = event.target;
    setFormState(prev => ({...prev, [name]: value}));
  };

  //파일 삭제
  const handleFileDelete = event => {
    setPreviewFile('');
    return;
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
    //const imageRef = ref(storage, `${userUid}/${selectedFile.name}`);
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

  let cancleBtn = () => {
    dispatch(
      showPublicModal({
        isUse: true,
        title: '😯 정말 나가시겠어요?',
        message: '저장하지 않은 내용은 사라져요.',
        btnMsg: '계속 작성',
        btnType: 'continue',
        btnMsg2: '나가기',
        btnType2: 'exit', // 함수 대신 타입 지정
      }),
    );

    //dispatch(closeAddModal()); // 새글작성모달 닫기
    navigate('/');
  };

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
              uid,
              displayName,
              email,
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
          <div>
            <h1>어디로 '픽스' 할까요?</h1>
          </div>
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

          <ScDivFileUpload>
            <input type="file" name="selectedFile" id="fileAttach" onChange={handleFileSelect}></input>
            <label htmlFor="fileAttach">사진 선택</label>

            <ScButtonDelete type="button" id="fileDelete" onClick={handleFileDelete}></ScButtonDelete>
            <label htmlFor="fileDelete">사진 삭제</label>
          </ScDivFileUpload>

          {previewFile ? (
            <ScDivPreview>
              <label>
                <img name="previewFile" size="large" src={previewFile} />
              </label>
            </ScDivPreview>
          ) : (
            <></>
          )}

          <div>
            <p>위치</p>
          </div>
          <ScDivButton>
            <ScButtonFix type="submit">Fix하기</ScButtonFix>
            <ScButtonFix type="button" onClick={cancleBtn}>
              취소
            </ScButtonFix>
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
  gap: 7px;
  margin: 20px auto;

  & h1 {
    font-size: 30px;
    margin-bottom: 20px;
    text-align: center;
  }
  & div {
    width: 100%;
    padding-right: 20px;
    padding-left: 30px;

    display: flex;
    gap: 20px;
    align-items: center;
  }

  & img {
    object-fit: cover;
    width: 400px;
    height: 300px;
  }
`;

const ScImageLogo = styled.image`
  height: 30%;
  width: 30%;
  z-index: 100;
`;

const ScDivFileUpload = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  padding-left: 10px;
  & input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  & label {
    border: 1px solid var(--deep-blue);
    background-color: #fff;
    color: var(--deep-blue);
    border-radius: 8px;
    padding: 6px 14px;
    font-weight: 500;
    font-size: 14px;
    outline: none;
  }
`;

const ScDivButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ScButtonDelete = styled.button`
  display: none;
`;

const ScDivPreview = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ScInputTitle = styled.input`
  width: 100%;
  outline: none;
  font-size: 20px;
  margin-top: 8px;
  margin-bottom: 8px;
  //padding-bottom: 10px;
  border: none;
  font-weight: 500;
  //border: 1px solid var(--black);
  background-color: var(--light-blue);
  &::placeholder {
    color: #bbb;
  }
`;

const ScTextareaContent = styled.textarea`
  min-height: 14vh;
  max-height: 30vh;
  overflow-y: auto;
  box-sizing: content-box;
  outline: none;
  line-height: 1.6em;
  margin-bottom: 20px;
  font-size: 15px;
  word-break: keep-all;
  border: none;
  resize: none;
  width: 100%;

  color: var(--black);
  background-color: var(--light-blue);
  &::placeholder {
    color: #bbb;
  }
`;

const ScButtonFix = styled.button`
  width: 20%;
  height: 34px;
  margin-top: 10px;
  font-weight: 600;
  border-radius: 8px;
  font-size: 15px;
  background-color: var(--deep-blue);
  color: white;
  &:hover {
    border: 1px solid var(--deep-blue);
    box-shadow: rgb(57, 167, 255, 0.4) 0px 0px 0px 3px;
  }
  border: none;
`;

export default WriteNewFix;
