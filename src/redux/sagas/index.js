import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import detailsSaga from './detailsSaga';
import coursesSaga from './coursesSaga';
import teesSaga from './teesSaga';
import totalSaga from './totalSaga';
import roundSaga from './roundSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    detailsSaga(),
    loginSaga(),
    registrationSaga(),
    userSaga(),
    coursesSaga(),
    teesSaga(),
    totalSaga(),
    roundSaga(),
  ]);
}
