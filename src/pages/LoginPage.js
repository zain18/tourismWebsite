import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../actions/authActions";
import {
  Button,
  Container,
  Form,
  Input,
  FormGroup,
  FormText,
  Label,
} from "reactstrap";
import "../App.css";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      await axios
        .post("/auth/login", {
          email,
          password,
        })
        .then((res) => dispatch(login(res.data)))
        .catch((_) => setLoginError(true));
    } catch (err) {
      console.log(err);
    }
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (user.firstName) {
      window.location.href = "/";
    }
  }, [user]);

  return (
    <Container style={{ paddingTop: "200px" }}>
      <h2 className="mb-5" style={{ fontWeight: "600", fontSize: "2.5rem" }}>
        Log In
      </h2>
      {loginError ? (
        <h5 className="text-danger">
          Invalid Email or Password. Please Try Again!
        </h5>
      ) : (
        ""
      )}
      <Form action="/auth/login" onSubmit={(e) => submitForm(e)}>
        <FormGroup>
          <Label htmlFor="email" style={{ width: "25%" }}>
            Your Email
            <Input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email Address"
              value={email}
            />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email" style={{ width: "25%" }}>
            Your Password
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter Your Password"
              value={password}
            />
          </Label>
        </FormGroup>
        <Button className="btn-success">Login</Button>
        <FormText style={{ fontSize: "0.85rem" }} className="mt-3">
          You don't have an account? <a href="/auth/signup">Sign Up</a>
        </FormText>
      </Form>
    </Container>
  );
};

export default function LoginPage() {
  return <LoginForm />;
}
