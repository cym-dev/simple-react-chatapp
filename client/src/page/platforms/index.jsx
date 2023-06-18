import React, { useEffect, useState } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import { Outlet, useNavigate } from "react-router-dom";
import { auth, socket } from "../../components/utilities";

const Dashboard = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    socket.emit("setup", auth._id);
  });

  return (
    <MDBContainer
      fluid
      className={`px-0 dashboard-container  transition-all bg-info`}
    >
      <div className="flexible-content">
        <main id="content" className="transition-all">
          <MDBContainer fluid>
            <Outlet />
          </MDBContainer>
        </main>
      </div>
    </MDBContainer>
  );
};

export default Dashboard;
