export const tourPackageReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_PACKAGE":
      return [...state, action.payload];
    default:
      return state;
  }
};
