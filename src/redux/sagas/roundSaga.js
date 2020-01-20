import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* setRoundSaga(action) {
    try{
        yield axios.post('/api/round', action.payload);
        const roundId = yield axios.get('/api/round');
        console.log('logging roundId:', roundId.data);
        yield put({type: 'SET_ROUND_ID', payload: roundId.data});
    }
    catch (error){
        console.log(error); 
    }
}

function* deleteRoundSaga(action) {
    try{
        yield axios.delete('/api/round', action.payload);
    }
    catch (error){
        console.log(error); 
    }
}

function* setRound() {
    yield takeLatest('SET_ROUND_INFO', setRoundSaga)
}

export default setRound;