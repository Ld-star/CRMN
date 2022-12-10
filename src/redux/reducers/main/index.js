/*
In this file we are declaring all the data variables that want to access globally and using the switch statement
updating data of these variables.
*/

const initialState = {
  sensorData: [],
  hub: [],
  rebootTimes: [],
  installData: [],
  user: [],
  users: [],
  pairedSensors: [],
  newSensors: [],
  sensorList: [],
  pairedBleDevices: [],
  macAddress: [],
  dataUsage: [],
  errorLog: [],
  allNotes: [],
  bleData: [],
  qAbleData: [],
  firmware: [],
  lastEvent: [],
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ACCOUNT_DETAILS_DATA":
      const { data } = action;
      return {
        ...state,
        pairedSensors: data.PairedSensors ? data.PairedSensors : [],
        newSensors: data.NewSensors ? data.NewSensors : [],
        sensorList: data.PairedSensors
          ? [...data.PairedSensors, ...data.NewSensors]
          : [],
        pairedBleDevices: data.BleDevices ? data.BleDevices : [],
        hub: data.Hub ? data.Hub : [],
        errorLog: data.ErrorLog ? data.ErrorLog.Errors : [],
        user:
          data.Users instanceof Array && data.Users.length > 0
            ? data.Users[0]
            : [],
        users: data.Users ? data.Users : [],
        macAddress: data.Hub
          ? JSON.parse(JSON.stringify(data.Hub.MacAddress).toUpperCase())
          : [],
        rebootTimes:
          data.RebootTimes instanceof Array && data.RebootTimes.length > 0
            ? data.RebootTimes.reverse()
            : [],
        sensorData:
          data.SensorData instanceof Array && data.SensorData.length > 0
            ? data.SensorData.sort(function (a, b) {
                return parseFloat(a.SensorID) - parseFloat(b.SensorID);
              })
            : [],
        bleData:
          data.HomeVitals?.Measurements instanceof Array &&
          data.HomeVitals?.Measurements.length > 0
            ? data.HomeVitals.Measurements
            : [],
        qAbleData:
          data.QAVitals?.Measurements instanceof Array &&
          data.QAVitals?.Measurements.length > 0
            ? data.QAVitals.Measurements
            : [],

        allNotes:
          data?.Notes instanceof Array && data.Notes.length > 0
            ? data.Notes
            : [],
      };

    case "STATUS":
      return {
        ...state,
        //hub: action.data.Hub.status && action.data.Hub.hubStatus,
      };

    case "HOME_SCREEN_DATA":
      return {
        ...state,
        homeScreenData: action.data ? action.data : [],
        lastEvent: action.data ? action.data.LastEvent : "",
      };

    case "HUBS_LIST":
      return {
        ...state,
        hubsList: action.data ? action.data : [],
      };

    case "FIRMWARE":
      return {
        ...state,
        firmware: action.data,
      };

    case "TOKEN":
      return {
        ...state,
        token: action.data,
      };

    case "ALERTS_PREFERENCES":
      return {
        ...state,
        alerts: action.data,
      };

    case "INSTALL_DATA":
      let installData = state.installData.reduce((acc, item) => {
        if (item.sensor !== action.data.sensor)
          acc.push({ ...item, asOfDate: false });
        return acc;
      }, []);

      return {
        ...state,
        installData: action.data ? [...installData, action.data] : [],
      };

    case "GET_DATA_USAGE":
      return {
        ...state,
        dataUsage: action.data ? action.data : [],
      };
    case "GET_ALL_NOTES":
      return {
        ...state,
        allNotes: action.data,
      };

    case "GET_ALL_ORDERS":
      return {
        ...state,
        allOrders: action.data,
      };

    case "ERROR":
      return {
        ...state,
        error: action.data,
      };

    case "SUCCESS":
      return {
        ...state,
        success: action.data,
      };

    default:
      return state;
  }
};

export default mainReducer;
