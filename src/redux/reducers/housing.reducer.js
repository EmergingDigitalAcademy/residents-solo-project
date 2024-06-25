const housingReducer = (state = [], action) => {
  if (action.type === "SET_HOUSING") {
    return action.payload;
  }
  return state;
};

export default housingReducer;
