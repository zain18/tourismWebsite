import React, { useState, useEffect } from "react";
import { Container, Row, CardColumns, Badge, Input } from "reactstrap";
import TourCard from "./TourCard";
import "../App.css";
import axios from "axios";

const itemCategories = [
  "all",
  "beach",
  "mountain",
  "resort",
  "climbing",
  "camping",
  "honeymoon",
];

const Package = () => {
  const [cards, setCards] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/packages").then((res) => {
      setCards(res.data);
      setUpdated(true);
    });

    console.log(cards);
  }, [cards, updated]);

  return (
    <div className="subComponent-lg" id="packageBody">
      <Container>
        <header className="headerTitle text-center">
          <h1>Tour Packages</h1>
          <p>A Great Collection of Our Tour Packages</p>
          <Input
            type="search"
            placeholder="Search for something"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </header>
        <section className="packageBody text-center">
          {itemCategories.map((badge, index) => (
            <Badge
              key={index}
              href=""
              color={badge === category ? "dark" : "light"}
              onClick={() => setCategory(badge)}>
              {badge}
            </Badge>
          ))}

          <Row className="text-left">
            <CardColumns>
              {category !== "all"
                ? cards.map((card) => {
                    return card.category.map((catItem) => {
                      return catItem === category
                        ? search
                          ? cards.map((card) => {
                              return card.title
                                .toLowerCase()
                                .includes(search) ? (
                                <TourCard key={card._id} tourcard={card} />
                              ) : null;
                            })
                          : cards.map((card) => (
                              <TourCard key={card._id} tourcard={card} />
                            ))
                        : null;
                    });
                  })
                : search
                ? cards.map((card) => {
                    return card.title.toLowerCase().includes(search) ? (
                      <TourCard key={card._id} tourcard={card} />
                    ) : null;
                  })
                : cards.map((card) => (
                    <TourCard key={card._id} tourcard={card} />
                  ))}
            </CardColumns>
          </Row>
        </section>
      </Container>
    </div>
  );
};

export default Package;
