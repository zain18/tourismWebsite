import React, { useState } from "react";
import { Form, FormGroup, Input, Label, FormText, Button } from "reactstrap";
import axios from "axios";

export default function UpdateForm({ toggle, packageId }) {
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDetails, setUpdatedDetails] = useState("");
  const [updatedCategories, setUpdatedCategories] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const submitUpdatedForm = (e) => {
    e.preventDefault();
    console.log();
    axios
      .patch(`/packages/update_package/${packageId}`, {
        title: updatedTitle,
        details: updatedDetails,
        category: updatedCategories,
        description: updatedDescription,
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <Form
      action="/upload"
      method="POST"
      encType="multipart/form-data"
      onSubmit={submitUpdatedForm}>
      <FormGroup>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="details">Details</Label>
        <Input
          type="text"
          name="details"
          onChange={(e) => setUpdatedDetails(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="categories">Categories</Label>
        <Input
          type="text"
          name="categories"
          onChange={(e) => setUpdatedCategories(e.target.value)}
        />
        <FormText htmlFor="categories">
          Be sure to put a comma after each category (',')
        </FormText>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="package_image">Image</Label>
        <Input type="file" name="package_image" />
        <FormText htmlFor="package_image">
          Select Package Thumbnail Image
        </FormText>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="title">Description</Label>
        <Input
          type="textarea"
          name="description"
          onChange={(e) => setUpdatedDescription(e.target.value)}
        />
      </FormGroup>
      <Button>Update Package</Button>
      <Button className="float-right" onClick={toggle}>
        Close
      </Button>
    </Form>
  );
}
