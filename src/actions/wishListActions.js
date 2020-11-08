export const add_to_wishlist = (product, price) => {
  return {
    type: "ADD_TO_WISHLIST",
    payload: product,
    price: price,
  };
};

export const remove_from_wishlist = (id, price) => {
  return {
    type: "REMOVE_FROM_WISHLIST",
    payload: id,
    price: price,
  };
};
