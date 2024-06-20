const assistanceReducer = (state = [], action) => {
    if (action.type === 'SET_ASSISTANCE') {
       return action.payload;
    }
    return state
 };
 
 export default assistanceReducer;