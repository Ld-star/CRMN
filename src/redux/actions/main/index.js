/*
These functions are action creators, whenever we want to change data we make a function and dispatch the type and value.
The type is the same that we declared in reducer switch statement.

we can access the data variables using the useSelector() function that react-redux provide.
*/

import {
  getHomeData,
  getAlertPreferences,
} from "../../../services/homeService";
import { setInstall, getInstall } from "../../../services/installService";
import {
  getFirmware,
  setFirmware,
  hubsList,
  UpdateHubInfo,
} from "../../../services/hubService";

import {
  addDevice,
  addSimCard,
  addNote,
  assignHome,
  getUserData,
  removeSensor,
  removeDevice,
  UpdateCustomerInfo,
} from "../../../services/userService";

import { getUserUsage } from "../../../services/twilioServices";
import { notes } from "../../../Data/notes";
import { orders } from "../../../Data/orders";

export const clearStore = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_STORE", data: {} });
  };
};

//HubService

export const UpdateHubMode = (macAddress, status) => {
  return (dispatch) => {
    UpdateHubInfo(macAddress, status).then((resp) => {
      dispatch({ type: "STATUS", data: resp });
    });
  };
};

export const getFirmwareVersion = () => {
  return (dispatch) => {
    getFirmware().then((resp) => {
      dispatch({ type: "FIRMWARE", data: resp });
    });
  };
};

export const getHubsList = () => {
  return (dispatch) => {
    hubsList().then((resp) => {
      dispatch({ type: "HUBS_LIST", data: resp });
    });
  };
};

export const setFirmwareVersion = (
  Version,
  targetdRFZWAVE,
  targetdZWAVECONFIG,
  targetdBLE,
  targetdSTOVEFIRMWARE,
  HubIds
) => {
  return (dispatch) => {
    setFirmware(
      Version,
      targetdRFZWAVE,
      targetdZWAVECONFIG,
      targetdBLE,
      targetdSTOVEFIRMWARE,
      HubIds
    ).then((resp) => {
      if (resp) {
        resp.Error || !resp.ok
          ? dispatch({ type: "ERROR", data: "Unable change firmware version" })
          : dispatch({
              type: "SUCCESS",
              data: "Firmware version set successfully",
            });
      }
      getFirmwareVersion();
    });
  };
};

//homeService

export const getHomeScreenData = (email) => {
  return (dispatch) => {
    getHomeData(email).then((resp) => {
      if (resp) {
        dispatch({ type: "HOME_SCREEN_DATA", data: resp });
      }
    });
  };
};

export const getAlertsPreferences = (email) => {
  return (dispatch) => {
    getAlertPreferences(email).then((resp) => {
      if (resp) {
        dispatch({ type: "ALERTS_PREFERENCES", data: resp });
      }
    });
  };
};

//installService
export const setInstallDate = (homeId) => {
  return (dispatch) => {
    setInstall(homeId);
  };
};

export const getSensorInstallStatus = (homeId, sensorId, asOfDate) => {
  return (dispatch, getState) => {
    getInstall(homeId, sensorId, asOfDate).then((resp) => {
      if (resp) {
        dispatch({
          type: "INSTALL_DATA",
          data: { sensor: sensorId, asOfDate, HasData: resp.HasData },
        });
      }
    });
  };
};

//userService

export const updateCustomer = (customer) => {
  return (dispatch) => {
    UpdateCustomerInfo(customer).then((resp) => {
      if (resp) {
        dispatch({ type: "CUSTOMER_UPDATE_DATA", data: resp });
      }
    });
  };
};

export const getAccountDetailsData = (email, macSegment, date) => {
  return (dispatch) => {
    getUserData(email, macSegment, date).then((resp) => {
      if (resp) {
        dispatch({ type: "GET_ACCOUNT_DETAILS_DATA", data: resp });
      }
    });
  };
};

