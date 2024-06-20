import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// function* fetchAssistance(action) {
//     try {
//     const response = yield axios.get('/api/tasks');
//        yield put({type: 'SET_ASSISTANCE', payload: response.data});
//     }  catch (error) {
//        console.error(`Error getting assistance`);
//      }
//  }


// function assistanceSaga(){
//     yield takeLatest('FETCH_ASSISTANCE', fetchAssistance);
// }

// export default assistanceSaga;