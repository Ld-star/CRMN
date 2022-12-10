import auth from "./authService";
const fetch = require("node-fetch");

global.Headers = fetch.Headers;

export async function getUserUsage(sid) {
  let usage_records = [];

  try {
    for (var i = 0; i < 19; i++) {
      var date = new Date();
      date.setDate(date.getDate() - i);

      var StartTime = date.toISOString().split("T")[0] + "T00:00:00Z";

      date = new Date();
      date.setDate(date.getDate() - (i - 1));
      var EndTime = date.toISOString().split("T")[0] + "T00:00:00Z";

      const url = `https://supersim.twilio.com/v1/UsageRecords?Sim=${sid}&granularity=${"day"}&pagesize=${50}&StartTime=${StartTime}&EndTime=${EndTime}`;
      const resp = await fetch(url, {
        method: "GET",
        headers: new Headers({
          Authorization: auth.getTwilioJwt(),
          "Content-Type": "application/json",
        }),
      });

      let data = await resp.json();
      if (data.usage_records[0]) {
        usage_records.push(data.usage_records[0]);
      }
    }
  } catch (e) {
    console.log(e);
  }
  return usage_records;
}

export async function getSimResource(sid) {
  const url = `https://supersim.twilio.com/v1/Sims/${sid}?`;
  const resp = await fetch(url, {
    method: "GET",
    headers: new Headers({
      Authorization: auth.getTwilioJwt(),
    }),
  });

  let data = await resp.json();
  return data.status;
}

export async function simResource(sid, uniqueName, status) {
  var details = {
    Fleet: "IOT",
    UniqueName: uniqueName,
    Status: status === "active" ? status : "ready",
  };
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const url = `https://supersim.twilio.com/v1/Sims/${sid}?`;
  const resp = await fetch(url, {
    method: "POST",
    headers: new Headers({
      Authorization: auth.getTwilioJwt(),
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    }),
    body: formBody,
  });

  let data = await resp.json();
  return data;
}

export async function simIccid(iccid) {
  const url = `https://supersim.twilio.com/v1/Sims?Iccid=${iccid}`;
  const resp = await fetch(url, {
    method: "GET",
    headers: new Headers({
      Authorization: auth.getTwilioJwt(),
      "Content-Type": "application/json",
    }),
  });

  let data = await resp.json();
  return data.sims[0].sid;
}
