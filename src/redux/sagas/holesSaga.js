// import axios from 'axios';
// import { put, takeLatest } from 'redux-saga/effects';

// function* getHolesSaga(action) {
//     try{
//         const getResponse = yield axios.get(`/api/courses/holes?courseId=${action.payload}`);
//         yield put({type: 'SET_HOLES', payload: getResponse.data})
//     }
//     catch (error){
//         console.log(error); 
//     }
// }

// function* postHolesSaga(action) {
//     try{
//         yield axios.post('/api/details', action.payload);
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

// function* getHoles() {
//     yield takeLatest('GET_COURSE_HOLES', getHolesSaga);
//     yield takeLatest('POST_HOLE_INFO', postHolesSaga);
// }

// export default getHoles;