import React from "react";
import { MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import { ErrorFalse } from "../../../components/utilities";
import { useNavigate } from "react-router-dom";

export default function ErrorBad() {
  const navigate = useNavigate();

  return (
    <MDBContainer fluid className="bg-light">
      <MDBCol
        md={6}
        sm={10}
        size={12}
        className="offset-md-3 offset-sm-1 text-center"
      >
        <img src={ErrorFalse} alt="Error 400" className="img-fluid w-75" />
        <MDBTypography
          tag="h5"
          className="mb-0 mt-3 border-dark w-50 mx-auto border-bottom pb-1"
        >
          Looks like you got lost.
        </MDBTypography>
        <MDBTypography tag="h5" className="mb-0 mt-1">
          Click&nbsp;
          <u className="text-info cursor-pointer" onClick={() => navigate(-1)}>
            here
          </u>
          &nbsp;to go back!
        </MDBTypography>
      </MDBCol>
    </MDBContainer>
  );
}
