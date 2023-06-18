import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBTypography,
} from "mdb-react-ui-kit";
import ChatModal from "./modal";
import { auth, socket, token } from "../../../../components/utilities";
import { browse } from "../../../../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CardChat from "./card";

function ChatIndex({ handleData }) {
  const navigate = useNavigate(),
    [visibility, setVisibility] = useState(false),
    [chats, setChats] = useState([]),
    [loading, setLoading] = useState(true),
    [data, setData] = useState({});

  useEffect(() => {
    socket.on("message recieved", () => {
      browse("chats", auth?._id, token).then(chat => {
        setChats(chat);
      });
    });
  });

  useEffect(() => {
    browse("chats", auth?._id, token).then(chat => {
      setChats(chat);
    });
  }, [navigate, visibility, handleData, loading]);

  const toggleShow = () => setVisibility(!visibility);
  const handleNew = () => {
    setData({});
    toggleShow();
  };

  const handleLogout = () => {
    toast.info("Removing all your cache.");
    setVisibility(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setTimeout(() => {
      window.location.href = "/login";
    }, 0);
  };
  return (
    <MDBCol
      lg={3}
      sm={6}
      className="border rounded-start-4 bg-success d-none d-md-block"
    >
      <MDBContainer className="d-flex justify-content-between my-2">
        <MDBTypography tag={"h2"}>Chat</MDBTypography>
        <MDBBtn color="secondary" onClick={handleNew}>
          add
        </MDBBtn>
      </MDBContainer>
      {chats.map(data => {
        var isSeen = data.latestMessage
          ? data?.latestMessage?.seen.find(seen => seen === auth._id)
          : false;
        return (
          <CardChat
            setLoading={setLoading}
            data={data}
            handleData={handleData}
            setData={setData}
            isSeen={isSeen}
          />
        );
      })}
      <ChatModal
        data={data}
        auth={auth}
        visibility={visibility}
        setVisibility={setVisibility}
        toggleShow={toggleShow}
      />
      <MDBContainer className="d-flex position-absolute bottom-0">
        <MDBBtn onClick={handleLogout} color="danger">
          Logout
        </MDBBtn>
      </MDBContainer>
    </MDBCol>
  );
}

export default ChatIndex;
