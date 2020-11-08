import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { wishlistReducer } from "./wishlistReducer";
import { tourPackageReducer } from "./tourPackageReducer";

const rootReducer = combineReducers({
  user: authReducer,
  wishlist: wishlistReducer,
  package: tourPackageReducer,
});

export default rootReducer;
