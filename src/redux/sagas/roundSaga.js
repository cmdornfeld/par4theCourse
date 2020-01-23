import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* setRoundSaga(action) {
    try{
        const createNewRound = yield axios.post('/api/round', action.payload);
        console.log('logging createNewRound:', createNewRound.data.id);
        
        const newRound = yield axios.get(`/api/round/${createNewRound.data.id}`);
        console.log('logging newRound:', newRound.data);
        yield put({type: 'SET_ROUND', payload: newRound.data});
    }
    catch (error){
        console.log(error);
    }
}

function* updateRoundSaga(action) {
    try {
        yield axios.put('/api/round?roundId=')

    }
    catch (error){
        console.log('error updating round:', error);
    }
}

function* deleteRoundSaga(action) {
    try{
        yield axios.delete(`/api/round/${action.payload}`);
        yield put({type: 'GET_DETAILS'});
    }
    catch (error){
        console.log(error); 
    }
}

function* setRound() {
    yield takeLatest('SET_ROUND_INFO', setRoundSaga);
    yield takeLatest('DELETE_ROUND', deleteRoundSaga);
    yield takeLatest('UPDATE_ROUND', updateRoundSaga);
}

export default setRound;