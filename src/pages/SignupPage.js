import React, { useState } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  Container,
  Form,
  Input,
  FormGroup,
  FormText,
  Label,
  Row,
  Col,
} from "reactstrap";

export const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      if (document.getElementById("form-error").className.includes("visible"))
        document.getElementById(
          "form-error"
        ).className = document
          .getElementById("form-error")
          .className.replace(/visible/g, "invisible");
    } catch (err) {
      let errorMessages = err.response.data.errors;
      if (errorMessages.email !== "")
        document.getElementById("form-error").innerHTML =
          "<p>" + errorMessages.email + "</p>";
      if (errorMessages.password !== "")
        document.getElementById("form-error").innerHTML =
          "<p>" + errorMessages.password + "</p>";
      if (errorMessages.email !== "" || errorMessages.password !== "")
        document.getElementById(
          "form-error"
        ).className = document
          .getElementById("form-error")
          .className.replace(/invisible/g, "visible");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <Container style={{ paddingTop: "200px" }}>
      <h2 className="mb-5" style={{ fontWeight: "600", fontSize: "2.5rem" }}>
        Sign Up
      </h2>
      <Form action="/" onSubmit={(e) => submitForm(e)}>
        <Row>
          <Col>
            <FormGroup>
              <Label htmlFor="email" style={{ width: "100%" }}>
                Enter Your First Name
                <Input
                  type="text"
                  name="first_name"
                  required
                  placeholder="Enter Your First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email" style={{ width: "100%" }}>
                Enter Your Last Name
                <Input
                  type="text"
                  name="last_name"
                  required
                  placeholder="Enter Your Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label htmlFor="email" style={{ width: "100%" }}>
                Enter Your Email Address
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
              <Label htmlFor="email" style={{ width: "100%" }}>
                Create A Password
                <Input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter Your Password"
                  value={password}
                />
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Button className="btn-success">Create Account</Button>
        <Alert id="form-error" color="danger" className="invisible"></Alert>
        <FormText style={{ fontSize: ".85rem" }} className="mt-3">
          You already have an account? <a href="/auth/login">Log In</a>
        </FormText>
      </Form>
    </Container>
  );
};

export default function SignupPage() {
  return <SignupForm />;
}
