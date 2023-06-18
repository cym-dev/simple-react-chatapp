import axios from "axios";
import { toast } from "react-toastify";
import io from "socket.io-client";
import DefaultUser from "../assets/images/default.jpg";
import ErrorNull from "../assets/images/404.jpg";
import ErrorBadRequest from "../assets/images/400.png";

export const PresetUser = DefaultUser;
export const ErrorPage = ErrorNull;
export const ErrorFalse = ErrorBadRequest;

export const ENDPOINT = "http://localhost:5000"; // server (specify ip if you will debug in other devices)
// export const ENDPOINT = window.location.origin; // deployed

export const socket = io.connect(ENDPOINT);

export const auth = JSON.parse(localStorage.getItem("user"));
export const token = localStorage.getItem("token");

export const register = data =>
  axios
    .post("auth/save", data)
    .then(() => true)
    .catch(err => {
      toast.error(err.response.data.error);
      return false;
    });
