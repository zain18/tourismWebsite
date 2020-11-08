import React, { useState } from "react";
import {
  Collapse,
  Card,
  CardBody,
  Button,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import axios from "axios";
import UpdateForm from "./UpdateForm";

export default function Package({ pack }) {
  const [collapse, setCollapse] = useState(false);

  const toggle = () => {
    setCollapse(!collapse);
  };

  const deletePackage = async (id) => {
    await axios.get("/file_id").then((res) => {
      axios
        .delete(`/files/${res.data}`)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    });
    axios.delete(`/packages/delete_package/${id}`);
  };

  return (
    <ListGroupItem key={pack._id}>
      <ListGroupItemHeading>{pack.title}</ListGroupItemHeading>
      <ListGroupItemText>{pack.details}</ListGroupItemText>
      <ListGroupItemText>
        Added on: {pack.added_at.substring(0, 10)}
      </ListGroupItemText>
      <Button
        className="btn-danger mr-2"
        onClick={() => {
          deletePackage(pack._id);
        }}>
        Delete
      </Button>
      <Button onClick={toggle} className="btn-warning ml-2">
        Update
      </Button>
      <Collapse isOpen={collapse}>
        <Card>
          <CardBody>
            <UpdateForm toggle={toggle} packageId={pack._id} />
          </CardBody>
        </Card>
      </Collapse>
    </ListGroupItem>
  );
}
