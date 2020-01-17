import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* setRoundSaga(action) {
    try{
        const roundId = yield axios.post('/api/round', action.payload);
        console.log('logging roundId:', roundId.data.rows[0]);
        
        yield put({type: 'SET_ROUND_ID', payload: roundId.data.rows[0]})
    }
    catch (error){
        console.log(error); 
    }
}

function* setRound() {
    yield takeLatest('SET_ROUND_DETAILS', setRoundSaga)
}

export default setRound;