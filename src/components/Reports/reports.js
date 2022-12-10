import React, { useEffect, useState } from "react";
import Notifications, { notify } from "react-notify-toast";
import { Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearStore, getHubsList } from "../../redux/actions/main/index";
import store from "../../Data/UserData.json";
import "../../assets/css/firmwareSettings.scss";

const Reports = (props) => {
  const [hubsList, setHubsList] = useState([]);
  const [targetdVersion, setTargetdVersion] = useState(null);
  const [test, setTest] = useState(false);
  const dispatch = useDispatch();
  //const store = useSelector((state) => state.main);

  //dispatch(clearStore());

  useEffect(() => {
    if (store) {
      console.log("store", store);
      //dispatch(getHubsList());
    }
    if (store.hubsList) setHubsList(store.hubsList);
  }, [store.hubsList]);

  useEffect(() => {
    // refresh data after every 60 seconds
    const interval = setInterval(() => {
      if (store.hubsList) {
        setHubsList(store.hubsList);
      }
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const hubOffline = (time) => {
    Date.now();
    let lastSeen = Date.now() - new Date(time);
    return lastSeen >= 3660000 ? false : true;
  };

  const sensorTriggered = (sensorsData) => {
    Date.now();
    let lastSeen = Date.now() - 1663098491;
    if (Array.isArray(sensorsData)) {
      let result = sensorsData?.filter(
        (sensor) => sensor.LastActiveTime < lastSeen
      );
      return result.length > 0 ? false : true;
    }
  };

  const sensorOffline = (sensorsData) => {
    if (Array.isArray(sensorsData)) {
      let result = sensorsData.filter(
        (sensor) => sensor.LastStatus === "OFFLINE"
      );
      return result.length !== 0 ? false : true;
    }
  };

  const filterHubs = (filter) => {
    setHubsList(store.hubsList);

    if (filter === "Hubs Offline") {
      setHubsList(
        store.hubsList.filter(
          (hub) => hubOffline(hub.Hub.LastActiveTime) === false
        )
      );
    }

    if (filter === "Sensor Offline") {
      setHubsList(
        store.hubsList.filter((hub) => sensorOffline(hub.SensorData) === false)
      );
    }

    if (filter === "Sensor Triggered") {
      setHubsList(
        store.hubsList.filter(
          (hub) => sensorTriggered(hub.SensorData) === false
        )
      );
    }
  };

  const handleNext = (e) => {
    props.history.push({
      pathname: "/hub/" + e.ID,
      state: e,
    });
  };

  return (
    <div className="firmware-settings-container">
      <Notifications options={{ top: "10px" }} />
      <div className="firmware-settings-buttons">
        <select
          className={
            targetdVersion && targetdVersion !== "Firmware"
              ? "firmware-settings-dropDown-selected"
              : "firmware-settings-dropDown"
          }
          onChange={(e) => filterHubs(e.target.value)}
        >
          <option value={null}>Filter by</option>
          {["Hubs Offline", "Sensor Offline", "Sensor Triggered"].map(
            (filter) => (
              <option value={filter}>{filter}</option>
            )
          )}
        </select>
      </div>
      <Row>
        <Col xs="12">
          <div className="common-main-table" id="reports-table">
            {/* <Table responsive hover> */}
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>MAC Address</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Hub Status</th>
                  <th>Sensors Offline</th>
                  <th>Last 7 days</th>
                </tr>
              </thead>
              <tbody>
                {!store.hubsList?.length > 0 ? (
                  <div>Checking hub logs...</div>
                ) : (
                  hubsList?.map((hub, index) => (
                    <tr key={index} onClick={() => handleNext(hub.Hub)}>
                      <td>{hub.Hub.ID}</td>
                      <td>
                        {hub.Hub.MacAddress
                          ? hub.Hub.MacAddress.toUpperCase()
                          : ""}
                      </td>
                      <td>
                        {hub.Users[0]?.FirstName ? hub.Users[0].FirstName : ""}
                      </td>
                      <td>
                        {hub.Users[0]?.LastName ? hub.Users[0].LastName : ""}
                      </td>
                      <td>
                        {hub.Hub.LastActiveTime ? (
                          hubOffline(hub.Hub.LastActiveTime) ? (
                            <span className="span-active-color">Active</span>
                          ) : (
                            <span className="span-down-color">Down</span>
                          )
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>
                        {hub.Hub.LastActiveTime ? (
                          sensorOffline(hub.SensorData) ? (
                            hub.SensorData.length === 0 ? (
                              <span className="span-active-color"></span>
                            ) : (
                              <span className="span-active-color">Online</span>
                            )
                          ) : (
                            <span className="span-down-color">Offline</span>
                          )
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>
                        {hub.Hub.LastActiveTime ? (
                          sensorTriggered(hub.SensorData) ? (
                            hub.SensorData.length === 0 ? (
                              <span className=""></span>
                            ) : (
                              <span className="span-active-color">
                                Triggered
                              </span>
                            )
                          ) : (
                            <span className="span-down-color">No</span>
                          )
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Reports;
