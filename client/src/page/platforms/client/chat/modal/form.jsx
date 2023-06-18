import React, { useEffect } from "react";
import {
  MDBBadge,
  MDBCol,
  MDBInput,
  MDBRow,
  MDBSwitch,
} from "mdb-react-ui-kit";

export default function ModalForm({ form, handleForm, users, setUsers }) {
  const handlePushUser = async data => {
    var _user = JSON.parse(data);
    var models = [...form.users, _user];
    let newUsers = await users.filter(user => user._id !== _user._id);
    handleForm("users", models);
    await setUsers(newUsers);
  };
  return (
    <>
      <MDBRow>
        <MDBCol size={6} className="mb-2">
          <MDBInput
            label="Name"
            value={form.name}
            onChange={e => handleForm("name", e.target.value)}
            required
            onInvalid={e =>
              e.target.setCustomValidity("We name for this task.")
            }
            onInput={e => e.target.setCustomValidity("")}
          />
        </MDBCol>
        <MDBCol size={6} className="mb-2">
          <MDBSwitch
            id="isGroupChat"
            label={form.isGroupChat ? "groupChat" : "personal message"}
            value={form.isGroupChat}
            onChange={e => {
              handleForm("isGroupChat", !form.isGroupChat);
            }}
          />
        </MDBCol>
      </MDBRow>
      {(form.isGroupChat || (!form.isGroupChat && form.users.length < 1)) && (
        <MDBCol size={12} className="mb-2">
          <select
            name="user"
            id="user"
            onChange={e => {
              handlePushUser(e.target.value);
            }}
            defaultValue={""}
            className="form-select"
          >
            <option value="" disabled>
              Select user
            </option>
            {users?.map(user => {
              return (
                <option key={user._id} value={JSON.stringify(user)}>
                  {user.name}
                </option>
              );
            })}
          </select>
        </MDBCol>
      )}
      <MDBCol size={12} className="mb-2">
        {form.users.map(user => {
          return (
            <MDBBadge key={user._id} className="mx-1">
              {user.name}
            </MDBBadge>
          );
        })}
      </MDBCol>
    </>
  );
}
