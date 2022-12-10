import auth from "./authService";
import { queryString } from "../components/utils/HelperFunctions";

const fetch = require("node-fetch");
global.Headers = fetch.Headers;

export async function getHomeData(email) {
  try {
    getHubStatus(email);

    const url = `${auth.getApi()}/HomeScreens?email=${email}`;

    const resp = await fetch(url, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        Authorization: auth.BasicAuth(),
        "Content-Type": "application/json",
      }),
    });

    const data = await resp.json();
    return data;
  } catch (e) {}
}

export async function getRecentData(email) {
  const url = `${auth.getApi()}/MostRecentEvents?email=${email}`;
  const resp = await fetch(url, {
    method: "GET",
    headers: new Headers({
      Accept: "application/json",
      Authorization: auth.BasicAuth(),
      "Content-Type": "application/json",
    }),
  });
  const data = await resp.json();
  return data;
}

export async function getHubStatus(email) {
  try {
    const url = `${auth.getApi()}/hubOnlineEvent?email=${email}`;
    const resp = await fetch(url, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        Authorization: auth.BasicAuth(),
        "Content-Type": "application/json",
      }),
    });
    const data = await resp.json();
    return data;
  } catch (e) {}
}

export async function getAlertPreferences(email) {
  try {
    const url = `${auth.getApi()}/AlertPreference?email=${email}`;
    const resp = await fetch(url, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        Authorization: auth.BasicAuth(),
        "Content-Type": "application/json",
      }),
    });
    const data = await resp.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

// export async function realTimeMode(token) {
//   if (!token) {
//     return;
//   }

//   const url = `${auth.getApi()}/HomeScreen `;
//   const resp = await fetch(url, {
//     method: "GET",
//     headers: new Headers({
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     }),
//   });
//   const data = await resp.json();
//   return data;
// }

// export async function sensorInstallStart(token, sensor) {
//   if (!token) {
//     return;
//   }
//   const url = `${auth.getApi()}/sensorInstallStart?${queryString({
//     sensorId: sensor,
//   })}`;

//   const resp = await fetch(url, {
//     method: "POST",
//     headers: new Headers({
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     }),
//   });
//   const data = await resp.json();
//   return data;
// }

// export async function sensorInstallEnd(token, sensor) {
//   if (!token) {
//     return;
//   }

//   const url = `${auth.getApi()}/sensorInstallEnd?${queryString({
//     sensorId: sensor,
//   })}`;

//   const resp = await fetch(url, {
//     method: "POST",
//     headers: new Headers({
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     }),
//   });
//   const data = await resp.json();
//   return data;
// }

// export async function installSensorData(token, sensor) {
//   if (!token) {
//     return;
//   }

//   const url = `${auth.getApi()}/InstallSensorData?${queryString({
//     sensorId: sensor,
//   })}`;

//   const resp = await fetch(url, {
//     method: "POST",
//     headers: new Headers({
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     }),
//   });
//   const data = await resp.json();
//   return data;
// }

export default {
  //getToken,
  getHomeData,
  getRecentData,
  getHubStatus,
  getAlertPreferences,
};
