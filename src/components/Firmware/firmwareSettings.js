import React, { useEffect, useState } from "react";
import Notifications, { notify } from "react-notify-toast";
import { Col, Row, Modal, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BsCloudUpload } from "react-icons/bs";

import {
  clearError,
  getFirmwareVersion,
  setFirmwareVersion,
} from "../../redux/actions/main/index";
import "../../assets/css/firmwareSettings.scss";
import ZwaveSensors from "./../tabs/ZwaveSensors";

const FirmwareSettings = (props) => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [fileType, setFileType] = useState();

  const [confirmModal, setConfirmModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [hubsList, setHubsList] = useState([]);
  const [hubUpdateList, setHubUpdateList] = useState([]);
  const [targetdVersion, setTargetdVersion] = useState(null);
  const [targetdRFZWAVE, setTargetdRFZWAVE] = useState(null);
  const [targetdZWAVECONFIG, setTargetdZWAVECONFIG] = useState(null);
  const [targetdBLE, setTargetdBLE] = useState(null);
  const [targetdSTOVEFIRMWARE, setTargetdSTOVEFIRMWARE] = useState(null);

  const [test, setTest] = useState(false);
  const dispatch = useDispatch();
  const store = useSelector((state) => state.main);
  // store.success && notify.show(store.success, "success", 3000);
  // store.error && notify.show(store.error, "error", 3000);
  //setHubsList(store.firmware.Hubs);
  if (store.firmware && store.firmware.Hubs !== hubsList) {
    setHubsList(store.firmware.Hubs);
  }

  dispatch(clearError());

  useEffect(() => {
    if (store && store.firmware) {
      dispatch(getFirmwareVersion());
      setHubsList(store.firmware.Hubs);
      try {
        // setTargetdVersion(store.firmware?.Files[0]);
        // setTargetdRFZWAVE(store.firmware?.ZWAVE_files[0]);
        // setTargetdZWAVECONFIG(store.firmware?.ZWAVECONFIG_files[0]);
        // setTargetdBLE(store.firmware?.BLE_files[0]);
        // setTargetdSTOVEFIRMWARE(store.firmware?.STOVE_files[0]);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    // refresh data after every 60 seconds
    const interval = setInterval(() => {
      dispatch(getFirmwareVersion());
      setTest(Math.random(1000));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const addOne = (e) => {
    if (hubUpdateList.includes(parseInt(e.target.id))) {
      const index = hubUpdateList.indexOf(parseInt(e.target.id));
      const newList = hubUpdateList.filter(
        (hub) => hub !== parseInt(e.target.id)
      );
      setHubUpdateList(newList);
      return;
    }

    let newList = [...hubUpdateList, parseInt(e.target.id)];
    setHubUpdateList(newList);
    // setHubUpdateList((preList) =>
    //   setHubUpdateList([...hubUpdateList, e.target.id])
    // );
  };

  const addAll = () => {
    if (hubUpdateList.length === store.firmware.Hubs.length) {
      setHubUpdateList([]);
      return;
    }
    let newList = [];
    hubsList.map((hub) => {
      newList = [...newList, parseInt(hub.ID)];
    });
    setHubUpdateList(newList);
  };

  const updateTargetd = () => {
    dispatch(
      setFirmwareVersion(
        targetdVersion,
        targetdRFZWAVE,
        targetdZWAVECONFIG,
        targetdBLE,
        targetdSTOVEFIRMWARE,
        hubUpdateList
      )
    );
    setConfirmModal(false);
  };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleUpload = () => {
    console.log(selectedFile);
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
          onChange={(e) => setTargetdVersion(e.target.value)}
        >
          <option value={null}>Firmware</option>
          {store.firmware &&
            store.firmware.Files?.map((file) => (
              <option value={file}>Firmware {file}</option>
            ))}
        </select>
        {/* Zwave */}
        <select
          className={
            targetdRFZWAVE && targetdRFZWAVE !== "RFZWAVE"
              ? "firmware-settings-dropDown-selected"
              : "firmware-settings-dropDown"
          }
          onChange={(e) => setTargetdRFZWAVE(e.target.value)}
        >
          <option value={null}>RFZWAVE</option>
          {store.firmware &&
            store.firmware.ZWAVE_files?.map((file) => (
              <option value={file}>RFZWAVE {file}</option>
            ))}
        </select>
        {/* Zwave Config*/}
        <select
          className={
            targetdZWAVECONFIG && targetdZWAVECONFIG !== "ZWAVECONFIG"
              ? "firmware-settings-dropDown-selected"
              : "firmware-settings-dropDown"
          }
          onChange={(e) => setTargetdZWAVECONFIG(e.target.value)}
        >
          <option value={null}>ZWAVECONFIG</option>
          {store.firmware &&
            store.firmware.ZWAVECONFIG_files?.map((file) => (
              <option value={file}>ZWAVECONFIG {file}</option>
            ))}
        </select>
        {/* BLE */}
        <select
          className={
            targetdBLE && targetdBLE !== "RFBLE"
              ? "firmware-settings-dropDown-selected"
              : "firmware-settings-dropDown"
          }
          onChange={(e) => setTargetdBLE(e.target.value)}
        >
          <option value={null}>RFBLE</option>
          {store.firmware?.BLE_files ? (
            store.firmware.BLE_files?.map((file) => (
              <option value={file}>RFBLE {file}</option>
            ))
          ) : (
            <option>BLE</option>
          )}
        </select>
        {/* STOVE */}
        <select
          className={
            targetdSTOVEFIRMWARE && targetdSTOVEFIRMWARE !== "STOVEFIRMWARE"
              ? "firmware-settings-dropDown-selected"
              : "firmware-settings-dropDown"
          }
          onChange={(e) => setTargetdSTOVEFIRMWARE(e.target.value)}
        >
          <option value={null}>STOVEFIRMWARE</option>
          {store.firmware &&
            store.firmware.STOVE_files?.map((file) => (
              <option value={file}>STOVEFIRMWARE {file}</option>
            ))}
        </select>
        <Button
          variant="primary"
          id="main-primary-btn"
          type="submit"
          onClick={() => setConfirmModal(true)}
        >
          Update
        </Button>

        <Button
          variant="primary upload-button"
          id="main-primary-btn"
          type="submit"
          onClick={() => setUploadModal(true)}
        >
          <BsCloudUpload size={20} className="icon" />
          Upload file
        </Button>
      </div>
      <Row>
        <Col xs="12">
          <div className="common-main-table firmware-table" id="firmware-table">
            <Table hover>
              <thead className="fixed">
                <tr>
                  <th>ID</th>
                  <th>MAC Address</th>
                  <th>Firmware</th>
                  <th>Target</th>
                  <th>RFZWAVE</th>
                  <th>Target</th>
                  <th>ZWAVECONFIG</th>
                  <th>Target</th>
                  <th>RFBLE</th>
                  <th>Target</th>
                  <th>STOVEFIRMWARE</th>
                  <th>Target</th>
                  <th>
                    <Button
                      variant="primary"
                      id="custom-select-btn"
                      type="submit"
                      onClick={() => addAll()}
                    >
                      {hubUpdateList &&
                      store.firmware &&
                      hubUpdateList?.length !== store.firmware?.Hubs?.length
                        ? "Select All"
                        : "Cancel"}
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {hubsList == null
                  ? "Checking hub logs..."
                  : hubsList.map((item, index) => (
                      <tr key={index}>
                        <td>{item.ID}</td>
                        <td>
                          {item.MAC_ADDRESS
                            ? item.MAC_ADDRESS.toUpperCase()
                            : ""}
                        </td>
                        <td>{item.Current ? item.Current : ""}</td>
                        <td>{item.Target}</td>
                        {/* ZwaveSensors */}
                        <td>
                          {item.RF_ZWAVE_VERISION ? item.RF_ZWAVE_VERISION : ""}
                        </td>

                        <td>
                          {item.TARGET_RF_VERSION ? item.TARGET_RF_VERSION : ""}
                        </td>
                        {/* ZwaveConfigSensors */}
                        <td>
                          {item.ZWAVE_CONFIG_VERSION
                            ? item.ZWAVE_CONFIG_VERSION
                            : ""}
                        </td>
                        <td>
                          {item.TARGET_ZWAVE_CONFIG_VERSION
                            ? item.TARGET_ZWAVE_CONFIG_VERSION
                            : ""}
                        </td>
                        {/* BLE */}
                        <td>
                          {item.RF_BLE_VERSION ? item.RF_BLE_VERSION : ""}
                        </td>
                        <td>
                          {item.TARGET_RF_BLE_VERSION
                            ? item.TARGET_RF_BLE_VERSION
                            : ""}
                        </td>
                        {/* STOVE */}
                        <td>
                          {item.STOVE_FIRMWARE_VERSION
                            ? item.STOVE_FIRMWARE_VERSION
                            : ""}
                        </td>
                        <td>
                          {item.TARGET_STOVE_FIRMWARE_VERSION
                            ? item.TARGET_STOVE_FIRMWARE_VERSION
                            : ""}
                        </td>
                        <td>
                          <input
                            id={item.ID}
                            type="checkbox"
                            checked={
                              hubUpdateList.length > 0 &&
                              hubUpdateList.includes(item.ID)
                                ? true
                                : false
                            }
                            onClick={(e) => {
                              addOne(e);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
              </tbody>
            </Table>
          </div>
        </Col>

        <Modal
          className="BLEDevices-tab-modal"
          show={confirmModal}
          onHide={() => {
            setConfirmModal(false);
            //setSensorId();
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Targeted Version</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>
              {`Are you sure you want to Update the 
            ${targetdVersion ? "targetdVersion, " : ""}
            ${targetdZWAVECONFIG ? "targetdZWAVECONFIG, " : ""}
            ${targetdRFZWAVE ? "targetdRFZWAVE, " : ""}
            ${targetdBLE ? "targetdBLE, " : ""}
            ${targetdSTOVEFIRMWARE ? "targetdSTOVEFIRMWARE, " : ""}
               for the the hubs bellow ?`}
            </h6>
            <div className="confirmation-area-modal">
              {hubUpdateList.map((hub) => (
                <h6> {hub}, </h6>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              id="custom-cancel-btn"
              variant="secondary"
              onClick={() => {
                setConfirmModal(false);
                //setSensorId();
              }}
            >
              No
            </Button>
            <Button
              variant="primary"
              id="main-primary-btn"
              onClick={() => updateTargetd()}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          className="BLEDevices-tab-modal"
          show={uploadModal}
          onHide={() => {
            setUploadModal(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Upload file</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="file" name="file" onChange={changeHandler} />
            <div className="confirmation-area-modal">
              <select
                className={
                  targetdVersion && targetdVersion !== "Firmware"
                    ? "firmware-settings-dropDown-selected"
                    : "firmware-settings-dropDown"
                }
                onChange={(e) => setFileType(e.target.value)}
              >
                <option value={null}></option>
                {[
                  "Firmware",
                  "RFZWAVE",
                  "ZWAVECONFIG",
                  "RFBLE",
                  "STOVEFIRMWARE",
                ].map((file) => (
                  <option value={file}>{file}</option>
                ))}
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              id="main-primary-btn"
              onClick={() => handleUpload()}
            >
              Upload
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </div>
  );
};

export default FirmwareSettings;
