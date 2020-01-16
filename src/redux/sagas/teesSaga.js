import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getTeesSaga(action) {
    try{
        const getResponse = yield axios.get(`/api/tees?courseId=${action.payload}`);
        yield put({type: 'SET_TEES', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* getTees() {
    yield takeLatest('GET_COURSE_TEES', getTeesSaga)
}

export default getTees;