import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
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
        yield console.log(action);

      const response = yield axios.get(`/api/residents/assistances`);
       yield put({type: 'SET_ASSISTANCE', payload: response.data});
    }  catch (error) {
       console.error(`Error getting assistance`, error);
     }
 }

 function* fetchTasksResidents(action){
  try{
    yield console.log(action);
    const response = yield axios.get(`/api/tasks/residents`);
    yield put({ type: 'SET_TASKS_RESIDENTS', payload: response.data});
  } catch(error){
    console.error(`Error getting tasks residents`, error);
  }
 }
  
  function* updateTasks(action) {
    const { tasks_id, resident_id } = action.payload;
    console.log('tasks id updateTasks', tasks_id);
    console.log('resident id updateTasks', resident_id);
     try {
        yield console.log('action payload', action.payload);
        yield axios.put(`/api/tasks/${tasks_id}/residents/${resident_id}`, action.payload);
        yield put({type: 'FETCH_TASKS'})
     }  catch (error) {
        console.error(`Error updating task`, error);
      }
  }
  
  function* tasksSaga() {
    yield takeLatest('FETCH_TASKS', fetchTasks);
    yield takeLatest('UPDATE_TASKS', updateTasks);
    yield takeLatest('FETCH_ASSISTANCE', fetchAssistance);
    yield takeLatest('FETCH_TASKS_RESIDENTS', fetchTasksResidents);
  }
  
  export default tasksSaga;