import React, { useState, useEffect } from "react";
import { Row, Col, Table, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAccountDetailsData } from "../redux/actions/main/index";
import Notifications, { notify } from "react-notify-toast";
import BootstrapTable from "react-bootstrap-table-next";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { lightIconColor } from "./utils/HelperFunctions";
import { AiOutlineHome } from "react-icons/ai";
import "../assets/css/profile.scss";

const Profile = (props) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.main);

  const [users, setUsers] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [delUser, setDelUser] = useState();

  useEffect(() => {
    if (store && store.hub) {
      dispatch(getAccountDetailsData(store.user.EmailAddress));
    }
  }, []);

  useEffect(() => {
    if (store.user) {
      const allUsers = store.users.slice(1);
      setUsers(allUsers);
    }
  }, [store.user]);

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
    {
      dataField: "",
      text: "",
      formatter: (value, row) => (
        <AiOutlineHome
          size={22}
          className="add-cursor"
          onClick={() => {
            setConfirmModal(true);
            setDelUser(row.ID);
          }}
        />
      ),
    },
  ];

  const handleDelUser = () => {
    setConfirmModal(false);
    setDelUser();
  };

  const tableRowEvents = {
    onClick: (e, row, rowIndex) => {
      props.history.push({
        pathname: "/hub/" + row.ID,
        state: row,
      });
    },
  };

  return (
    <div className="profile-page-section">
      <Notifications options={{ top: "10px" }} />
      <Row className="justify-content-center row-margin">
        <Col xs="12" sm="12" md="8" lg="8" xl="8">
          <div className="card-main">
            <div className="card-main-header">
              <AiOutlineHome
                size={21}
                color={lightIconColor}
                className="back-icon"
                // onClick={() => props.history.goBack()}
                onClick={() =>
                  props.history.push({
                    pathname: "/hub/" + store.user.ID,
                    state: store.user,
                  })
                }
              />
              <span>Account Details</span>
              <FiEdit
                size={21}
                color={lightIconColor}
                onClick={() =>
                  props.history.push({
                    pathname: "/edit-profile",
                  })
                }
              />
            </div>
            <div className="card-main-body">
              {/* Profile Info Table */}
              <div className="hub-tab-section" id="profile-info-table">
                <Table borderless responsive>
                  <tbody>
                    <tr>
                      <th>Name </th>
                      <td>
                        {store.user
                          ? `${store.user.FirstName} ${store.user.LastName}`
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <th>Email </th>
                      <td>{store.user ? store.user.EmailAddress : ""}</td>
                    </tr>
                    <tr>
                      <th>Phone </th>
                      <td>{store.user ? store.user.MobileNumber : ""}</td>
                    </tr>
                    <tr>
                      <th>Code Redeemed Date </th>
                      <td>{store.user ? store.user.CodeRedeemedDate : ""}</td>
                    </tr>
                    <tr>
                      <th>Reg Code </th>
                      <td>{store.user ? store.user.RegCode : ""}</td>
                    </tr>
                    <tr>
                      <th>Address One </th>
                      <td>{store.user ? store.user.AddressOne : ""}</td>
                    </tr>
                    <tr>
                      <th>Address Two </th>
                      <td>{store.user ? store.user.AddressTwo : ""}</td>
                    </tr>
                    <tr>
                      <th>City </th>
                      <td>{store.user ? store.user.City : ""}</td>
                    </tr>
                    <tr>
                      <th>State </th>
                      <td>{store.user ? store.user.State : ""}</td>
                    </tr>
                    <tr>
                      <th>Zip Code </th>
                      <td>{store.user ? store.user.ZipCode : ""}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              {/* Other Users */}
              <div
                className="common-table-heading"
                id="sensors-tab-heading"
                style={{ marginBottom: "1rem" }}
              >
                <h5>Other Users</h5>
              </div>
              <div
                className="common-main-table"
                id="add-table-scroll"
                style={{ marginTop: 0, maxHeight: "400px" }}
              >
                <BootstrapTable
                  bootstrap4
                  keyField="EmailAddress"
                  data={users}
                  columns={columns}
                  bordered={false}
                  hover={true}
                  responsive
                  rowEvents={tableRowEvents}
                  noDataIndication={
                    <div className="empty-table-div">
                      <span>No User</span>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Modal
        className="BLEDevices-tab-modal"
        show={confirmModal}
        onHide={() => {
          setConfirmModal(false);
          setDelUser();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Are you sure you want to delete this account?</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button
            id="custom-cancel-btn"
            variant="secondary"
            onClick={() => {
              setConfirmModal(false);
              setDelUser();
            }}
          >
            No
          </Button>
          <Button
            variant="primary"
            id="main-primary-btn"
            onClick={() => handleDelUser()}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
