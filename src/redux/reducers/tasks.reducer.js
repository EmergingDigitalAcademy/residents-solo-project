const tasksReducer = (state = [], action) => {
    if (action.type === 'SET_TASKS') {
       return action.payload;
    }
    return state
 };
 
 export default tasksReducer;