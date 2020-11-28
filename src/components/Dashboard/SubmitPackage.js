import React, { useState } from "react";
import { Form, FormGroup, Input, Label, FormText, Button } from "reactstrap";
import axios from "axios";

export default function SubmitPackage() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [categories, setCategories] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState("");
  const [showcase, setShowcase] = useState([]);

  const checkCategories = (categories) => {
    return categories
      .toLowerCase()
      .split(",")
      .map((category) => category.replace(/\s/g, ""));
  };

  const getShowcaseArray = (files) => {
    let showcase = [];
    for (let i = 0; i < files.length; i++) {
      showcase.push(files[i].name);
    }
    return showcase;
  };

  const submitForm = () => {
    try {
      const categoryArray = checkCategories(categories);
      console.log("File: ", file);
      console.log("Showcase: ", showcase);
      const showcaseArray = getShowcaseArray(showcase);
      axios
        .post("/packages/add_package", {
          title: title,
          details: details,
          category: categoryArray,
          description: description,
          filename: file,
          price: price,
          showcaseImages: showcaseArray,
        })
        .then((res) => console.log(res.data));

      setTitle("");
      setCategories("");
      setDescription("");
      setDetails("");
      setPrice(0);
      setFile("");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Form
      action="/upload"
      method="POST"
      encType="multipart/form-data"
      onSubmit={submitForm}>
      <FormGroup>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="details">Details</Label>
        <Input
          type="text"
          name="details"
          onChange={(e) => setDetails(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="categories">Categories</Label>
        <Input
          type="text"
          name="categories"
          onChange={(e) => setCategories(e.target.value)}
        />
        <FormText htmlFor="categories">
          Be sure to put a comma after each category (',')
        </FormText>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="package_image">Image</Label>
        <Input
          type="file"
          name="package_image"
          onChange={(e) => setFile(e.target.files[0].name)}
        />
        <FormText htmlFor="package_image">
          Select Package Thumbnail Image
        </FormText>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="showcase">Showcase Images</Label>
        <Input
          type="file"
          name="showcase"
          multiple
          onChange={(e) => setShowcase(e.target.files)}
        />
        <FormText htmlFor="showcase">Select Package Thumbnail Image</FormText>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="title">Description</Label>
        <Input
          type="textarea"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormGroup>
      <Button>Add Package</Button>
    </Form>
  );
}
