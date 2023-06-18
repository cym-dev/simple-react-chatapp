import React, { useEffect, useState } from "react";
import { MDBBtn, MDBCol, MDBTypography } from "mdb-react-ui-kit";
import { auth, socket, token } from "../../../../components/utilities";
import { browse, save } from "../../../../services";

import CardMessage from "./card";

function MessagesIndex({ data, handleData }) {
  const entity = {
    name: "messages",
  };
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.on("message", message => {
      setMessages(message);
    });
  });
  useEffect(() => {
    if (data.chatId) {
      socket.emit("join chat", data.chatId);
      browse(entity.name, data.chatId, token).then(data => {
        setMessages(data);
      });
    }
  }, [data]);

  const handleSubmit = async e => {
    e.preventDefault();
    var form = {
      senderId: auth._id,
      content: e.target.content.value,
      chatId: data.chatId,
      seen: [auth._id],
    };
    await save(entity.name, form, token).then(message => {
      setMessages([...messages, message]);
      socket.emit(
        "send message",
        [...messages, message],
        data.users,
        message.chatId,
        auth._id
      );
    });
  };
  return (
    <MDBCol lg={9} sm={6}>
      <MDBTypography tag={"h2"} className="my-2">
        {data.chatId ? data.name : "Messages"}
      </MDBTypography>
      <div
        style={{ maxHeight: "90vh" }}
        className="d-block rounded-4 overflow-auto"
      >
        {messages.map(message => {
          return <CardMessage message={message} />;
        })}
        {data.chatId && (
          <form onSubmit={handleSubmit} className="">
            <div className="d-flex position-absolute bottom-0  w-75">
              <input
                onFocus={() => handleData(data)}
                name="content"
                type="text"
                className="form-control"
                placeholder="Message..."
              />
              <MDBBtn className="w-25" type="submit" color="success">
                send
              </MDBBtn>
            </div>
          </form>
        )}
      </div>
    </MDBCol>
  );
}

export default MessagesIndex;
