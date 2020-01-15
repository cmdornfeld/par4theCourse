import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getHolesSaga() {
    try{
        const getResponse = yield axios.get('/api/courses/holes');
        yield put({type: 'SET_HOLES', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* getHoles() {
    yield takeLatest('GET_COURSE_HOLES', getHolesSaga)
}

export default getHoles;