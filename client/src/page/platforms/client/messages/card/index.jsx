import React from "react";
import { PresetUser, auth } from "../../../../../components/utilities";
import { MDBTypography } from "mdb-react-ui-kit";

export default function CardMessage({ message }) {
  return (
    <>
      {message.senderId === auth._id ? (
        <div className="d-flex justify-content-end align-items-end">
          <MDBTypography
            tag={"h3"}
            className="px-4 py-1 bg-danger my-1 rounded-5"
          >
            {message.content}
          </MDBTypography>
        </div>
      ) : (
        <div className="d-flex justify-content-start align-items-end">
          <img
            height={"40px"}
            src={PresetUser}
            alt=""
            className="rounded-circle
"
          />
          <MDBTypography tag={"h3"} className="p-1 border my-1 rounded-5">
            {message.content}
          </MDBTypography>
        </div>
      )}
    </>
  );
}
