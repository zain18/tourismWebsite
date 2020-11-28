import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../App.css";

import { useSelector } from "react-redux";
import axios from "axios";

const Tour = () => {
  const user = useSelector((state) => state.user);
  const [tour, setTour] = useState([]);
  const [packageId, setPackageId] = useState("");
  const [updated, setUpdated] = useState(false);
  const [showcase, setShowcase] = useState([]);

  useEffect(() => {
    setPackageId(window.location.search.substring(1));
    axios
      .get(`/packages/${packageId}`)
      .then((res) => {
        setTour(res.data);
        setShowcase(res.data.showcaseImages);
        setUpdated(true);
      })
      .catch((err) => console.error(err));
  }, [packageId, updated]);

  const addItemToWishlist = (packageId) => {
    axios
      .patch(`wishlist/add/${packageId}`, { user_id: user.id })
      .catch((err) => console.error(err));
  };

  return (
    <div className="subComponent">
      <Container>
        <section className="tour-cover item-center">
          <img src={`image/${tour.filename}`} alt={`${tour.title}`} />
          <h1>{tour.title}</h1>
          <h4>{tour.details}</h4>
        </section>
        <section className="tour-info">
          <Row>
            <Col sm="8">
              <div className="tour-desc">
                <p>{tour.description}</p>
              </div>
            </Col>
            <Col
              sm="4"
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}>
              {showcase && showcase.length ? (
                <div className="tour-gallery">
                  {showcase.map((image, index) => {
                    return (
                      <img key={index} src={`image/${image}`} alt="Showcase" />
                    );
                  })}
                </div>
              ) : (
                ""
              )}

              <Button
                outline
                color="primary"
                style={{ width: "100%", marginBottom: "20px" }}
                onClick={() => addItemToWishlist(packageId)}>
                Add To Wishlist
              </Button>
            </Col>
          </Row>
        </section>
      </Container>
      <section className="reviews">
        <Container>
          <section className="tour-msg text-center">
            <h1>Reviews and Suggestions</h1>
            <p>We're glad to hear something from you.</p>
            <form action="">
              <Row>
                <Col sm="6">
                  <input
                    type="text"
                    name="Name"
                    id="reviewer-name"
                    placeholder="Your Name"
                    required
                  />
                  <br />
                  <input
                    type="email"
                    name="Email"
                    id="reviewer-email"
                    placeholder="Your email"
                    required
                  />
                </Col>
                <Col>
                  <textarea
                    name="Message"
                    id="reviewer-message"
                    rows="4"
                    placeholder="Your Message"
                  />
                </Col>
              </Row>
              <Button outline color="secondary" className="float-right">
                Submit
              </Button>
            </form>
          </section>
        </Container>
      </section>
    </div>
  );
};

export default Tour;
