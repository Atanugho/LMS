import { configureStore} from '@reduxjs/toolkit';

import authSliceReducer from './slices/AuthSlice';
import CourseSliceReducer from './slices/CourseSlice';
import razorpaySliceReducer from './slices/RazorpaySlice';

const store = configureStore({
    reducer: {
        auth : authSliceReducer,
        course : CourseSliceReducer,
        razorpay : razorpaySliceReducer,
    },
    devTools: true
});

export default store;