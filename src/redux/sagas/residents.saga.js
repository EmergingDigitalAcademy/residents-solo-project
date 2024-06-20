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

  function* fetchHousing(action) {
    try{
      const response = yield axios.get('/api/residents/housing');
      yield put({ type: 'SET_HOUSING', payload: response.data });
    } catch (error) {
      console.error(`Error getting housing`, error)
    }
  }

  function* updateHousing(action) {
    try{
      yield axios.put('/api/residents/housing', action.payload);
      yield put({ type: 'FETCH_HOUSING' })
    } catch (error){
      console.error(`Error updating housing`, error);
    }
  }
  
  function* addResidents(action) {
     try {
        yield axios.post('/api/residents/admit', action.payload);
        yield put({type: 'FETCH_RESIDENTS'})
     }  catch (error) {
        console.error(`Error adding new resident`, error);
      }
  }
  
  function* residentsSaga() {
    yield takeLatest('FETCH_RESIDENTS', fetchResidents);
    yield takeLatest('ADD_RESIDENTS', addResidents);
    yield takeLatest('FETCH_HOUSING', fetchHousing);
    yield takeLatest('UPDATE_HOUSING', updateHousing);
  }
  
  export default residentsSaga;