export const getDataUsageInfo = (SimCardId) => {
  return (dispatch) => {
    getUserUsage(SimCardId).then((resp) => {
      if (resp) {
        dispatch({ type: "GET_DATA_USAGE", data: resp });
      }
    });
  };
};

export const addBLEDevice = (hub, macAddress, deviceType) => {
  let newBleDevice = {
    HubId: hub,
    MacAddress: macAddress,
    Type: deviceType,
    PairedDate: new Date().toISOString(),
  };
  return (dispatch, getState) => {
    addDevice(hub, macAddress, deviceType).then((resp) => {
      if (resp) {
        resp.Error || !resp.ok
          ? dispatch({ type: "ERROR", data: "Unable add Ble device" })
          : dispatch({
              type: "SUCCESS",
              data: "Ble device added successfully",
            });
      }
    });
    const pairedBleDevices = getState().main.pairedBleDevices;
    pairedBleDevices.push(newBleDevice);
  };
};

export const removeBLEDevice = (hub, macAddress, deviceType) => {
  return (dispatch, getState) => {
    removeDevice(hub, macAddress, deviceType).then((resp) => {
      if (resp) {
        resp.Error || !resp.ok
          ? dispatch({ type: "ERROR", data: "Unable to remove Ble device" })
          : dispatch({
              type: "SUCCESS",
              data: "Ble device removed successfully",
            });
      }
    });
    const pairedBleDevices = getState().main.pairedBleDevices;
    pairedBleDevices.map((item, index) => {
      if (item.MacAddress.toUpperCase() === macAddress.toUpperCase()) {
        pairedBleDevices.splice(index, 1);
      }
    });
  };
};

export const addNewSim = (hub, SimCardId, oldSim, status) => {
  return (dispatch, getState) => {
    addSimCard(hub, SimCardId, oldSim, status).then((resp) => {
      if (resp) {
        resp.Error || !resp.ok
          ? dispatch({ type: "ERROR", data: "Unable to add sim" })
          : dispatch({ type: "SUCCESS", data: "Sim added successfully" });
      }
      const state = getState().main.hub;
      state.SimCardId = SimCardId;
    });
  };
};

export const addHomeId = (hubID, homeID, oldHomeID) => {
  return (dispatch, getState) => {
    assignHome(hubID, homeID, oldHomeID).then((resp) => {
      if (resp) {
        resp.Error || !resp.ok
          ? dispatch({ type: "ERROR", data: resp.Error })
          : dispatch({ type: "SUCCESS", data: "home added successfully" });
      }
      const state = getState().main.user;
      state.HomeID = homeID;
    });
  };
};

export const clearError = () => {
  return (dispatch, getState) => {
    const state = getState().main;
    state.error = null;
    state.success = null;
  };
};

export const deletePairedSensor = (hub, sensorid) => {
  return (dispatch, getState) => {
    removeSensor(hub, sensorid).then((resp) => {
      if (resp) {
        resp.Error || !resp.ok
          ? dispatch({ type: "ERROR", data: "Unable to remove sensor" })
          : dispatch({ type: "SUCCESS", data: "sensor removed successfully" });
      }
    });
    const state = getState().main;
    state.pairedSensors = state.pairedSensors.filter(
      (item) => item.Key !== sensorid
    );
  };
};

export const getAllOrdersData = () => {
  return (dispatch) => {
    dispatch({ type: "GET_ALL_ORDERS", data: orders });
  };
};

export const addNewNote = (note, homeID, user) => {
  return (dispatch, getState) => {
    addNote(note, homeID, user).then((resp) => {
      if (resp) {
        resp.Error || !resp.ok
          ? dispatch({ type: "ERROR", data: "Unable to add notes" })
          : dispatch({ type: "SUCCESS", data: "Note is added successfully" });
      }
      const state = getState().main.user;
      state.HomeID = homeID;
    });
    const state = getState().main.allNotes;
    state.push({
      note,
    });
  };
};
