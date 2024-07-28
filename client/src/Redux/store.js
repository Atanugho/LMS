import { configureStore} from '@reduxjs/toolkit';

import authSliceReducer from './slices/AuthSlice';
import CourseSliceReducer from './slices/CourseSlice';
import razorpaySliceReducer from './slices/RazorpaySlice';
import LecturesSlicesReducer from './slices/LecturesSlices';

const store = configureStore({
    reducer: {
        auth : authSliceReducer,
        course : CourseSliceReducer,
        razorpay : razorpaySliceReducer,
        lecture: LecturesSlicesReducer
    },
    devTools: true
});

export default store;