import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getTotalsSaga(action) {
    try{
        console.log('logging getTotals payload:', action.payload);
        
        const getResponse = yield axios.get(`/api/details/total/${action.payload}`);
        yield put({type: 'SET_TOTALS', payload: getResponse.data})
    }
    catch (error){
        console.log(error);
    }
}

function* getTotals() {
    yield takeLatest('GET_SCORE_TOTALS', getTotalsSaga)
}

export default getTotals;