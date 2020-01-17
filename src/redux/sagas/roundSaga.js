import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* setRoundSaga(action) {
    try{
        const roundId = yield axios.post('/api/round', action.payload);
        yield put({type: 'SET_ROUND_ID', payload: roundId.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* setRound() {
    yield takeLatest('SET_ROUND_DETAILS', setRoundSaga)
}

export default setRound;