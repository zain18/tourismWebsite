export const wishlistReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return [...state, action.payload];
    case "REMOVE_FROM_WISHLIST":
      return [...state.filter((product) => product.id !== action.payload)];
    default:
      return state;
  }
};

/* export const wishlistTotalReducer = (state = 0, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return state + action.price;
    case "REMOVE_FROM_WISHLIST":
      return state - action.price;
    default:
      return state;
  }
}; */
