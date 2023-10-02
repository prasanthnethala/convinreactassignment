import { configureStore } from '@reduxjs/toolkit';
import postReducer  from '../redux/slices/DataSlice'

export const store = configureStore( {
    reducer:{
        app: postReducer,
    },
});

export default store;