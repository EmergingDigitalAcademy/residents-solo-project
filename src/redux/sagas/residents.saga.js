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

  function* updateStatus(action){
    const { resident_id } = action.payload;
    console.log(resident_id);
    try{
      yield console.log(action);
      yield axios.put(`/api/residents/archive/${resident_id}`, action.payload);
      yield put({ type: 'FETCH_RESIDENTS' })
    } catch (error) {
      console.error(`Error updating status`, error);
    }
  }

  function* fetchTransaction(action){
    console.log('action payload!!', action.payload);
    const { resident_id } = action.payload
    try{
      const response = yield axios.get(`/api/residents/view_history/${resident_id}`);
      yield put ({ type: 'SET_TRANSACTION', payload: response.data });
    } catch (error) {
      console.error(`Error getting transaction log`, error);
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

  function* fetchAllergies(action){
    try{
      const response = yield axios.get(`/api/residents/allergies`);
      yield put ({ type: 'SET_ALLERGIES', payload: response.data });
    }catch (error) {
      console.error(`Error getting allergies`, error);
    }
  }

  function* addAllergies(action){
    console.log('action payload add allergies', action.payload)
    try{
      yield axios.post(`api/residents/allergies`, action.payload);
      yield put ({ type: 'FETCH_ALLERGIES' })
    }catch (error) {
      console.error(`Error posting allergies`, error);
    }
  }

  function* fetchResidentAllergies(action) {
    try{
      const response = yield axios.get(`api/residents/allAllergies`);
      yield put ({ type: 'SET_RESIDENT_ALLERGIES', payload: response.data });
    } catch(error){
      console.error(`Error getting resident allergies`, error);
    }
  }

  function* deleteAllergy(action){
    console.log('delete allergy action payload', action.payload)
    try{
      yield axios.delete(`api/residents/allergies/${action.payload}`);
      yield put ({ type: 'FETCH_ALLERGIES' })
    } catch(error) {
      console.error(`Error deleting allergy`, error);
    }
  }
  
  function* residentsSaga() {
    yield takeLatest('FETCH_RESIDENTS', fetchResidents);
    yield takeLatest('ADD_RESIDENTS', addResidents);
    yield takeLatest('FETCH_HOUSING', fetchHousing);
    yield takeLatest('UPDATE_HOUSING', updateHousing);
    yield takeLatest('UPDATE_STATUS', updateStatus);
    yield takeLatest('FETCH_TRANSACTIONS', fetchTransaction);
    yield takeLatest('FETCH_ALLERGIES', fetchAllergies);
    yield takeLatest('ADD_ALLERGIES', addAllergies);
    yield takeLatest('DELETE_ALLERGY', deleteAllergy);
    yield takeLatest('FETCH_RESIDENT_ALLERGIES', fetchResidentAllergies);
  }
  
  export default residentsSaga;