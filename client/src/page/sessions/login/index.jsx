import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBSpinner,
  MDBRow,
  MDBIcon,
  MDBTypography,
} from "mdb-react-ui-kit";
import { auth } from "../../../components/utilities";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services";
import Logo from "./../../../assets/images/logo.png";

const Login = () => {
  const navigate = useNavigate(),
    [isLoading, setIsLoading] = useState(false),
    [show, setShow] = useState(false);

  useEffect(() => {
    if (auth) {
      navigate("/platforms/msg");
    }
  }, [auth]);
  const handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = e.target;
    if (email || password) {
      await login(email.value, password.value).then(async data => {
        window.location.href = "/platforms/msg";
      });
    }
  };
  return (
    <MDBContainer fluid className={`px-0 overflow-hidden`}>
      <MDBRow className="min-height">
        <MDBCol
          size={12}
          md={6}
          className={`text-center d-flex align-items-center offset-md-3`}
        >
          <MDBContainer fluid>
            <img src={Logo} className="img-fluid mx-auto" alt="Logo" />
            <MDBContainer fluid className="p-0">
              <form onSubmit={handleSubmit} autoComplete="off">
                <MDBInput
                  type="text"
                  label="E-mail Address / Mobile"
                  name="email"
                  className="my-3"
                  required
                  autoFocus
                />
                <MDBRow className="mx-0 my-3">
                  <MDBCol size={12} className="px-0 position-relative">
                    <MDBInput
                      type={!show ? "password" : "text"}
                      label="Password"
                      name="password"
                      minLength={6}
                      required
                    />
                    <MDBIcon
                      fas
                      icon={show ? "eye" : "eye-slash"}
                      className="custom-register-eye cursor-pointer"
                      onClick={() => setShow(!show)}
                    />
                  </MDBCol>
                </MDBRow>
                <div className="d-flex justify-content-end">
                  <MDBBtn
                    disabled={isLoading}
                    type="submit"
                    color="primary"
                    title="Submit"
                  >
                    {isLoading ? <MDBSpinner grow size="sm" /> : "Submit"}
                  </MDBBtn>
                </div>
              </form>
            </MDBContainer>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
