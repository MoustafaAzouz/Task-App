import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authsSlice';
import   taskReducer from './slices/taskSlice';
import linkedinReducer from './slices/linkedIn'


const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: taskReducer,
        linkedin: linkedinReducer 

    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
