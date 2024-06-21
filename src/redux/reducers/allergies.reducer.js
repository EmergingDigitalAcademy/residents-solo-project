const allergiesReducer = (state = [], action) => {
    if (action.type === 'SET_ALLERGIES') {
       return action.payload;
    } 
    return state
 };
 
 export default allergiesReducer;