const transactionReducer = (state = [], action) => {
  if (action.type === "SET_TRANSACTION") {
    return action.payload;
  }
  return state;
};

export default transactionReducer;
