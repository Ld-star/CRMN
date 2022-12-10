import React, { useContext, useEffect, useState } from "react";
import $ from "jquery";
import Notifications, { notify } from "react-notify-toast";
import SideBar from "./sideBar";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import Logs from "./tabs/Logs";
import HubTab from "./tabs/Hub";
import ZwaveSensors from "./tabs/ZwaveSensors";
import BLEDevices from "./tabs/BLEDevices";
import DataUsageTab from "./tabs/DataUsage";
import Notes from "./tabs/Notes";
import Alerts from "./tabs/Alerts";
import Install from "./tabs/Install";
import store from "../Data/UserData.json";

import { useDispatch, useSelector } from "react-redux";
import {
  getAccountDetailsData,
  getDataUsageInfo,
  clearError,
  getFirmwareVersion,
  getHomeScreenData,
  getAlertsPreferences,
} from "../redux/actions/main/index";
import "../assets/css/account-details.scss";

import { ThemeContext } from "../assets/theme/ThemeContext";
import { SiZwave, SiBluetooth, SiBlockchaindotcom } from "react-icons/si";
import {
  MdNetworkCell,
  MdOutlineError,
  MdNoteAlt,
  MdEditNotifications,
} from "react-icons/md";

const AccountDetails = (props) => {
  const [user] = useState(props.location.state);
  const { themeColor } = useContext(ThemeContext);
  const userName = localStorage.getItem("username");

  const dispatch = useDispatch();
  //const store = useSelector((state) => state.main);
  store.success && notify.show(store.success, "success", 3000);
  store.error && notify.show(store.error, "error", 3000);
  dispatch(clearError());

  useEffect(() => {
    if (store && store.hub) {
      dispatch(getAccountDetailsData(user.EmailAddress, user.MacAddress));
      dispatch(getHomeScreenData(user.EmailAddress));
      dispatch(getAlertsPreferences(user.EmailAddress));
    }
  }, []);

  useEffect(() => {
    if (store && store.hub) {
      dispatch(getFirmwareVersion());
    }
  }, []);

  useEffect(() => {
    if (store?.hub?.ID) {
      dispatch(getHomeScreenData(user.EmailAddress));
      dispatch(getDataUsageInfo(store.hub.SimCardId));
    }
  }, [store?.hub?.ID]);

  useEffect(() => {
    // refresh data after every 60 seconds
    const interval = setInterval(() => {
      if (store && store.hub) {
        dispatch(getAccountDetailsData(user.EmailAddress, user.MacAddress));
        dispatch(getHomeScreenData(user.EmailAddress));
        dispatch(getAlertsPreferences(user.EmailAddress));
      }
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (e) => {
    $("." + e.target.id).toggle();
  };

  const getMoreDate = (date) => {
    dispatch(getAccountDetailsData(user.EmailAddress, user.MacAddress, date));
  };

  const checkStatus = (time) => {
    Date.now();
    let lastSeen = Date.now() - new Date(time);
    return lastSeen >= 36600 ? (
      <span className="span-down-color">Down</span>
    ) : (
      <span className="span-active-color">Online</span>
    );
  };

  return (
    <div>
      <div className="container-fluid emp-profile">
        <Notifications />
        <Row>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <SideBar
              resident={store && store.users.filter((user) => user.Role === 1)}
              lastEvent={store.lastEvent && store.lastEvent}
              getDataUsageInfo={getDataUsageInfo}
              macAddress={store && store.macAddress && store.macAddress}
              hub={store && store.hub && store.hub}
              user={store && store.users[0] && store.users[0]}
              props={props}
              sensorData={store && store.sensorData && store.sensorData}
              homeScreenData = { store.homeScreenData }
            />
          </Col>
          <Col xs="12" sm="12" md="12" lg="8" xl="8">
            <div className="account-details-tabs-section" id="custom-tabs">
              {userName === "admin" ? (
                <Tabs defaultActiveKey={"Hub"}>
                  <Tab
                    eventKey="Hub"
                    title={
                      <div className="tabs-con">
                        <SiBlockchaindotcom className="keg-tabs" />
                        Hub
                      </div>
                    }
                  >
                    <HubTab
                      handleClick={handleClick}
                      checkStatus={checkStatus && checkStatus}
                      RebootTimes={
                        store && store.rebootTimes && store.rebootTimes
                      }
                      hub={store && store.hub && store.hub}
                    />
                  </Tab>
                  <Tab
                    eventKey="Sensors"
                    title={
                      <div className="tabs-con">
                        <SiZwave className="keg-tabs" />
                        Z-Wave Sensors
                      </div>
                    }
                  >
                    <ZwaveSensors
                      getMoreDate={getMoreDate}
                      macAddress={store && store.macAddress && store.macAddress}
                      hub={store && store.hub && store.hub}
                      emailAddress={user.EmailAddress}
                      handleClick={handleClick}
                      SensorData={store && store.sensorData && store.sensorData}
                      newSensors={store && store.newSensors && store.newSensors}
                      pairedSensors={
                        store && store.pairedSensors && store.pairedSensors
                      }
                    />
                  </Tab>
                  <Tab
                    eventKey="BLEDevices"
                    title={
                      <div className="tabs-con">
                        <SiBluetooth className="keg-tabs" />
                        BLE Devices
                      </div>
                    }
                  >
                    <BLEDevices
                      bleData={store && store.bleData && store.bleData}
                      qAbleData={store && store.qAbleData && store.qAbleData}
                      macAddress={store && store.macAddress && store.macAddress}
                      hub={store && store.hub && store.hub}
                      pairedBleDevices={
                        store &&
                        store.pairedBleDevices &&
                        store.pairedBleDevices
                      }
                      newDevices={store && store.newDevices && store.newDevices}
                    />
                  </Tab>
                  <Tab
                    eventKey="DataUsage"
                    title={
                      <div className="tabs-con">
                        <MdNetworkCell className="keg-tabs" />
                        Data Usage
                      </div>
                    }
                  >
                    <DataUsageTab
                      dataUsage={store && store.dataUsage && store.dataUsage}
                      themeColor={themeColor}
                      sim={store.hub.SimCardId}
                    />
                  </Tab>
                  <Tab
                    eventKey="Logs"
                    title={
                      <div className="tabs-con">
                        <MdOutlineError className="keg-tabs" />
                        Logs
                      </div>
                    }
                  >
                    <Logs
                      errorLog={store && store.errorLog && store.errorLog}
                    />
                  </Tab>
                  <Tab
                    eventKey="Notes"
                    title={
                      <div className="tabs-con">
                        <MdNoteAlt className="keg-tabs" />
                        Notes
                      </div>
                    }
                  >
                    <Notes
                      notify={notify}
                      user={userName}
                      homeID={user.HomeID}
                    />
                  </Tab>
                  <Tab
                    eventKey="Alerts"
                    title={
                      <div className="tabs-con">
                        <MdEditNotifications className="keg-tabs" />
                        Alerts Preference
                      </div>
                    }
                  >
                    <Alerts alerts={store.alerts} />
                  </Tab>
                </Tabs>
              ) : (
                <Tabs defaultActiveKey={"Install"}>
                  <Tab
                    eventKey="Install"
                    title={
                      <div className="tabs-con">
                        <SiZwave className="keg-tabs" />
                        Install
                      </div>
                    }
                  >
                    <Install
                      hub={store && store.hub && store.hub}
                      emailAddress={user.EmailAddress}
                      homeID={user.HomeID}
                      handleClick={handleClick}
                      sensorList={store && store.sensorList && store.sensorList}
                      installData={
                        store && store.installData && store.installData
                      }
                    />
                  </Tab>
                </Tabs>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AccountDetails;
