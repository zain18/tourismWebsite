import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Button,
  Container,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";

export default function WishlistPage() {
  const user = useSelector((state) => state.user);

  const [total, setTotal] = useState(0);

  const [wishlist, setWishlist] = useState([]);

  const deleteFromWishlist = (e, id) => {
    e.preventDefault();
    axios.patch(`/wishlist/remove/${id}`, {
      user_id: user.id,
    });
    window.location.reload();
  };

  useEffect(() => {
    if (user.id) {
      axios.get(`/wishlist/${user.id}`).then((res) => {
        setWishlist(res.data);
      });
    }
    axios.get(`/wishlist/get_total/${user.id}`).then((res) => {
      setTotal(res.data);
      console.log(res.data);
    }, []);
  });

  return (
    <Container style={{ paddingTop: "65px", fontWeight: "700" }}>
      <h1>Your Wishlist</h1>
      {wishlist.length ? (
        <ListGroup>
          {wishlist.map((pack) => (
            <ListGroupItem key={pack._id}>
              <ListGroupItemHeading>{pack.title}</ListGroupItemHeading>
              <ListGroupItemText>{pack.details}</ListGroupItemText>
              <ListGroupItemText>Price: ${pack.price}</ListGroupItemText>
              <Button
                className="btn-danger mr-2"
                onClick={(e) => {
                  deleteFromWishlist(e, pack._id);
                }}>
                Remove From Wishlist
              </Button>
            </ListGroupItem>
          ))}
          <ListGroupItem className="d-flex justify-content-between">
            <ListGroupItemText>Wishlist Total:</ListGroupItemText>
            <ListGroupItemText className="float-right">
              ${total}
            </ListGroupItemText>
          </ListGroupItem>
        </ListGroup>
      ) : (
        <h3>
          You don't have any package in your wishlist. Go and see the offers
        </h3>
      )}
    </Container>
  );
}
