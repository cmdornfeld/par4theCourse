import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getTeesSaga() {
    try{
        const getResponse = yield axios.get('/api/tees');
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