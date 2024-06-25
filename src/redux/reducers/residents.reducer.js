const residentsReducer = (state = [], action) => {
  if (action.type === "SET_RESIDENTS") {
    return action.payload;
  }
  return state;
};

export default residentsReducer;
