//import { isUndefined } from "util";
import axios from "axios";
import Cookies from "universal-cookie";
import app from "../../app.json";

const cookies = new Cookies();
const { APIHOST } = app;

export function calcularExpiracionSesion() {
  const now = Date.now();
  const newDate = now + 60 * 30 * 1000; // 30 min
  return new Date(newDate);
}

export function getSesion() {
  // evitar util.isUndefined en frontend
  const val = cookies.get("_s");
  return typeof val === "undefined" ? false : val;
}

function renovarSesion() {
  const sesion = getSesion();
  if (!sesion) {
    window.location.href = "/login";
    return null;
  }

  cookies.set("_s", sesion, {
    path: "/",
    expires: calcularExpiracionSesion(),
  });
  return sesion;
}

export const request = {
  get(services) {
    const token = renovarSesion();
    return axios.get(`${APIHOST}${services}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  post(services, data) {
    const token = renovarSesion();
    return axios.post(`${APIHOST}${services}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  put(services, data) {
    const token = renovarSesion();
    return axios.put(`${APIHOST}${services}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  delete(services) {
    const token = renovarSesion();
    return axios.delete(`${APIHOST}${services}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
