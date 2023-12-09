import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getDoc, doc} from 'firebase/firestore';
import {db} from '../../shared/firebase';
import {deleteDoc} from 'firebase/firestore';

const initialState = {
  fix: {},
  isLoading: false,
  isError: false,
  error: null,
};

export const __getFix = createAsyncThunk('getFix', async (payload, thunkAPI) => {
  try {
    const postRef = doc(db, 'fixs', payload);
    const post = await getDoc(postRef);
    return thunkAPI.fulfillWithValue(post.data());
  } catch (err) {
    console.log('데이터 가져오기 오류다', err);
    return thunkAPI.rejectWithValue(err);
  }
});

export const __deleteFix = createAsyncThunk('deleteFix', async (payload, thunkAPI) => {
  try {
    const removepost = await deleteDoc(doc(db, 'fixs', payload));
    // thunkAPI.dispatch(__getFix);
    return thunkAPI.fulfillWithValue(removepost);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const FixSlice = createSlice({
  name: 'fix',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(__getFix.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__getFix.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.fix = action.payload;
      })
      .addCase(__getFix.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
    builder
      .addCase(__deleteFix.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__deleteFix.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(__deleteFix.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
    // builder
    //   .addCase(__editFix.pending, (state, action) => {
    //     state.isLoading = true;
    //     state.isError = false;
    //   })
    //   .addCase(__editFix.fulfilled, (state, action) => {
    //     const editfix = state.fix.findIndex(fix => {
    //       return fix.id === action.payload.id;
    //     });
    //     state.fix.splice(editfix, 1, action.payload);
    //     // state.fix = action.payload;
    //     state.isLoading = false;
    //     state.isError = false;
    //   })
    //   .addCase(__editFix.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = true;
    //     state.error = action.payload;
    //   });
  },
});

export default FixSlice.reducer;
