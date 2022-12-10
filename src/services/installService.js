import auth from "./authService";
const fetch = require("node-fetch");
global.Headers = fetch.Headers;

export async function getInstall(homeId, sensorId, asOfDate) {
  const url = `${auth.getApi()}/HomeInstall?homeId=${homeId}&sensorId=${sensorId}&asOfDate=${asOfDate}`;
  const resp = await fetch(url, {
    method: "GET",
    headers: new Headers({
      Authorization: auth.BasicAuth(),
      "Content-Type": "application/json",
    }),
  });

  let data = await resp.json();
  return data;
}

export async function setInstall(homeId) {
  const asOfDate = new Date();
  const url = `${auth.getApi()}/HomeInstall?homeId=${homeId}&asOfDate =${asOfDate}`;
  const resp = await fetch(url, {
    method: "POST",
    headers: new Headers({
      Authorization: auth.BasicAuth(),
      "Content-Type": "application/json",
    }),
  });

  let data = await resp.json();
  return data;
}
