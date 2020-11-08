import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";
import axios from "axios";
import SubmitPackage from "../components/Dashboard/SubmitPackage";
import Packages from "../components/Dashboard/Packages";

export default function Dashboard() {
  const [packages, setPackages] = useState([]);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get("/packages")
      .then((res) => {
        setPackages(res.data);
      })
      .catch((err) => console.error(err));
  }, [packages]);

  return (
    <div>
      <Container style={{ marginTop: "65px" }}>
        <h2 className="">Hello, {user.firstName}!</h2>
        <h3 className="mt-5">Add a package</h3>
        <SubmitPackage />
        <Packages packages={packages} />
      </Container>
    </div>
  );
}
