import auth from "./authService";
const fetch = require("node-fetch");

global.Headers = fetch.Headers;

export async function hubSearch(keyWord) {
  try {
    const url = `${auth.getApi()}/hub?macSegment=${keyWord}`;
    const resp = await fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: auth.BasicAuth(),
        "Content-Type": "application/json",
      }),
    });

    let data = await resp.json();
    return data;
  } catch (e) {
    return e;
  }
}

export async function hubsList() {
  try {
    const url = `${auth.getApi()}/hubsList`;
    const resp = await fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: auth.BasicAuth(),
        "Content-Type": "application/json",
      }),
    });

    let data = await resp.json();

    return data;
  } catch (e) {
    return e;
  }
}

export async function UpdateHubInfo(macAddress, status) {
  try {
    const url = `${auth.getApi()}/hubinfo?macAddress=${macAddress}&status=${status}`;
    const resp = await fetch(url, {
      method: "PUT",
      headers: new Headers({
        Authorization: auth.BasicAuth(),
        "Content-Type": "application/json",
      }),
    });

    let data = await resp.json();
    return data;
  } catch (e) {
    return e;
  }
}

export async function getFirmware() {
  try {
    const url = `${auth.getApi()}/hubfirmware`;
    const resp = await fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: auth.BasicAuth(),
        "Content-Type": "application/json",
      }),
    });
    let data = await resp.json();

    return data;
  } catch (e) {}
}

export async function setFirmware(
  Version,
  targetdRFZWAVE,
  targetdZWAVECONFIG,
  targetdBLE,
  targetdSTOVEFIRMWARE,
  HubIds
) {
  const url = `${auth.getApi()}/hubfirmware`;
  const data = [
    {
      Version: Version,
      TARGET_RF_VERSION: targetdRFZWAVE,
      TARGET_ZWAVE_CONFIG_VERSION: targetdZWAVECONFIG,
      TARGET_RF_BLE_VERSION: targetdBLE,
      TARGET_STOVE_FIRMWARE_VERSION: targetdSTOVEFIRMWARE,
      HubIds: HubIds,
    },
  ];

  const resp = await fetch(url, {
    method: "POST",
    headers: new Headers({
      Authorization: auth.BasicAuth(),
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(data),
  });

  return resp;
}

export default {
  hubSearch,
  getFirmware,
  setFirmware,
  UpdateHubInfo,
};
