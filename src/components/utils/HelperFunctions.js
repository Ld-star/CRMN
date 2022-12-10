import moment from "moment";
import tz from "moment-timezone";

export function formatSizeUnits(bytes) {
  if (bytes >= 1073741824) {
    bytes = (bytes / 1073741824).toFixed(2) + " GB";
  } else if (bytes >= 1048576) {
    bytes = (bytes / 1048576).toFixed(2) + " MB";
  } else if (bytes >= 1024) {
    bytes = (bytes / 1024).toFixed(2) + " KB";
  } else if (bytes > 1) {
    bytes = bytes + " bytes";
  } else if (bytes === 1) {
    bytes = bytes + " byte";
  } else {
    bytes = "0 bytes";
  }
  return bytes;
}

export function formatMBSize(bytes) {
  if (bytes >= 1073741824) {
    bytes = (bytes / 1073741824).toFixed(2);
  } else if (bytes >= 1048576) {
    bytes = (bytes / 1048576).toFixed(2);
  } else if (bytes >= 1024) {
    bytes = (bytes / 1024).toFixed(2);
  } else if (bytes > 1) {
    bytes = bytes;
  } else if (bytes === 1) {
    bytes = bytes;
  } else {
    bytes = 0;
  }
  return bytes;
}

export function timeSince(date) {
  var utcDate = moment.utc(date);
  utcDate.tz("America/Chicago");

  var seconds = Math.floor((new Date() - new Date(utcDate)) / 1000);

  if (seconds >= 86400) {
    return (
      Math.floor(seconds / 86400) +
      ` ${Math.floor(seconds / 86400) > 1 ? "hours" : "hour"}`
    );
  }

  if (seconds >= 3600 && seconds < 86400) {
    return (
      Math.floor(seconds / 3600) +
      ` ${Math.floor(seconds / 3600) > 1 ? "hours" : "hour"}`
    );
  }

  if (seconds >= 60 && seconds < 3600) {
    return (
      Math.floor(seconds / 60) +
      ` ${Math.floor(seconds / 60) ? "minutes" : "minute"}`
    );
  }

  return Math.floor(seconds) + " seconds";
}

export function formatPhoneNumber(phoneNumberString) {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    var intlCode = match[1] ? "+1 " : "";
    return [, "(", match[2], ") ", match[3], "-", match[4]].join("");
  }
  return null;
}

export const navlightToggleColor = "#61dafb";
export const navdarkToggleColor = "#27bb86";
export const lightIconColor = "#eaedf2";
export const darkIconColor = "#3c414e";

export const switchOptions = {
  onHandleColor: "#ffffff",
  handleDiameter: 20,
  uncheckedIcon: false,
  checkedIcon: false,
  boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.6)",
  activeBoxShadow: "0px 0px 1px 10px rgba(0, 0, 0, 0.2)",
  height: 18,
  width: 42,
  className: "ml-3 react-switch",
};

/**
 * create a query string (no ?) by encoding the key/value pairs in params
 * @param {object} params object of key/value pairs
 * @returns {string} uri-encoded query string from the params
 */
export function queryString(params) {
  return Object.keys(params)
    .map((key) => {
      const raw = params[key];
      const value = typeof raw === "undefined" || raw === null ? "" : raw;

      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&");
}
