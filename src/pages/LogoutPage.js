import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/authActions";
import axios from "axios";

export default function LogoutPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  dispatch(logout(user));
  localStorage.clear();
  axios.get("/auth/logout").then((window.location.href = "/"));
  return (
    <div>
      <h1>Logout Page</h1>
    </div>
  );
}
