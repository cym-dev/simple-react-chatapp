import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import ModalForm from "./form";
import { useState } from "react";
import { auth, token } from "../../../../../components/utilities";
import { browse, save, update } from "../../../../../services";

export default function ChatModal({
  visibility,
  setVisibility,
  toggleShow,
  data,
}) {
  const [form, setForm] = useState({
      name: "",
      isGroupChat: false,
      users: [],
      groupAdmin: auth?._id,
    }),
    [loading, setLoading] = useState(false),
    [avail, setAvail] = useState([]),
    [users, setUsers] = useState([]);

  useEffect(() => {
    if (!data._id) {
      setForm({
        name: "",
        isGroupChat: false,
        users: [auth?._id],
        groupAdmin: auth?._id,
      });
      browse("users", "", token).then(async data => {
        await setUsers(data);
      });
    } else {
      browse("users", "", token).then(async users => {
        var listUsers = users.filter(
          user => !data.users.some(access => user._id === access._id)
        );
        setUsers(listUsers);
      });
    }
  }, [visibility]);

  useEffect(() => {
    if (data._id) {
      setForm(data);
      toggleShow();
    }
  }, [data]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (data._id) {
      await update("chats", form, data._id, token);
    } else {
      await save("chats", form, token);
    }
    toggleShow();
  };

  const handleForm = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };
  return (
    <MDBModal show={visibility} setShow={setVisibility} tabIndex="-1">
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Chats Modal</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={toggleShow}
            ></MDBBtn>
          </MDBModalHeader>
          <form onSubmit={handleSubmit} autoComplete="off">
            <MDBModalBody>
              <ModalForm
                form={form}
                handleForm={handleForm}
                users={users}
                setUsers={setUsers}
              />
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn>Save changes</MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
