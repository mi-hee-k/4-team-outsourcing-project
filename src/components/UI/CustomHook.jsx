import {collection, addDoc, setDoc, getDocs, deleteDoc, doc} from 'firebase/firestore';
import {auth, db} from '../../shared/firebase';
import {setList} from '../../redux/modules/fixList';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import Button from './Button';
import {toast} from 'react-toastify';

export const useReadFirestore = async () => {
  const dispatch = useDispatch();
  const dataReading = async () => {
    const querySnapshot = await getDocs(collection(db, 'fixs'));
    let dataArr = [];
    querySnapshot.forEach(doc => {
      const data = doc.data();

      // console.log(data, ' 이게 독 아이디');
      dataArr.push({...data, id: doc.id});

      // console.log(data.createdAt, '이게그거');
      dataArr = dataArr.sort((a, b) => b.createdAt - a.createdAt);
    });

    dispatch(setList(dataArr));
  };

  useEffect(() => {
    // console.log('리랜더링 되니?');
    dataReading();
  }, []);
};

export const Update = async (photoURL, displayName, filteredList, dispatch, dataReading) => {
  try {
    const updatePromises = filteredList.map(async item => {
      await setDoc(doc(db, 'fixs', `${item.id}`), {
        ...item,
        displayName,
        photoURL,
      });
    });

    await Promise.all(updatePromises);
    dataReading();

    dispatch(
      setList(
        filteredList.map(item => ({
          ...item,
          displayName,
          photoURL,
        })),
      ),
    );
    toast.success('수정성공!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: 'colored',
    });
  } catch (error) {
    console.error('업데이트 중 오류 발생:', error);
  }
};

export default function EditBtn() {
  const list = useSelector(state => state.fixList);
  const {isLogin, displayName, uid, photoURL, email} = useSelector(state => state.auth);
  const filteredList = list.filter(item => {
    return item.uid == auth.currentUser.uid;
  });
  const dispatch = useDispatch();
  const dataReading = async () => {
    const querySnapshot = await getDocs(collection(db, 'fixs'));
    let dataArr = [];
    querySnapshot.forEach(doc => {
      const data = doc.data();

      // console.log(data, ' 이게 독 아이디');
      dataArr.push({...data, id: doc.id});

      // console.log(data.createdAt, '이게그거');
      dataArr = dataArr.sort((a, b) => b.createdAt - a.createdAt);
    });

    dispatch(setList(dataArr));
  };

  return <Button onClick={() => Update(photoURL, displayName, filteredList, dispatch, dataReading)}>수정적용</Button>;
}
