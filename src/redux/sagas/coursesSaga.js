import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getCoursesSaga() {
    try{
        const getResponse = yield axios.get('/api/courses');
        yield put({type: 'SET_COURSES', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* getCourses() {
    yield takeLatest('GET_COURSES', getCoursesSaga)
}

export default getCourses;