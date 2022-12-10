import React, { Fragment, useState, useEffect } from "react";
import {
  Row,
  Col,
  Table,
  Modal,
  Button,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import Moment from "react-moment";
import BootstrapTable from "react-bootstrap-table-next";
import { userSearch } from "../services/userService";
import "../assets/css/sidebar.scss";
import { addHomeId, addNewSim, UpdateHubMode } from "../redux/actions/main";
import { useDispatch } from "react-redux";
import Notifications, { notify } from "react-notify-toast";
import { formatPhoneNumber, lightIconColor } from "./utils/HelperFunctions";
import { AiOutlineHome } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import fridge from "../assets/img/alerts/fridge.png";
import sensor from "../assets/img/alerts/sensor.png";
import bed from "../assets/img/alerts/bed.png";
import couch from "../assets/img/alerts/couch.png";
import toilet from "../assets/img/alerts/toilet.png";
import door from "../assets/img/alerts/door.png";
import stoveOn from "../assets/img/alerts/stoveOn.png";
import stoveOff from "../assets/img/alerts/stoveOff.png";
import { FiAlertTriangle, FiCopy } from "react-icons/fi";
import moment from "moment";

const SideBar = ({
  macAddress,
  hub,
  user,
  resident,
  props,
  sensorData,
  getDataUsageInfo,
  lastEvent,
}) => {
  const [assignHomeModal, setAssignHomeModal] = useState(false);
  const [assignModeModal, setAssignModeModal] = useState(false);
  const [addSimModal, setAddSimModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [users, setUsers] = useState([]);
  const [home, setHome] = useState();
  const [sim, setSim] = useState();
  const [mode, setMode] = useState();
  const [oldSim, setoldSim] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setoldSim(hub.SimCardId);
  }, [hub.SimCardId]);

  const getActivityImg = (sensorId) => {
    if (sensorId == 1) return fridge;
    else if (sensorId == "Front Door") return <img src={door} />;
    else if (sensorId == "Refrigerator Door") return <img src={fridge} />;
    else if (sensorId == "Living Room" || sensorId == "Common Room")
      return <img src={couch} />;
    else if (sensorId == "Bedroom" || sensorId == "Bed")
      return <img src={bed} />;
    else if (sensorId == "Stove On") return <img src={stoveOn} />;
    else if (sensorId == "Stove Off") return <img src={stoveOff} />;
    else if (sensorId == "Primary Bathroom") return <img src={toilet} />;
    else if (sensorId == 6) return <img src={fridge} />;
    else return <img src={sensor} />;
  };

  const renderLastActivity = () => {
    if (sensorData instanceof Array && sensorData.length > 0) {
      const today = new Date().setHours(0, 0, 0, 0);
      const thatDay = new Date(lastEvent?.EventDate).setHours(0, 0, 0, 0);
      if (today === thatDay) {
        const formatDate = moment(lastEvent.EventDate).format("hh:mm a");
        return formatDate;
      } else {
        const formatDate = moment(lastEvent.EventDate).format("MM/DD/YY");
        return formatDate;
      }
    }
  };

  const getHubStatus = (status) => {
    if (status === 0 || status === null)
      return <span className="span-active-color">Active</span>;
    if (status === 1)
      return <span className="span-warning-color">Debug Mode</span>;
    if (status === 2)
      return <span className="span-down-color">Deactivated</span>;
  };

  const handleOnChange = (value) => {
    setSearchInput(value);
  };

  const columns = [
    {
      dataField: "HomeID",
      text: "Home Id",
    },
    {
      dataField: "FirstName",
      text: "First Name",
    },
    {
      dataField: "LastName",
      text: "Last Name",
    },
    {
      dataField: "EmailAddress",
      text: "Email Address",
    },
  ];

  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    onSelect: (e) => setHome(e),
  };

  const handleAddHome = () => {
    if (home) {
      console.log(hub.ID, home.HomeID, user?.HomeID);
      dispatch(addHomeId(hub.ID, home.HomeID, user?.HomeID));
      setAssignHomeModal(false);
      setSearchInput();
      setUsers([]);
      setHome();
    } else {
      notify.show("Please select a user", "error", 3000);
    }
  };

  const handleCloseModal = () => {
    setAssignHomeModal(false);
    setSearchInput();
    setUsers([]);
    setHome();
  };

  const handleAddSim = () => {
    if (sim) {
      dispatch(addNewSim(hub, sim, oldSim, "active"));
      setAddSimModal(false);
      setSim();
      dispatch(getDataUsageInfo(sim));
    } else {
      notify.show("Please add the sim first", "error", 3000);
    }
  };

  const handleChangeMode = () => {
    if (mode) {
      dispatch(UpdateHubMode(hub.MacAddress, mode));
      if (mode === 2) {
        dispatch(addHomeId(-1, home.ID, null));
        dispatch(addNewSim(hub, hub.SimCardId, hub.SimCardId, "inactive"));
      }
      setAssignModeModal(false);
      setMode();
    } else {
      notify.show("Please Select a mode", "error", 3000);
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {hub.SimCardId}
    </Tooltip>
  );

  const renderSimId = () => {
    const sim = hub.SimCardId;
    if (sim) {
      const getSim = sim.toString();
      if (getSim.length > 6) {
        return (
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 1000 }}
            overlay={renderTooltip}
          >
            <span className="add-cursor">{getSim.substring(0, 8)}...</span>
          </OverlayTrigger>
        );
      } else {
        return <span>{hub.SimCardId}</span>;
      }
    }
  };

  const handleOnKeyChange = (e) => {
    if (e.key === "Enter") {
      if (searchInput) {
        userSearch(searchInput)
          .then((res) => {
            if (res instanceof Array && res.length > 0) {
              const data = res[0];
              if (data.HomeID) {
                setUsers(res);
              }
            }
          })
          .catch((err) => console.log(err));
      } else {
        setUsers([]);
      }
    }
  };

  return (
    <Fragment>
      <Notifications options={{ zIndex: 10000, top: "10px" }} />
      <div className="sidebar-activy-card">
        <Row>
          <Col xs="12">
            <div className="activity-card-main ">
              <h4>
                {user && user.FirstName ? user.FirstName : "User"}'s
                {" Activities"}
              </h4>
              <div className="activity-card-content">
                <span className="most-recebt-activty">
                  Most Recent Activity
                </span>
                <div className="recent-activity-div">
                  <div className="recent-activity-circle1">
                    <div className="recent-activity-circle2">
                      <span className="recent-activity-icon">
                        {getActivityImg(lastEvent?.SensorType)}
                      </span>
                      <span className="recent-activity-time">
                        {lastEvent?.SensorType} <br />
                        {renderLastActivity()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="account-details-sidebar-section">
        <Row>
          <Col xs="12">
            <div className="account-sidebar-header">
              <AiOutlineHome size={22} color={lightIconColor} />
              <span>Account Overview</span>
            </div>
            <div className="account-sidebar-heading">
              <div className="account-sidebar-ids">
                <p className="account-sidebar-mac">
                  Install Date:{" "}
                  <span>
                    <Moment
                      format="MM/DD/YYYY hh:mm A"
                      date={hub.InstallDate}
                    />
                  </span>
                </p>
              </div>

              <div className="account-sidebar-ids">
                <p className="account-sidebar-mac">
                  Mac: <span>{macAddress}</span>
                </p>
              </div>

              <div className="sidebar-assign-div">
                <p className="account-sidebar-mac">
                  Hub ID:{" "}
                  <span>
                    {hub.ID} {getHubStatus(hub?.Status)}
                  </span>
                </p>
                <Button
                  id="assign-active-btn"
                  variant="primary"
                  onClick={() => setAssignModeModal(true)}
                >
                  Change Mode
                </Button>
              </div>

              <div className="sidebar-assign-div">
                <p className="account-sidebar-mac">
                  Home ID: <span>{user ? user.HomeID : ""}</span>
                </p>

                <Button
                  id="assign-active-btn"
                  variant="primary"
                  onClick={() => setAssignHomeModal(true)}
                >
                  {user && user.HomeID && user.HomeID !== -1
                    ? "Reassign Home"
                    : "Assign Home"}
                </Button>
              </div>

              <div className="sidebar-assign-div">
                <p className="account-sidebar-mac">Sim ID: {renderSimId()}</p>
                <div className="reassign-sim">
                  <FiCopy
                    id="copy-btn"
                    onClick={() => {
                      navigator.clipboard.writeText(hub.SimCardId);
                    }}
                  ></FiCopy>
                  <Button
                    id="assign-active-btn"
                    variant="primary"
                    onClick={() => setAddSimModal(true)}
                  >
                    {hub.SimCardId ? "Reassign Sim" : "Assign Sim"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="account-sidebar-content">
              {/* Resident Information */}
              <h5 className="account-sidebar-customer">Resident Information</h5>
              <div className="account-sidebar-user-info">
                <p>
                  <span className="user-info-col"> Name</span>{" "}
                  <span>
                    {resident[0]
                      ? `${resident[0].FirstName} ${resident[0].LastName}`
                      : ""}
                  </span>{" "}
                </p>
                <p>
                  <span className="user-info-col"> Email</span>{" "}
                  <span>{resident[0] ? resident[0].EmailAddress : ""}</span>
                </p>
                <p>
                  <span className="user-info-col"> Phone</span>{" "}
                  <span>
                    {resident[0]
                      ? formatPhoneNumber(resident[0].MobileNumber)
                      : ""}
                  </span>
                </p>
              </div>
              {/* User Information */}
              <h5 className="account-sidebar-customer">User Information</h5>
              <div className="account-sidebar-user-info">
                <p>
                  <span className="user-info-col"> Name</span>{" "}
                  <span>
                    {user ? `${user.FirstName} ${user.LastName}` : ""}
                  </span>{" "}
                </p>
                <p>
                  <span className="user-info-col"> Email</span>{" "}
                  <span>{user ? user.EmailAddress : ""}</span>
                </p>
                <p>
                  <span className="user-info-col"> Phone</span>{" "}
                  <span>
                    {user ? formatPhoneNumber(user.MobileNumber) : ""}
                  </span>
                </p>
              </div>

              <div className="account-details-btn">
                <Button
                  variant="primary"
                  id="main-primary-btn"
                  onClick={() =>
                    props.history.push({
                      pathname: "/profile",
                    })
                  }
                >
                  Account Details
                  <IoIosArrowForward />
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {/* Issues Section */}
      <Row>
        <Col xs="12">
          <div className="issues-card">
            <div className="issues-card-header">
              <FiAlertTriangle size={22} />
              <span>ISSUES !</span>
            </div>
            <div className="issues-card-body">
              <input type="checkbox" id="title1" />
              <label htmlFor="title1">The hub appears to be offline.</label>

              <div className="content">
                <p>Your content goes here.</p>
              </div>

              <input type="checkbox" id="title2" />
              <label htmlFor="title2">See More...</label>

              <div className="content">
                <p>Your content goes here.</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Assign Home Modal */}
      <Modal
        className="BLEDevices-tab-modal"
        size="lg"
        show={assignHomeModal}
        onHide={() => handleCloseModal()}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Home ID</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs="12">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Search customers by name..."
                  value={searchInput}
                  onChange={(e) => handleOnChange(e.target.value)}
                  onKeyDown={(e) => handleOnKeyChange(e)}
                />
              </Form.Group>
            </Col>
            <Col xs="12">
              <div className="common-main-table" id="add-table-scroll">
                <BootstrapTable
                  bootstrap4
                  keyField="EmailAddress"
                  data={users}
                  columns={columns}
                  selectRow={selectRow}
                  bordered={false}
                  hover={true}
                  responsive
                  noDataIndication={
                    <div className="empty-table-div">
                      <span>No Customers</span>
                    </div>
                  }
                />
              </div>
            </Col>
          </Row>
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
            id="main-primary-btn"
            onClick={() => handleAddHome()}
            variant="primary"
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Change Mode Modal */}
      <Modal
        className="BLEDevices-tab-modal"
        size="md"
        show={assignModeModal}
        onHide={() => setAssignModeModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Change status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs="12">
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(e) => setMode(e.target.value)}
              >
                <option selected>Select Mode</option>
                <option value="0">Active</option>
                <option value="1">Debug Mode</option>
                <option value="2">Deactivate</option>
              </select>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            id="custom-cancel-btn"
            variant="secondary"
            onClick={() => {
              setAssignModeModal(false);
              setSim();
            }}
          >
            Cancel
          </Button>
          <Button
            id="main-primary-btn"
            variant="primary"
            onClick={() => handleChangeMode()}
          >
            Change
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Sim Modal */}
      <Modal
        className="BLEDevices-tab-modal"
        size="md"
        show={addSimModal}
        onHide={() => setAddSimModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Sim </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs="12">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Enter Sim"
                  value={sim}
                  onChange={(e) => setSim(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            id="custom-cancel-btn"
            variant="secondary"
            onClick={() => {
              setAddSimModal(false);
              setSim();
            }}
          >
            Cancel
          </Button>
          <Button
            id="main-primary-btn"
            variant="primary"
            onClick={() => handleAddSim()}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default SideBar;
