import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchTasks(action) {
    try {
      const response = yield axios.get('/api/tasks');
      yield put({ type: 'SET_TASKS', payload: response.data });
    } catch (error) {
      console.error(`Error getting residents`);
    }
  }
  
  function* updateTasks(action) {
     try {
        yield axios.post('/api/tasks', action.payload);
        yield put({type: 'FETCH_TASKS'})
     }  catch (error) {
        console.error(`Error adding new resident`);
      }
  }
  
  function* tasksSaga() {
    yield takeLatest('FETCH_TASKS', fetchTasks);
    yield takeLatest('UPDATE_TASKS', updateTasks);
  }
  
  export default tasksSaga;