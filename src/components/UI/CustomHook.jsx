import {collection, addDoc, setDoc, getDocs, deleteDoc, doc} from 'firebase/firestore';
import {db} from '../../shared/firebase';
import {setList} from '../../redux/modules/fixList';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';

// export const addFirestore = async () => {
//   try {
//     const docRef = await addDoc(collection(db, 'users'), {
//       first: 'Ada',
//       last: 'Lovelace',
//       born: 1815,
//     });
//     console.log('이게 니아이디', docRef.id);
//   } catch (e) {
//     console.error('추가작업에러발생', e);
//   }
// };

export const useReadFirestore = async () => {
  // console.log('이게 리스트', addlist);
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

// export const Update = (photoURL, displayName, filteredList, dispatch) => {
//   const lastList = filteredList.forEach(async item => {
//     await setDoc(doc(db, 'fix', `${item.id}`), {
//       ...doc,
//       displayName,
//       photoURL,
//     });
//   });
//   dispatch(setList(lastList));
// };
export const Update = async (photoURL, displayName, filteredList, dispatch, dataReading) => {
  try {
    const updatePromises = filteredList.map(async item => {
      await setDoc(doc(db, 'fixs', `${item.id}`), {
        ...item, // 이전 데이터를 모두 유지한 채 업데이트
        displayName,
        photoURL,
      });
    });

    await Promise.all(updatePromises);
    dataReading();
    // 모든 문서 업데이트가 완료되면 상태를 업데이트
    dispatch(
      setList(
        filteredList.map(item => ({
          ...item,
          displayName,
          photoURL,
        })),
      ),
    );
  } catch (error) {
    console.error('업데이트 중 오류 발생:', error);
  }
};
// export const deliteFirestore = async () => {
//   await deleteDoc(doc(db, 'cities', 'DC'));
// };
// export const DataReading = async () => {

//   const querySnapshot = await getDocs(collection(db, 'fixs'));
//   let dataArr = [];
//   querySnapshot.forEach(doc => {
//     const data = doc.data();

//     // console.log(data, ' 이게 독 아이디');
//     dataArr.push({...data, id: doc.id});

//     // console.log(data.createdAt, '이게그거');
//     dataArr = dataArr.sort((a, b) => b.createdAt - a.createdAt);
//   });

//   dispatch(setList(dataArr));
// };
