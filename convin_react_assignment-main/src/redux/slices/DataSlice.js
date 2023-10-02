import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const getPost = createAsyncThunk('post', async(bucket) =>{
  return  await fetch(`http://localhost:3000/${bucket}`).then(res => res.json()
  );
});


export const historyData = createAsyncThunk('post', async(name, url) =>{
let data = { name, url }
  return data
});


const postSlice = createSlice({
  name: 'post',
  initialState:{
  post: [],
  loading: false,
  error: null
},
extraReducers : {
    [getPost.pending]: (state, action) =>{
      state.loading = true;
    },
    [getPost.fulfilled]: (state, action) =>{
      state.loading = false;
      state.post = [action.payload];
    },
    [getPost.rejected]: (state, action) =>{
      state.loading = false;
      state.error = [action.payload];
    },
    
    [historyData.pending]: (state, action) =>{
      state.loading = true;
    },
    [historyData.fulfilled]: (state, action) =>{
      state.loading = false;
      state.post = [...state.post,action.payload];
    },
    [historyData.rejected]: (state, action) =>{
      state.loading = false;
      state.error = [action.payload];
    },

},
}
);

// export const { addItems, deleteItems} = postSlice.actions

export default postSlice.reducer