const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  id: "",
  role: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        id: action.payload._id,
        role: action.payload.role,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};
