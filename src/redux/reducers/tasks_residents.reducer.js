const tasksResidents = (state = [], action) => {
    if (action.type === 'SET_TASKS_RESIDENTS') {
       return action.payload;
    }
    return state
 };
 
 export default tasksResidents;