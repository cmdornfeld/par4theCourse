import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getDetailsSaga() {
    try{
        const getResponse = yield axios.get('/api/details');
        yield put({type: 'SET_DETAILS', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* getRoundDetailsSaga(action) {
    try{
        const getResponse = yield axios.get(`/api/details/${action.payload}`);
        yield put({type: 'SET_ROUND_DETAILS', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* getDetails() {
    yield takeLatest('GET_DETAILS', getDetailsSaga);
    yield takeLatest('GET_ROUND_DETAILS', getRoundDetailsSaga);
}

export default getDetails;