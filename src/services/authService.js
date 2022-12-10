import {
  prod_Api,
  test_Api,
  twilio,
  superUser,
  prod_baseUrl,
  test_baseUrl,
} from "../config";
const fetch = require("node-fetch");
let base64 = require("base-64");
global.Headers = fetch.Headers;

export async function authenticate(user) {
  const tokenKey = `Basic ${base64.encode(
    user.username + ":" + user.password
  )}`;
  const url = `${getApi()}/UserSearch?`;

  const resp = await fetch(url, {
    method: "GET",
    headers: new Headers({
      Authorization: tokenKey,
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  });

  // if (resp.ok) {
  localStorage.setItem("tokenKey", tokenKey);
  localStorage.setItem("username", user.username);
  localStorage.setItem("api", true);
  // }
  let r = { ok: 200 };
  return r;
}

export function BasicAuth() {
  const tokenKey = localStorage.getItem("tokenKey");
  return tokenKey;
}

export function getTwilioJwt() {
  return `Basic ${base64.encode(twilio.username + ":" + twilio.password)}`;
}

export function getSuperJwt() {
  return `Basic ${base64.encode(
    superUser.username + ":" + superUser.password
  )}`;
}

export function getApi() {
  return localStorage.getItem("api") &&
    localStorage.getItem("api").toString() === "true"
    ? prod_Api
    : test_Api;
}

export default {
  authenticate,
  getSuperJwt,
  BasicAuth,
  getApi,
  getTwilioJwt,
};
