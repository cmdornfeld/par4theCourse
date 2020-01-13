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

function* getDetails() {
    yield takeLatest('GET_DETAILS', getDetailsSaga)
}

export default getDetails;