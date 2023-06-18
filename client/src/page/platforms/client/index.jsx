import { MDBRow } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import Chats from "./chat";
import Messages from "./messages";
import { useNavigate } from "react-router-dom";
import { auth, token } from "../../../components/utilities";
import { update } from "../../../services";

function Index() {
  const navigate = useNavigate(),
    [data, setData] = useState({ name: "", chatId: "" });

  useEffect(() => {
    if (!auth || !token) {
      navigate("/");
    }
  }, [navigate]);

  const handleData = data => {
    if (data.latestMessage && !data.isSeen) {
      update(
        "messages",
        { seen: [...data.latestMessage.seen, auth._id] },
        data.latestMessage._id,
        token,
        false
      );
    }
    setData(data);
  };

  return (
    <MDBRow className="border rounded-4 vh-100">
      <Chats handleData={handleData} />
      <Messages data={data} handleData={handleData} />
    </MDBRow>
  );
}

export default Index;
