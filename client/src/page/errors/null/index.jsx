import React from "react";
import { MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import { ErrorPage } from "../../../components/utilities";
import { useNavigate } from "react-router-dom";

export default function ErrorNull() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    // navigate(`/platform/${auth.role?.name}/dashboard`);
  };

  return (
    <MDBContainer
      className="error-page d-flex align-items-center min-height"
      fluid
    >
      <MDBCol
        md={6}
        sm={10}
        size={12}
        className="offset-md-3 offset-sm-1 text-center"
      >
        <img src={ErrorPage} alt="Error 404" className="img-fluid" />
        <MDBTypography tag="h5" className="mb-0 mt-3">
          Click&nbsp;
          <u className="text-info cursor-pointer" onClick={handleRedirect}>
            here
          </u>
          &nbsp;to go back home!
        </MDBTypography>
      </MDBCol>
    </MDBContainer>
  );
}
