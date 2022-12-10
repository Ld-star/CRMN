import auth from "./authService";
import hubService from "./hubService";
import { getSimResource, simResource, simIccid } from "./twilioServices";
import users from "../Data/Users.json";

const fetch = require("node-fetch");
global.Headers = fetch.Headers;

export async function userSearch(keyWord) {
  return users;
  const url = `${auth.getApi()}/UserSearch?emailAddress=${keyWord}&macSegment=${keyWord}&lastName=${keyWord}`;
  const resp = await fetch(url, {
    method: "GET",
    headers: new Headers({
      Authorization: auth.BasicAuth(),
      "Content-Type": "application/json",
    }),
  });

  let data = await resp.json();
  if (data.length === 0) {
    data = hubService.hubSearch(keyWord);
  }
  return data;
}

export async function getUserData(email, macSegment, date) {
  return;
  const endDate = date && new Date(date).toISOString();
  try {
    const url = `${auth.getApi()}/troubleshootingdata?email=${
      email ? email : ""
    }&macSegment=${macSegment ? macSegment : ""}&endDate=${
      endDate ? endDate : ""
    }`;

    const resp = await fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: auth.BasicAuth(),
      }),
    });
    let data = await resp.json();
    return data;
  } catch (e) {}
}

export async function UpdateCustomerInfo(customer) {
  const url = `${auth.getApi()}/customerInfo`;
  const resp = await fetch(url, {
    method: "PUT",
    headers: new Headers({
      Accept: "application/json",
      Authorization: auth.BasicAuth(),
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(customer),
  });
}

export async function getUserLogs(hubId) {
  const url = `${auth.getApi()}/huberrorlog?hubId=${hubId}`;
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

export async function addNote(note, homeID, user) {
  const url = `${auth.getApi()}/Notes?homeId=${homeID}&user=${user}&note=${note}`;
  const resp = await fetch(url, {
    method: "POST",
    headers: new Headers({
      Authorization: auth.BasicAuth(),
      "Content-Type": "application/json",
    }),
  });
  return resp;
}

export async function addDevice(hub, macAddress, deviceType) {
  const newBleDevice = {
    HubId: hub.ID,
    MacAddress: macAddress,
    Type: deviceType,
  };

  const url = `${auth.getApi()}/BleDevice`;
  const resp = await fetch(url, {
    method: "POST",
    headers: new Headers({
      Authorization: auth.BasicAuth(),
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(newBleDevice),
  });
  return resp;
}

export async function removeDevice(hub, macAddress, deviceType) {
  const bleDevice = {
    HubId: hub.ID,
    MacAddress: macAddress,
    Type: deviceType,
  };

  const url = `${auth.getApi()}/BleDevice`;
  const resp = await fetch(url, {
    method: "DELETE",
    headers: new Headers({
      Authorization: auth.BasicAuth(),
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(bleDevice),
  });
  return resp;
}

export async function removeSensor(hub, sensorid) {
  const url = `${auth.getApi()}/zwavesensor?hubid=${
    hub.ID
  }&sensorid=${sensorid}`;
  const resp = await fetch(url, {
    method: "DELETE",
    headers: new Headers({
      Authorization: auth.BasicAuth(),
    }),
  });
  return resp;
}

export async function assignHome(hubID, homeID, oldHomeID) {
  const url = `${auth.getApi()}/hub?hubid=${hubID}&homeid=${homeID}&oldHome=${oldHomeID}`;
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

export async function addSimCard(hub, SimCardId, oldSim, status) {
  const sid = SimCardId.match(/[a-z]/i) ? SimCardId : await simIccid(SimCardId);

  //let status = await getSimResource(sid);

  const body = {
    ID: hub.ID,
    SimCardId: sid,
  };

  const url = `${auth.getApi()}/hub?simCardId=${sid}`;
  const resp = await fetch(url, {
    method: "PUT",
    headers: new Headers({
      Authorization: auth.BasicAuth(),
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(body),
  });

  if (oldSim !== sid) {
    simResource(oldSim, `${oldSim}`, "inactive");
  }
  simResource(sid, `Prod User ${hub.MacAddress}`, status);
  return resp;
}
