import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

import "../App.css";
const TourCard = ({ tourcard }) => {
  const { _id, filename, title, subheader } = tourcard;
  const tourPageLink = `/tour?${_id}`;

  return (
    <Card>
      <CardImg top width="100%" src={`image/${filename}`} alt={title} />
      <CardBody>
        <Button
          outline
          color="secondary"
          className="float-right"
          href={tourPageLink}>
          Read more
        </Button>
        <CardTitle>{title}</CardTitle>
        <CardSubtitle>{subheader}</CardSubtitle>
      </CardBody>
    </Card>
  );
};
export default TourCard;
