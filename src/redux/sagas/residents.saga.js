import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchResidents(action) {
    try {
      const response = yield axios.get('/api/residents');
      yield put({ type: 'SET_RESIDENTS', payload: response.data });
    } catch (error) {
      console.error(`Error getting residents`);
    }
  }
  
  function* addResidents(action) {
     try {
        yield axios.post('/api/residents', action.payload);
        yield put({type: 'FETCH_RESIDENTS'})
     }  catch (error) {
        console.error(`Error adding new resident`);
      }
  }
  
  function* residentsSaga() {
    yield takeLatest('FETCH_RESIDENTS', fetchResidents);
    yield takeLatest('ADD_RESIDENTS', addResidents);
  }
  
  export default residentsSaga;