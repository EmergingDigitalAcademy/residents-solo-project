const residentAllergiesReducer = (state = [], action) => {
    if (action.type === 'SET_RESIDENT_ALLERGIES') {
       return action.payload;
    } 
    return state
 };
 
 export default residentAllergiesReducer;