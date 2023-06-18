import axios from "axios";
import { toast } from "react-toastify";

const breached = localStorage.getItem("rush_reload") || false;

export const login = async (email, password) =>
  await axios
    .get(`auth/login?email=${email}&password=${password}`)
    .then(async res => {
      if (res.data.error) {
        toast.warn(res.data.error);
        // throw new Error(res.data.error);
      } else {
        await toast.success(`Hello, ${email}`);
        await localStorage.setItem("token", res.data.token);
        await localStorage.setItem("user", JSON.stringify(res.data.user));

        return res.data;
      }
    });

export const browse = async (entity, key = "", token) => {
  if (!breached) {
    if (typeof key === "object") {
      key = `?${Object.keys(key)
        .map(i => `${i}=${key[i]}`)
        .join("&")}`;
    } else if (key) {
      key = `?key=${key}`;
    }

    return await axios
      .get(`${entity}${key}`, {
        headers: {
          Authorization: `Cheo ${token}`,
        },
      })
      .then(res => res.data)
      .catch(err => {
        if (err.response.data.expired) {
          toast.warn("Session expired, login again.");
        }
        toast.error(err.response.data.error);
        return [];
        // throw new Error(err);
      });
  }
};

export const find = async (entity, pk, token) =>
  !breached &&
  axios
    .get(`${entity}/${pk}/find`, {
      headers: {
        Authorization: `Cheo ${token}`,
      },
    })
    .then(res => res.data)
    .catch(err => {
      if (err.response.data.expired) {
        toast.warn("Session expired, login again.");
      }
      toast.error(err.response.data.error);
      throw new Error(err);
    });

export const save = async (entity, form, token, willToast = true) =>
  !breached &&
  axios
    .post(`${entity}/save`, form, {
      headers: {
        Authorization: `Cheo ${token}`,
      },
    })
    .then(res => {
      if (willToast) {
        toast.success("Item saved successfully");
      }
      return res.data;
    })
    .catch(err => {
      if (err.response.data.expired) {
        toast.warn("Session expired, login again.");
      }
      toast.error(err.response.data.error);
      throw new Error(err);
    });

export const update = (entity, data, id, token, willToast = true) =>
  !breached &&
  axios
    .put(`${entity}/${id}/update`, data, {
      headers: {
        Authorization: `Cheo ${token}`,
      },
    })
    .then(res => {
      if (willToast) {
        toast.info("Item updated successfully");
      }
      return res.data;
    })
    .catch(err => {
      if (err.response.data.expired) {
        toast.warn("Session expired, login again.");
      }
      toast.error(err.response.data.error);
      throw new Error(err);
    });

export const destroy = async (entity, id, token) =>
  !breached &&
  axios
    .delete(`${entity}/${id}/destroy`, {
      headers: {
        Authorization: `Cheo ${token}`,
      },
    })
    .then(res => {
      toast.success("Item deleted successfully");
      return res.data;
    })
    .catch(err => {
      if (err.response.data.expired) {
        toast.warn("Session expired, login again.");
      }
      toast.error(err.response.data.error);
      throw new Error(err);
    });
