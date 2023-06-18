import {
  MDBBtn,
  MDBBtnGroup,
  MDBContainer,
  MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";
import Swal from "sweetalert2";
import { destroy } from "../../../../../services";
import { token } from "../../../../../components/utilities";

export default function CardChat({
  data,
  setData,
  handleData,
  isSeen,
  setLoading,
}) {
  const handleArchives = () =>
    Swal.fire({
      icon: "question",
      title: `Do you want to archive this?`,
      html: data.name,
      showCancelButton: true,
      confirmButtonText: "Proceed",
    }).then(result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setLoading(true);
        destroy("chats", data._id, token);
        setLoading(false);
      }
    });
  return (
    <MDBContainer className="d-flex mb-2">
      <MDBContainer
        className="d-flex justify-content-between w-100 p-1 bg-danger rounded-start"
        onClick={() =>
          handleData({
            users: data.users,
            name: data.name,
            chatId: data._id,
            latestMessage: data?.latestMessage,
            isSeen,
          })
        }
      >
        <MDBContainer>
          <MDBTypography tag={"h5"}>{data.name}</MDBTypography>
          {data?.latestMessage && (
            <MDBTypography tag={isSeen ? "span" : "b"}>
              {!isSeen && "New message from "}
              {data?.latestMessage?.senderId?.name}:{" "}
              {data?.latestMessage?.content}
            </MDBTypography>
          )}
        </MDBContainer>
      </MDBContainer>
      <MDBBtnGroup>
        <MDBBtn
          color="info"
          onClick={async () => {
            setData(data);
          }}
        >
          Edit
        </MDBBtn>
        <MDBBtn
          color="danger"
          onClick={async () => {
            handleArchives();
          }}
        >
          Delete
        </MDBBtn>
      </MDBBtnGroup>
    </MDBContainer>
  );
}
