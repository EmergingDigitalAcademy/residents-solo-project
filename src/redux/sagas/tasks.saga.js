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

  function* fetchAssistance(action) {
    try {
    const response = yield axios.get('/api/residents/:id/tasks/:id');
       yield put({type: 'SET_ASSISTANCE', payload: response.data});
    }  catch (error) {
       console.error(`Error getting assistance`);
     }
 }
  
  function* updateTasks(action) {
     try {
        yield axios.post('/api/tasks', action.payload);
        yield put({type: 'FETCH_TASKS'})
     }  catch (error) {
        console.error(`Error updating task`);
      }
  }
  
  function* tasksSaga() {
    yield takeLatest('FETCH_TASKS', fetchTasks);
    yield takeLatest('UPDATE_TASKS', updateTasks);
    yield takeLatest('FETCH_ASSISTANCE', fetchAssistance);
  }
  
  export default tasksSaga;