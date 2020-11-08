import React from "react";
import { ListGroup } from "reactstrap";
import Package from "./Package";

export default function Packages({ packages }) {
  return (
    <div>
      {packages.length > 0 ? (
        <div>
          <h3 className="mt-5">Packages</h3>
          <ListGroup>
            {packages.map((pack) => (
              <Package key={pack._id} pack={pack} />
            ))}
          </ListGroup>
        </div>
      ) : (
        <h3 className="mt-5">
          Seems Like there are no active packages at the moment...
        </h3>
      )}
    </div>
  );
}
