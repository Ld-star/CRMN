import React, { useState } from "react";
import { Row, Col, Table, Modal, Button, Form } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { AiOutlinePlus, AiOutlineRight, AiFillHeart } from "react-icons/ai";
import Moment from "react-moment";
import "../../assets/css/devices-tab.scss";
import { addBLEDevice } from "../../redux/actions/main";
import { useDispatch } from "react-redux";
import Notifications, { notify } from "react-notify-toast";
import { removeBLEDevice } from "../../redux/actions/main";
import { MdDelete } from "react-icons/md";
import $ from "jquery";
import { darkIconColor } from "../utils/HelperFunctions";
import { BsUpcScan } from "react-icons/bs";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
const DevicesTab = ({ pairedBleDevices, hub, bleData, qAbleData }) => {
  const [show, setShow] = useState(false);
  const [deviceType, setDeviceType] = useState();
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [macAddress, setMacAddress] = useState();
  const [confirmModal, setConfirmModal] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = React.useState("Not Found");

  const devicesTypes = [
    { Type: 0, Value: "Thermometer" }, // Temperature
    { Type: 1, Value: "Pulse Oximeter" }, //Sp02 & Pulse
    { Type: 2, Value: "Blood Pressure Monitor" }, //Pulse - Blood Pressure Monitor
    { Type: 3, Value: "Scale" },
  ];

  const readingTypes = [
    { Type: 0, Value: "Temperature" },
    { Type: 1, Value: "Sp02" }, //Sp02 & Pulse
    { Type: 2, Value: "Pulse" }, //Sp02 & Pulse
    { Type: 3, Value: "Scale" },
  ];

  const columns = [
    {
      dataField: "Value",
      text: "Device Type",
    },
  ];

  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    onSelect: (e) => setDeviceType(e.Type),
  };

  const macFormatter = (mac) => {
    const test = new Array(6)
      .join("00") // '000000000000'
      .match(/../g) // [ '00', '00', '00', '00', '00', '00' ]
      .concat(
        mac
          .toString(16) // "4a8926c44578"
          .match(/.{1,2}/g) // ["4a", "89", "26", "c4", "45", "78"]
      ) // ["00", "00", "00", "00", "00", "00", "4a", "89", "26", "c4", "45", "78"]
      .reverse() // ["78", "45", "c4", "26", "89", "4a", "00", "00", "00", "00", "00", "00", ]
      .slice(0, 6) // ["78", "45", "c4", "26", "89", "4a" ]
      .reverse()
      .join(":");

    return test;
  };

  const handleSubmit = () => {
    setShowAddressInput(true);
    if (deviceType !== null && macAddress) {
      dispatch(addBLEDevice(hub, macAddress, deviceType));
      setShowAddressInput(false);
      setDeviceType();
      setMacAddress();
      setShow(false);
      setShowScanner(false);
    } else if (showAddressInput) {
      notify.show("Empty details", "error", 3000);
    }
  };

  const handleDeleteDevice = () => {
    dispatch(removeBLEDevice(hub, macAddress, deviceType));
    setConfirmModal(false);
  };

  const handleCloseModal = () => {
    setShowAddressInput(false);
    setDeviceType();
    setMacAddress();
    setShow(false);
    setShowScanner(false);
  };

  $("#mac-input").on("keydown", function (event) {
    const BACKSPACE_KEY = 8;
    const COLON_KEY = 186;
    const _colonPositions = [2, 5, 8, 11, 14];
    const _newValue = $(this).val().trim();
    const _currentPosition = _newValue.length;
    if (event.keyCode === COLON_KEY) {
      event.preventDefault();
    }
    if (event.keyCode !== BACKSPACE_KEY) {
      if (_colonPositions.some((position) => position === _currentPosition)) {
        $("#mac-input").val(_newValue.concat(":"));
      }
    }
  });

  const dataColumns = [
    {
      dataField: "DeviceId",
      text: "Device ID",
    },
    {
      dataField: "Type",
      text: "Device Type",
      formatter: (value, row) => (
        <>
          {devicesTypes[row.DeviceId] ? devicesTypes[row.DeviceId].Value : ""}
        </>
      ),
    },
    {
      dataField: "MacAddress",
      text: "MAC Address",
      formatter: (value, row) => (
        <>{row.MacAddress ? row.MacAddress.toUpperCase() : ""}</>
      ),
    },
    {
      dataField: "PairedDate",
      text: "Paired Date",
      formatter: (value, row) => (
        <Moment format="MM/DD/YYYY hh:mm A" date={row.PairedDate} />
      ),
    },
    {
      dataField: "Unpair",
      text: "Unpair",
      formatter: (value, row) => (
        <MdDelete
          size={22}
          className="add-cursor"
          onClick={() => {
            setConfirmModal(true);
            setDeviceType(row.Type);
            setMacAddress(row.MacAddress.toUpperCase());
          }}
        />
      ),
    },
  ];

  const bleDevicesExpandRow = {
    renderer: (row) => {
      const bleAllData = bleData.concat(qAbleData);

      let rowData = [];

      // this logic needs to be redone in the backend to differentiate between
      // Pulse Type and Blood Pressure Monitor Type
      if (row.Type === 1) {
        rowData = bleAllData.filter((item) => {
          return item.Type === "Sp02" || item.Type === "Pulse";
        });
      } else if (row.Type === 2) {
        return [];
      } else {
        rowData = bleAllData.filter((item) => {
          return item.Type === readingTypes[row.DeviceId].Value;
        });
      }

      return (
        <div className="common-main-table" id="sensor-list-tab-table">
          <Table responsive hover>
            <thead>
              <tr>
                <th>Type</th>
                <th>Value</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bleData && rowData instanceof Array && rowData.length > 0 && (
                <>
                  {rowData.map((data) => {
                    return (
                      <tr>
                        <td>{data.Type}</td>
                        <td>{data.Value}</td>
                        <td>
                          <Moment
                            format="MM/DD/YYYY hh:mm A"
                            date={data.DateTaken}
                          />
                        </td>
                        <td>
                          <AiFillHeart
                            className="keg-status-setting-icon"
                            size={20}
                            color={data.Status}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </Table>
        </div>
      );
    },

    showExpandColumn: true,
    expandByColumnOnly: true,
    expandHeaderColumnRenderer: ({ isAnyExpands }) => {
      return (
        <AiOutlineRight
          className={`keg-status-setting-icon ${isAnyExpands && "active"}`}
        />
      );
    },
    expandColumnRenderer: ({ expanded }) => {
      return (
        <AiOutlineRight
          className={`keg-status-setting-icon ${expanded && "active"}`}
        />
      );
    },
  };

  const handleErrorWebCam = (error) => {};

  return (
    <div className="keg-status-section">
      <Notifications options={{ zIndex: 10000, top: "10px" }} />
      {/* Bluetooth Devices */}
      <Row>
        <Col xs="12">
          <div className="keg-status-heading" id="common-border">
            <h5>Bluetooth Devices</h5>
            <div className="keg-status-icons">
              <AiOutlinePlus
                className="keg-status-setting-icon"
                size={20}
                color={darkIconColor}
                onClick={() => setShow(true)}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <div className="common-main-table" id="BLE-tab-table">
            <BootstrapTable
              keyField="MacAddress"
              data={pairedBleDevices}
              columns={dataColumns}
              expandRow={bleDevicesExpandRow}
              bordered={false}
            />
          </div>
        </Col>
      </Row>
      <Modal
        className="BLEDevices-tab-modal"
        show={show}
        onHide={() => handleCloseModal()}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a new bluethooth device</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="common-main-table" id="bled-devices-scroll">
            <BootstrapTable
              bootstrap4
              keyField="Type"
              data={devicesTypes}
              columns={columns}
              selectRow={selectRow}
              bordered={false}
              hover={true}
              responsive
            />
          </div>
          {showAddressInput ? (
            <>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Add Mac Address</Form.Label>
                <div className="ble-devices-input">
                  <Form.Control
                    id="mac-input"
                    type="text"
                    placeholder=""
                    value={macAddress}
                    onChange={(e) => setMacAddress(e.target.value)}
                    maxlength="17"
                  />
                  <BsUpcScan
                    size={30}
                    onClick={() => {
                      setShowScanner(!showScanner);
                      setMacAddress("");
                    }}
                  />
                </div>
              </Form.Group>
              {showScanner && (
                <div className="ble-barcode-scanner">
                  <div className="barcode-scanner" />
                  <BarcodeScannerComponent
                    onUpdate={(err, result) => {
                      if (result) setMacAddress(macFormatter(result.text));
                      else setData("No barcode");
                    }}
                    delay={300}
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            </>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button
            id="custom-cancel-btn"
            variant="secondary"
            onClick={() => handleCloseModal()}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            id="main-primary-btn"
            onClick={() => handleSubmit()}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        className="BLEDevices-tab-modal"
        show={confirmModal}
        onHide={() => {
          setConfirmModal(false);
          setDeviceType();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete BLE Device</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Are you sure you want to delete this device?</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button
            id="custom-cancel-btn"
            variant="secondary"
            onClick={() => {
              setConfirmModal(false);
              setDeviceType();
              setMacAddress();
            }}
          >
            No
          </Button>
          <Button
            variant="primary"
            id="main-primary-btn"
            onClick={() => handleDeleteDevice()}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DevicesTab;
